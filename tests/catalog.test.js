import test from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../lib/store.js';
test('AC1: the catalog includes event details, prices, and availability', () => {
  for (const e of createStore().listEvents()) {
    for (const key of ['id','title','date','location','priceCents','remaining']) assert.notEqual(e[key], undefined);
  }
});
test('AC2: a new store contains three events with valid inventory and integer prices', () => {
  const events = createStore().listEvents(); assert.equal(events.length, 3);
  for (const e of events) { assert.ok(Number.isInteger(e.priceCents) && e.priceCents >= 0); assert.ok(e.remaining >= 0); }
});
