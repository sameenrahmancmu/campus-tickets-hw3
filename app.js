const $ = id => document.getElementById(id);
const money = cents => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(cents / 100);
let events = []; let pending = null;
function node(tag, text, className) { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (className) el.className = className; return el; }
function estimate() { const event = events.find(e => e.id === $('event').value); $('estimate').textContent = event ? money(event.priceCents * Number($('quantity').value || 0)) : '—'; }
async function load() {
  const response = await fetch('/api/events'); if (!response.ok) throw new Error('Unable to load events. Please refresh.');
  events = (await response.json()).events; const selected = $('event').value;
  $('event-list').replaceChildren(); $('event').replaceChildren();
  events.forEach((event, index) => {
    const card = node('article', undefined, 'card'); const art = node('div', undefined, 'art');
    art.append(node('b', ['hello!','jazz.','make.'][index] || 'go!'), node('span', 'FALL / 2026'));
    const body = node('div', undefined, 'card-body'); body.append(node('div',event.category,'category'),node('h3',event.title),node('div',event.date,'details'),node('div',event.location,'details'),node('div',`${event.remaining} tickets available`,'details'));
    const bottom = node('div', undefined, 'card-bottom'); const choose = node('button',event.remaining ? 'Get tickets ↗' : 'Sold out'); choose.type = 'button'; choose.disabled = !event.remaining;
    choose.addEventListener('click', () => { $('event').value = event.id; pending = null; estimate(); $('booking-form').scrollIntoView({behavior:'smooth',block:'center'}); $('name').focus(); });
    bottom.append(node('strong',money(event.priceCents)),choose); body.append(bottom); card.append(art,body); $('event-list').append(card);
    const option = node('option',event.title); option.value = event.id; $('event').append(option);
  });
  if (events.some(e => e.id === selected)) $('event').value = selected;
  $('catalog-status').textContent = ''; estimate();
}
$('booking-form').addEventListener('input', () => { pending = null; estimate(); });
$('booking-form').addEventListener('submit', async event => {
  event.preventDefault(); if (!$('booking-form').reportValidity()) return;
  if (!pending) pending = { eventId:$('event').value, name:$('name').value, quantity:Number($('quantity').value), simulatedPayment:true, requestId:crypto.randomUUID() };
  $('reserve').disabled = true; $('result').textContent = 'Reserving your spot…';
  try {
    const response = await fetch('/api/bookings', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(pending)});
    const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Reservation failed.');
    const b = data.booking; $('result').textContent = `${b.name}, you’re on the list! ${b.quantity} ticket(s) · ${money(b.totalCents)} simulated total. Confirmation: ${b.id}. No money was collected.`;
    try { await load(); } catch { $('result').append(node('p','Reservation confirmed. Refresh to update availability.')); }
  } catch (error) { $('result').textContent = error.message + ' You can retry safely using the same form.'; }
  finally { $('reserve').disabled = false; }
});
load().catch(error => { $('catalog-status').textContent = error.message; $('reserve').disabled = true; });
