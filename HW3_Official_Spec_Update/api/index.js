import { createStore, AppError } from '../lib/store.js';
const store = createStore();
export function createHandler(data = store) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const send = (status, payload) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(payload)); };
    const url = new URL(req.url, 'http://localhost');
    const path = url.searchParams.has('route') ? '/api/' + url.searchParams.get('route') : url.pathname.replace(/\/$/, '');
    try {
      if (req.method === 'GET' && path === '/api/events') return send(200, { events: data.listEvents() });
      if (!['/api/bookings', '/api/checkin'].includes(path)) return send(404, { error: 'Route not found.' });
      if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(405, { error: 'Use POST for reservations.' }); }
      let body;
      if (req.body !== undefined) {
        if (Buffer.byteLength(typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) > 8192) throw new AppError(413, 'Request body is too large.');
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } else {
        let size = 0; const chunks = [];
        for await (const chunk of req) { size += chunk.length; if (size > 8192) throw new AppError(413, 'Request body is too large.'); chunks.push(chunk); }
        body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      }
      if (path === '/api/checkin') return send(200, { checkin: data.checkIn(body) });
      return send(200, { booking: data.reserve(body) });
    } catch (error) {
      const status = error instanceof AppError ? error.status : error instanceof SyntaxError ? 400 : 500;
      send(status, { error: status === 500 ? 'Something went wrong. Please try again.' : error instanceof SyntaxError ? 'Send valid JSON.' : error.message });
    }
  };
}
export default createHandler();
