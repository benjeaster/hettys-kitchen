// Shared data layer for the Customers & Orders dashboard (dashboard.html).
// There's no paid backend on this Netlify plan, so this reuses the same
// approach already proven for menu-today.html: the repo itself is the
// database. customers.json / orders.json / item-costs.json live in data/
// and are read via a plain same-origin fetch, and written back through the
// GitHub Contents API using the same Personal Access Token as admin.html
// (shared localStorage key, so Hetty only enters it once across tools).
(function () {
  const GITHUB_OWNER = 'benjeaster';
  const GITHUB_REPO_NAME = 'hettys-kitchen';
  const GITHUB_BRANCH = 'main';
  const TOKEN_STORAGE_KEY = 'hettys_admin_gh_token';

  function utf8ToBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach(function (b) { binary += String.fromCharCode(b); });
    return btoa(binary);
  }

  function base64ToUtf8(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  // ── Local same-origin read (fast, no token needed) ──
  async function fetchLocalJSON(path, fallback) {
    try {
      const res = await fetch(path + '?_=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) return fallback;
      return await res.json();
    } catch (e) {
      return fallback;
    }
  }

  // ── GitHub Contents API read/write (needed to persist changes) ──
  async function githubGetFile(path, token) {
    const url = 'https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO_NAME + '/contents/' + path + '?ref=' + GITHUB_BRANCH;
    const res = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json' } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Could not read ' + path + ' from GitHub (' + res.status + '). Check the token is valid and scoped to this repo.');
    const data = await res.json();
    return { sha: data.sha, json: JSON.parse(base64ToUtf8(data.content)) };
  }

  async function githubPutFile(path, jsonObj, token, message, sha) {
    const url = 'https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO_NAME + '/contents/' + path;
    const body = {
      message: message,
      content: utf8ToBase64(JSON.stringify(jsonObj, null, 2) + '\n'),
      branch: GITHUB_BRANCH
    };
    if (sha) body.sha = sha;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error('GitHub rejected the update to ' + path + ' (' + res.status + '). ' + errText.slice(0, 200));
    }
  }

  // Fetch current sha (if the file already exists) then PUT the new content.
  async function saveJSON(path, jsonObj, token, message) {
    const existing = await githubGetFile(path, token);
    await githubPutFile(path, jsonObj, token, message, existing ? existing.sha : undefined);
  }

  // ── ID generation ──
  // Human-readable, sequential, zero-padded to at least 4 digits. Not
  // collision-proof under true concurrent writes, but this is a
  // single-operator small-business tool, not a multi-writer system.
  function nextId(prefix, existingIds) {
    let max = 0;
    existingIds.forEach(function (id) {
      const m = /(\d+)$/.exec(id || '');
      if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    const next = max + 1;
    const padded = String(next).padStart(4, '0');
    return prefix + padded;
  }

  // ── Customer helpers ──
  function findCustomerById(customers, id) {
    return customers.find(function (c) { return c.id === id; }) || null;
  }

  // Matches by exact phone (most reliable dedupe key) or case-insensitive
  // exact name, so re-entering an existing customer during order entry
  // doesn't silently create a duplicate record.
  function findExistingCustomer(customers, name, phone) {
    const normPhone = (phone || '').replace(/[^\d+]/g, '');
    if (normPhone) {
      const byPhone = customers.find(function (c) { return (c.phone || '').replace(/[^\d+]/g, '') === normPhone; });
      if (byPhone) return byPhone;
    }
    const normName = (name || '').trim().toLowerCase();
    if (normName) {
      const byName = customers.find(function (c) { return (c.name || '').trim().toLowerCase() === normName; });
      if (byName) return byName;
    }
    return null;
  }

  function customerOrders(orders, customerId) {
    return orders.filter(function (o) { return o.customerId === customerId; });
  }

  function daysUntilNextBirthday(birthdayStr) {
    if (!birthdayStr) return null;
    const b = new Date(birthdayStr);
    if (isNaN(b.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let next = new Date(today.getFullYear(), b.getMonth(), b.getDate());
    if (next < today) next = new Date(today.getFullYear() + 1, b.getMonth(), b.getDate());
    return Math.round((next - today) / 86400000);
  }

  // Orders placed within the last N days, used both for the "frequent
  // customer" loyalty flag and for the suggested-discount hint at order
  // entry time.
  function ordersInLastNDays(orders, customerId, days) {
    const cutoff = Date.now() - days * 86400000;
    return orders.filter(function (o) {
      return o.customerId === customerId && new Date(o.createdAt || o.date).getTime() >= cutoff;
    });
  }

  function suggestedDiscountPercent(orders, customerId) {
    const count90 = ordersInLastNDays(orders, customerId, 90).length;
    if (count90 >= 6) return 10;
    if (count90 >= 3) return 5;
    return 0;
  }

  // ── Order math ──
  function computeOrderTotals(items, discountPercent) {
    const subtotal = items.reduce(function (s, i) { return s + i.qty * i.unitPrice; }, 0);
    const totalCost = items.reduce(function (s, i) { return s + i.qty * (i.unitCost || 0); }, 0);
    const discountAmount = round2(subtotal * ((discountPercent || 0) / 100));
    const total = round2(subtotal - discountAmount);
    const profit = round2(total - totalCost);
    return { subtotal: round2(subtotal), totalCost: round2(totalCost), discountAmount: discountAmount, total: total, profit: profit };
  }

  function round2(n) { return Math.round(n * 100) / 100; }

  // ── Insights ──
  function computeInsights(orders, customers) {
    const totalRevenue = round2(orders.reduce(function (s, o) { return s + o.total; }, 0));
    const totalCost = round2(orders.reduce(function (s, o) { return s + (o.totalCost || 0); }, 0));
    const totalProfit = round2(totalRevenue - totalCost);
    const marginPercent = totalRevenue > 0 ? round2((totalProfit / totalRevenue) * 100) : 0;
    const orderCount = orders.length;
    const avgOrderValue = orderCount > 0 ? round2(totalRevenue / orderCount) : 0;

    const itemTotals = {};
    orders.forEach(function (o) {
      (o.items || []).forEach(function (i) {
        if (!itemTotals[i.name]) itemTotals[i.name] = { name: i.name, qty: 0, revenue: 0 };
        itemTotals[i.name].qty += i.qty;
        itemTotals[i.name].revenue += i.qty * i.unitPrice;
      });
    });
    const topItems = Object.values(itemTotals).sort(function (a, b) { return b.qty - a.qty; }).slice(0, 10);

    const upcomingBirthdays = customers
      .map(function (c) { return { customer: c, days: daysUntilNextBirthday(c.birthday) }; })
      .filter(function (x) { return x.days !== null && x.days <= 30; })
      .sort(function (a, b) { return a.days - b.days; });

    const frequentCustomers = customers
      .map(function (c) { return { customer: c, count90: ordersInLastNDays(orders, c.id, 90).length }; })
      .filter(function (x) { return x.count90 >= 3; })
      .sort(function (a, b) { return b.count90 - a.count90; });

    return {
      totalRevenue: totalRevenue, totalCost: totalCost, totalProfit: totalProfit, marginPercent: marginPercent,
      orderCount: orderCount, avgOrderValue: avgOrderValue, topItems: topItems,
      upcomingBirthdays: upcomingBirthdays, frequentCustomers: frequentCustomers
    };
  }

  // ── Unified search across customers + orders ──
  function search(query, customers, orders) {
    const q = (query || '').trim().toLowerCase();
    if (!q) return { customers: [], orders: [] };
    const matchedCustomers = customers.filter(function (c) {
      return [c.id, c.name, c.phone, c.email, c.notes].some(function (v) { return (v || '').toLowerCase().includes(q); });
    });
    const matchedOrders = orders.filter(function (o) {
      const itemNames = (o.items || []).map(function (i) { return i.name; }).join(' ');
      const customer = findCustomerById(customers, o.customerId);
      return [o.id, o.date, o.notes, itemNames, customer ? customer.name : ''].some(function (v) { return (v || '').toLowerCase().includes(q); });
    });
    return { customers: matchedCustomers, orders: matchedOrders };
  }

  window.HettysCRM = {
    TOKEN_STORAGE_KEY: TOKEN_STORAGE_KEY,
    fetchLocalJSON: fetchLocalJSON,
    githubGetFile: githubGetFile,
    githubPutFile: githubPutFile,
    saveJSON: saveJSON,
    nextId: nextId,
    findCustomerById: findCustomerById,
    findExistingCustomer: findExistingCustomer,
    customerOrders: customerOrders,
    daysUntilNextBirthday: daysUntilNextBirthday,
    ordersInLastNDays: ordersInLastNDays,
    suggestedDiscountPercent: suggestedDiscountPercent,
    computeOrderTotals: computeOrderTotals,
    computeInsights: computeInsights,
    search: search,
    round2: round2
  };
})();
