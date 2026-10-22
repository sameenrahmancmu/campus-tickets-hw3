# Security specification — original draft
- SEC-1: WHEN a reservation reaches the server, the server SHALL validate its event, quantity, trimmed name, request ID, and simulated-payment flag independently of browser validation.
- SEC-2: WHEN a name is displayed, the page SHALL render it as plain text, including HTML-like input.
- SEC-3: WHEN a request ID is retried with an identical payload in one process, the server SHALL return the original result without reducing capacity again; IF its payload changes, the server SHALL reject it.
- SEC-4: WHEN a reservation is created, the server SHALL calculate its total from the server's ticket price and quantity, ignoring any client-supplied total or price.
- SEC-5: WHEN deployed for real use, the system SHALL authenticate users and authorize access to reservations.
- SEC-6: WHEN deployed for real use, the system SHALL persist inventory and reservations atomically across instances and restarts.
- SEC-7: WHILE processing abusive traffic, the service SHALL enforce a shared server-side rate limit.
- SEC-8: WHEN a request body exceeds 8 KiB, the server SHALL reject it without creating a reservation.
