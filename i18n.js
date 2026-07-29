// Generic EN/PT toggle engine shared by index.html and every generated
// menu-today.html. Walks visible text nodes (and input placeholders) and
// swaps them using the PT_TRANSLATIONS / PT_WORD_REPLACEMENTS dictionary
// from translations.js. Anything not in the dictionary is left in English
// rather than breaking the page - this lets the toggle cover the whole site
// without needing every string translated up front.
(function () {
  const LANG_KEY = 'hettys_lang';

  const EN_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const PT_WEEKDAYS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const PT_MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  function normalizeKey(s) {
    return s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  }

  // Handles the "Weekday, D Month YYYY" dates admin.html bakes into
  // menu-today.html, which change daily and can't live in a static dictionary.
  function translateDateString(key) {
    const m = /^(\w+), (\d{1,2}) (\w+) (\d{4})$/.exec(key);
    if (!m) return null;
    const wIdx = EN_WEEKDAYS.indexOf(m[1]);
    const mIdx = EN_MONTHS.indexOf(m[3]);
    if (wIdx === -1 || mIdx === -1) return null;
    return PT_WEEKDAYS[wIdx] + ', ' + m[2] + ' de ' + PT_MONTHS[mIdx] + ' de ' + m[4];
  }

  function translateValue(original, lang) {
    if (lang !== 'pt') return original;
    const key = normalizeKey(original);
    if (!key) return original;

    const lead = original.match(/^\s*/)[0];
    const trail = original.match(/\s*$/)[0];

    if (typeof PT_TRANSLATIONS !== 'undefined' && Object.prototype.hasOwnProperty.call(PT_TRANSLATIONS, key)) {
      return lead + PT_TRANSLATIONS[key] + trail;
    }

    const dated = translateDateString(key);
    if (dated) return lead + dated + trail;

    if (typeof PT_WORD_REPLACEMENTS !== 'undefined') {
      let replaced = original;
      PT_WORD_REPLACEMENTS.forEach(function (pair) { replaced = replaced.replace(pair[0], pair[1]); });
      if (replaced !== original) return replaced;
    }

    return original;
  }

  function applyTranslation(target, prop, lang, isAttr) {
    const current = isAttr ? target.getAttribute(prop) : target[prop];
    if (current == null) return;
    if (!target.__origEn) target.__origEn = {};
    if (target.__origEn[prop] === undefined) target.__origEn[prop] = current;
    const translated = translateValue(target.__origEn[prop], lang);
    if (isAttr) target.setAttribute(prop, translated); else target[prop] = translated;
  }

  function translatePage(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt' : 'en';

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        const tag = node.parentNode && node.parentNode.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) { applyTranslation(node, 'nodeValue', lang, false); });

    document.querySelectorAll('[placeholder]').forEach(function (el) {
      applyTranslation(el, 'placeholder', lang, true);
    });
  }

  function initLangToggle(buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    let lang = 'en';
    try { lang = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { /* storage unavailable */ }

    function setLang(next) {
      lang = next;
      translatePage(lang);
      btn.textContent = lang === 'en' ? 'Português' : 'English';
      btn.setAttribute('aria-label', lang === 'en' ? 'Ver em Português' : 'View in English');
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
    }

    btn.addEventListener('click', function () { setLang(lang === 'en' ? 'pt' : 'en'); });
    setLang(lang);
  }

  window.HettysI18n = { translatePage: translatePage, initLangToggle: initLangToggle };
})();
