import test from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../lib/store.js';
test('SEC-4: the server ignores a forged browser total and computes its own price', () => {
  for (const totalCents of [0,-100,99999999]) {
    const booking = createStore().reserve({eventId:'fall-social',name:'Alex',quantity:2,simulatedPayment:true,requestId:'security-test',totalCents,priceCents:1});
    assert.equal(booking.totalCents,2400);
  }
});
