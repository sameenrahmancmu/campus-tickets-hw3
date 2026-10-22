import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createHandler } from '../api/index.js';
import { createStore } from '../lib/store.js';
async function withServer(run) {
  const server = http.createServer(createHandler(createStore()));
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}
const valid = {eventId:'fall-social',name:'Alex',quantity:2,simulatedPayment:true,requestId:'http-request'};
test('HTTP: the catalog route returns fresh JSON', () => withServer(async base => { const r=await fetch(base+'/api/events'); assert.equal(r.status,200); assert.equal(r.headers.get('cache-control'),'no-store'); assert.equal((await r.json()).events.length,3); }));
test('HTTP: Vercel rewrite query routes reach the catalog', () => withServer(async base => { const r=await fetch(base+'/api?route=events'); assert.equal(r.status,200); assert.equal((await r.json()).events.length,3); }));
test('HTTP: booking ignores a forged total and returns confirmation', () => withServer(async base => { const r=await fetch(base+'/api/bookings',{method:'POST',body:JSON.stringify({...valid,totalCents:0})}); assert.equal(r.status,200); assert.equal((await r.json()).booking.totalCents,2400); }));
test('HTTP: invalid JSON returns 400 rather than creating a reservation', () => withServer(async base => { const r=await fetch(base+'/api/bookings',{method:'POST',body:'{bad'}); assert.equal(r.status,400); }));
test('HTTP: a non-POST booking request is rejected', () => withServer(async base => { const r=await fetch(base+'/api/bookings'); assert.equal(r.status,405); assert.equal(r.headers.get('allow'),'POST'); }));
test('HTTP: a body larger than 8 KiB returns 413', () => withServer(async base => { const r=await fetch(base+'/api/bookings',{method:'POST',body:JSON.stringify({...valid,name:'x'.repeat(9000)})}); assert.equal(r.status,413); }));
test('HTTP: server validation rejects an over-cap quantity', () => withServer(async base => { const r=await fetch(base+'/api/bookings',{method:'POST',body:JSON.stringify({...valid,quantity:5})}); assert.equal(r.status,400); }));
