// Verifies the admin password server-side. The real password only ever
// lives in the ADMIN_PASSWORD Netlify environment variable — it is never
// shipped to the browser in any client-side file.
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

  if (!process.env.ADMIN_PASSWORD) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'Server not configured: ADMIN_PASSWORD is not set in Netlify environment variables.' })
    };
  }

  if (body.password && body.password === process.env.ADMIN_PASSWORD) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 401, body: JSON.stringify({ ok: false, error: 'Incorrect password.' }) };
};
