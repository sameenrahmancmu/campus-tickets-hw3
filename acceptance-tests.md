# Acceptance-test plan
AC1–2: catalog shape and initial inventory tests.
AC3: valid reservation returns confirmation and total.
AC4: unknown event returns 404 and leaves inventory unchanged.
AC5: zero, negative, decimal, five, and string quantities each return 400.
AC6: blank and 81-character names return 400; 80-character name succeeds.
AC7: missing simulated-payment confirmation returns 400.
AC8: exhausted inventory returns 409 without a partial booking.
AC9: exact replay returns the same confirmation and capacity changes once.
AC10: changed payload with the same ID returns 409.
AC11: accepted quantity is deducted exactly.
SEC-4: forged totals of zero, negative, and a huge number are ignored.
HTTP integration tests additionally verify malformed JSON, unsupported methods, oversize bodies, and successful routing.

## B2 planning notes
Already built at the initial commit: Story 1, with two catalog tests.
Not built at the initial commit: Story 2 and Story 3.
Selected story: Story 2 only.
Design choice that the spec must decide: Does a repeated click create another reservation? Decision: the same request ID and payload returns the original reservation within one process (AC9); a changed payload conflicts (AC10).
Assumptions: demo events; USD; simulated payments only; names are display labels rather than identity; no email, external API, sign-in, or database.
Test runner: built-in Node.js test runner; no package installation is required.
