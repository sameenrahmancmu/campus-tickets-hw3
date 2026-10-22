# Campus Tickets — original draft specification
These are newly authored specifications for this project, not the official Tartan Tickets starter files from Canvas. Confirm that using an original spec is accepted, or replace these with the course files before claiming alignment with a starter set.

## Story 1: Browse campus events
As a student, I want to see available events so I can choose one.
- AC1: WHEN the catalog is requested, the server SHALL return each event's ID, title, date, location, ticket price, and remaining capacity.
- AC2: WHEN a new process starts, the system SHALL load three demonstration events with nonnegative capacity and prices in integer cents.

## Story 2: Reserve tickets with a simulated payment
As a student, I want to reserve up to four tickets and see my confirmation.
- AC3: WHEN a valid event, name, integer quantity from 1 to 4, simulated-payment confirmation, and request ID are submitted, the server SHALL create a reservation and return its confirmation ID, quantity, and total in cents.
- AC4: IF the event is unknown, the server SHALL reject the request without changing inventory.
- AC5: IF quantity is not an integer from 1 to 4, the server SHALL reject the request without changing inventory.
- AC6: IF the trimmed name is empty or longer than 80 characters, the server SHALL reject the request.
- AC7: IF simulated payment is not explicitly confirmed as true, the server SHALL reject the request.
- AC8: IF requested tickets exceed remaining capacity, the server SHALL reject the request without changing inventory.
- AC9: WHEN an identical request ID and payload are submitted again within a process, the server SHALL return the original confirmation without reserving additional tickets.
- AC10: IF an existing request ID is reused with a different payload, the server SHALL reject the request with a conflict.
- AC11: WHEN a reservation is accepted, the server SHALL reduce remaining capacity by exactly the accepted quantity.

## Story 3: Cancel a reservation (not implemented)
As a student, I want to cancel a reservation and release its seats. Authentication and durable ownership checks are prerequisites for a real version.

## Scope for HW3
- Build story 2: Reserve tickets with a simulated payment.
- No real payments. Use a "Simulated payment" button; real payments are a README non-goal.
- No sign-in provider. Use a name typed into a text box; real authentication is a README non-goal.
- No database. Keep data in memory on the server; it resets on every deploy and may also reset on cold starts or differ across instances.
