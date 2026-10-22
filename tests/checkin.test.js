import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createStore } from '../lib/store.js';
import { createHandler } from '../api/index.js';
const buy = store => store.reserve({eventId:'fall-social',name:'Alex Tartan',quantity:2,simulatedPayment:true,requestId:'checkin-booking'});
test('Story 6: scanning a valid ticket marks it used', () => { const store=createStore(); const booking=buy(store); const result=store.checkIn({token:booking.ticketTokens[0]}); assert.equal(result.status,'Checked in'); assert.ok(result.checkedInAt); assert.equal(result.name,'Alex Tartan'); });
test('Story 6: a later scan of the same ticket is rejected as Already used', () => { const store=createStore(); const booking=buy(store); store.checkIn({token:booking.ticketTokens[0]}); assert.throws(() => store.checkIn({token:booking.ticketTokens[0]}), error => error.status===409 && error.message==='Already used'); });
test('Story 6: separate tickets in one order can each be checked in once', () => { const store=createStore(); const booking=buy(store); assert.equal(booking.ticketTokens.length,2); assert.notEqual(booking.ticketTokens[0],booking.ticketTokens[1]); for(const token of booking.ticketTokens) assert.equal(store.checkIn({token}).status,'Checked in'); });
test('Story 6: an invalid ticket is rejected without consuming a valid ticket', () => { const store=createStore(); const booking=buy(store); assert.throws(() => store.checkIn({token:'f'.repeat(32)}), error=>error.status===404); assert.equal(store.checkIn({token:booking.ticketTokens[0]}).status,'Checked in'); });
test('Story 6: an empty scanner input is rejected', () => { const store=createStore(); assert.throws(() => store.checkIn({token:''}), error=>error.status===400); });
test('Story 6 HTTP: the same ticket receives 200 then 409 through the check-in API', async () => {
  const server=http.createServer(createHandler(createStore())); await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  const post=(path,body)=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
  try {
    const r=await post('/api/bookings',{eventId:'fall-social',name:'Alex',quantity:1,simulatedPayment:true,requestId:'http-checkin'});
    const b=(await r.json()).booking; const token=b.ticketTokens?.[0] || 'not-issued-yet';
    assert.equal((await post('/api/checkin',{token})).status,200);
    const second=await post('/api/checkin',{token}); assert.equal(second.status,409); assert.equal((await second.json()).error,'Already used');
  } finally { await new Promise(resolve=>server.close(resolve)); }
});
