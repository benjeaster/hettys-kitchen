// Regenerates menu-today.html from the admin builder's selection and commits
// it directly to GitHub via the Contents API. The GitHub token stays server-side
// (Netlify environment variable) and is never exposed to the browser.

const GITHUB_OWNER = 'benjeaster';
const GITHUB_REPO_NAME = 'hettys-kitchen';
const FILE_PATH = 'menu-today.html';

function escapeHtml(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function renderCategory(cat) {
  const title = escapeHtml(cat.name);
  let html = '  <section class="group">\n';
  html += '    <div class="group-header"><div class="group-line"></div><h2 class="group-title">' + title + '</h2><div class="group-line"></div></div>\n';
  if (cat.note) {
    html += '    <p class="group-note">' + escapeHtml(cat.note) + '</p>\n';
  }

  if (cat.isProteinRow) {
    html += '    <div class="protein-row">\n';
    (cat.items || []).forEach(function (item) {
      html += '      <div class="protein-item"><span class="picon">' + (item.icon || '🍽️') + '</span>' + escapeHtml(item.name) + '</div>\n';
    });
    html += '    </div>\n';
  } else if (cat.name === 'Drinks') {
    html += '    <div class="drinks-grid">\n';
    (cat.items || []).forEach(function (item) {
      html += renderDish(item, '      ');
    });
    html += '    </div>\n';
  } else {
    (cat.items || []).forEach(function (item) {
      html += renderDish(item, '    ');
    });
  }

  if (cat.noteAfter) {
    html += '    <p class="group-note" style="margin-top:14px;">' + escapeHtml(cat.noteAfter) + '</p>\n';
  }
  html += '  </section>\n';
  return html;
}

function renderDish(item, indent) {
  const name = escapeHtml(item.name);
  const note = item.note ? '<span class="dish-note">' + escapeHtml(item.note) + '</span>' : '';
  const price = escapeHtml(item.price);
  return indent + '<div class="dish"><span class="dish-name">' + name + note + '</span><span class="dish-price">' + price + '</span></div>\n';
}

function buildMenuHtml(dateFormatted, categories) {
  const sections = categories.map(renderCategory).join('\n');
  return `<title>Menu of the Day — Hetty's African Kitchen</title>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --beige: #e8d5c0;
    --beige-light: #f5ede3;
    --beige-dark: #d4b896;
    --kraft: #c9a87c;
    --brown-dark: #7a4a2a;
    --brown-mid: #a0683a;
    --brown-warm: #b07c52;
    --cream: #fdf8f3;
    --white: #ffffff;
    --gold: #b8892a;
    --shadow: rgba(122, 74, 42, 0.12);
  }

  * { box-sizing: border-box; }

  html {
    font-size: 25px;
  }

  body {
    margin: 0;
    background: var(--cream);
    color: var(--brown-dark);
    font-family: 'Cormorant Garamond', Georgia, serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  .bg-slideshow {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .bg-slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity 2s ease-in-out;
  }

  .bg-slide.active { opacity: 0.16; }

  .wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 24px 72px;
  }

  .hero {
    text-align: center;
    padding: 48px 16px 32px;
  }

  .medallion {
    width: 104px;
    height: 104px;
    margin: 0 auto 18px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--kraft);
    box-shadow: 0 0 0 7px var(--white), 0 8px 24px var(--shadow);
  }

  .medallion img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .wordmark {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(3rem, 13vw, 4.2rem);
    line-height: 1;
    color: var(--brown-dark);
    text-wrap: balance;
  }

  .subline {
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--brown-mid);
    margin-top: 10px;
  }

  .eyebrow {
    display: inline-block;
    margin-top: 26px;
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    padding: 7px 20px;
    border: 1px solid var(--kraft);
    border-radius: 999px;
  }

  .heading {
    font-family: 'Jost', sans-serif;
    font-weight: 700;
    font-size: clamp(1.7rem, 5vw, 2.1rem);
    letter-spacing: 0.02em;
    color: var(--brown-dark);
    margin: 16px 0 4px;
    text-wrap: balance;
  }

  .date {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.3rem;
    color: var(--brown-mid);
  }

  section.group {
    margin-top: 40px;
  }

  .group-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }

  .group-line {
    flex: 1;
    height: 1px;
    background: var(--beige-dark);
  }

  .group-title {
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    font-size: 1.3rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--brown-dark);
    white-space: nowrap;
  }

  .group-note {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.3rem;
    color: var(--brown-mid);
    margin: -4px 0 16px;
  }

  .dish {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--beige-dark);
  }

  .dish:last-child { border-bottom: none; }

  .dish-name {
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--brown-dark);
    flex: 1;
    text-wrap: balance;
  }

  .dish-note {
    display: block;
    font-style: italic;
    font-size: 1.1rem;
    color: var(--brown-mid);
    font-weight: 400;
    margin-top: 2px;
  }

  .dish-price {
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--gold);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .drinks-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
  }

  @media (min-width: 820px) {
    .drinks-grid {
      grid-template-columns: 1fr 1fr;
      column-gap: 32px;
    }
  }

  .drinks-grid .dish { padding: 10px 0; }
  .drinks-grid .dish-name { font-size: 1.25rem; }
  .drinks-grid .dish-price { font-size: 1.2rem; }

  .protein-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 28px;
    margin-top: 18px;
    padding: 16px;
    background: var(--white);
    border: 1px solid var(--beige-dark);
    border-radius: 4px;
  }

  .protein-item {
    text-align: center;
    font-family: 'Jost', sans-serif;
    font-size: 1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--brown-dark);
    font-weight: 500;
  }

  .protein-item .picon {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 6px;
  }

  footer {
    text-align: center;
    margin-top: 56px;
    padding-top: 28px;
    border-top: 1px solid var(--beige-dark);
  }

  .signoff {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.25rem;
    color: var(--brown-mid);
  }

  .stamp {
    margin-top: 10px;
    font-family: 'Jost', sans-serif;
    font-weight: 500;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--kraft);
  }

  :focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }
</style>

<div class="bg-slideshow" id="bgSlideshow">
  <div class="bg-slide active" style="background-image: url('images/restaurant/rest0.jpeg');"></div>
  <div class="bg-slide" style="background-image: url('images/restaurant/rest1.jpg');"></div>
  <div class="bg-slide" style="background-image: url('images/restaurant/rest4.jpg');"></div>
  <div class="bg-slide" style="background-image: url('images/restaurant/rest2.jpg');"></div>
  <div class="bg-slide" style="background-image: url('images/restaurant/rest8.jpg');"></div>
</div>

<div class="wrap">

  <div class="hero">
    <div class="medallion"><img src="images/hetty-logo.jpeg" alt="Hetty's African Kitchen"></div>
    <div class="wordmark">Hetty's</div>
    <div class="subline">African Kitchen</div>
    <div class="eyebrow">Today Only</div>
    <h1 class="heading">Menu of the Day</h1>
    <div class="date">${escapeHtml(dateFormatted)}</div>
  </div>

${sections}
  <footer>
    <div class="signoff">Come, eat, enjoy and feel at home.</div>
    <div class="stamp">Hetty's African Kitchen · Today's Menu</div>
  </footer>

</div>

<script>
  (function () {
    const slides = document.querySelectorAll('#bgSlideshow .bg-slide');
    let current = 0;
    if (slides.length > 1) {
      setInterval(function () {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 6000);
    }
  })();
</script>
`;
}

async function githubRequest(url, options) {
  return fetch(url, Object.assign({}, options, {
    headers: Object.assign({
      'Authorization': 'Bearer ' + process.env.GITHUB_TOKEN,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'hettys-kitchen-admin'
    }, (options && options.headers) || {})
  }));
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Method not allowed.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Bad request.' }) };
  }

  if (!process.env.ADMIN_PASSWORD || !process.env.GITHUB_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'Server not configured: ADMIN_PASSWORD and/or GITHUB_TOKEN are missing from Netlify environment variables.' })
    };
  }

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ ok: false, error: 'Incorrect password.' }) };
  }

  if (!body.dateFormatted || !Array.isArray(body.categories) || body.categories.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Missing date or no items selected.' }) };
  }

  const branch = process.env.GITHUB_BRANCH || 'main';
  const newHtml = buildMenuHtml(body.dateFormatted, body.categories);

  try {
    const getUrl = 'https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO_NAME + '/contents/' + FILE_PATH + '?ref=' + branch;
    const getRes = await githubRequest(getUrl);
    if (!getRes.ok) {
      const errText = await getRes.text();
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: 'Could not read the current file from GitHub (' + getRes.status + '). ' + errText.slice(0, 200) }) };
    }
    const getData = await getRes.json();

    const putUrl = 'https://api.github.com/repos/' + GITHUB_OWNER + '/' + GITHUB_REPO_NAME + '/contents/' + FILE_PATH;
    const putRes = await githubRequest(putUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Update menu-today.html via Admin (' + body.dateFormatted + ')',
        content: Buffer.from(newHtml, 'utf-8').toString('base64'),
        sha: getData.sha,
        branch: branch
      })
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: 'GitHub rejected the update (' + putRes.status + '). ' + errText.slice(0, 200) }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Unexpected error: ' + e.message }) };
  }
};
