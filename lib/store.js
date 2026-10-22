import { randomUUID, randomBytes } from 'node:crypto';
export class AppError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export function createStore() {
  const events = [
    { id: 'fall-social', title: 'Fall social', date: 'November 6, 2026 · 7:00 PM ET', location: 'Cohon University Center', priceCents: 1200, remaining: 24, category: 'COMMUNITY' },
    { id: 'jazz-night', title: 'Jazz after hours', date: 'November 12, 2026 · 8:00 PM ET', location: 'Studio Theater', priceCents: 1800, remaining: 16, category: 'LIVE MUSIC' },
    { id: 'makers', title: 'Sunday makers market', date: 'November 15, 2026 · 11:00 AM ET', location: 'The Cut', priceCents: 500, remaining: 40, category: 'ON CAMPUS' }
  ];
  const requests = new Map();
  const tickets = new Map();
  return {
    listEvents() { return events.map(event => ({ ...event })); },
    reserve(input) {
      if (!input || typeof input !== 'object' || Array.isArray(input)) throw new AppError(400, 'Send a reservation object.');
      const { eventId, quantity, simulatedPayment, requestId } = input;
      if (typeof input.name !== 'string' || !input.name.trim() || input.name.trim().length > 80) throw new AppError(400, 'Enter a name between 1 and 80 characters.');
      const name = input.name.trim();
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 4) throw new AppError(400, 'Choose a whole number of tickets from 1 to 4.');
      if (simulatedPayment !== true) throw new AppError(400, 'Confirm the simulated payment.');
      if (typeof requestId !== 'string' || !/^[A-Za-z0-9_-]{8,100}$/.test(requestId)) throw new AppError(400, 'Send a valid request ID from 8 to 100 characters.');
      const event = events.find(item => item.id === eventId);
      if (!event) throw new AppError(404, 'Event not found.');
      const fingerprint = JSON.stringify({eventId, quantity, name, simulatedPayment});
      if (requests.has(requestId)) {
        const previous = requests.get(requestId);
        if (previous.fingerprint !== fingerprint) throw new AppError(409, 'This request ID was already used for a different reservation.');
        return { ...previous.booking };
      }
      if (quantity > event.remaining) throw new AppError(409, 'Not enough tickets remain.');
      const totalCents = event.priceCents * quantity;
      const ticketTokens = Array.from({length: quantity}, () => randomBytes(16).toString('hex'));
      const booking = { id: randomUUID(), eventId, name, quantity, totalCents, simulated: true, ticketTokens };
      for (const token of ticketTokens) tickets.set(token, { name, eventId, checkedInAt: null });
      event.remaining -= quantity;
      requests.set(requestId, { fingerprint, booking });
      return { ...booking };
    },
    checkIn(input) {
      if (!input || typeof input.token !== 'string' || !/^[a-f0-9]{32}$/.test(input.token)) throw new AppError(400, 'Enter a valid 32-character ticket code.');
      const ticket = tickets.get(input.token);
      if (!ticket) throw new AppError(404, 'Invalid ticket');
      if (ticket.checkedInAt) throw new AppError(409, 'Already used');
      ticket.checkedInAt = new Date().toISOString();
      return { status: 'Checked in', name: ticket.name, eventId: ticket.eventId, checkedInAt: ticket.checkedInAt };
    }
  };
}
