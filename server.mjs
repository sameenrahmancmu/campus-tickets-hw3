import http from 'node:http';
import { readFile } from 'node:fs/promises';
import handler from './api/index.js';
const files = { '/': ['index.html','text/html'], '/app.js': ['app.js','text/javascript'], '/styles.css': ['styles.css','text/css'] };
http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path.startsWith('/api/')) return handler(req, res);
  const file = files[path];
  if (!file) { res.writeHead(404); return res.end('Not found'); }
  try { res.setHeader('Content-Type', file[1]); res.end(await readFile(new URL('./public/' + file[0], import.meta.url))); }
  catch { res.writeHead(500); res.end('Unable to load page'); }
}).listen(Number(process.env.PORT || 3000), () => console.log('Campus Tickets running at http://localhost:' + (process.env.PORT || 3000)));
