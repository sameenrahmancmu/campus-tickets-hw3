# Official-spec reconciliation
The first generated draft used original Campus Tickets identifiers, before the official Canvas files were supplied. Those old labels remain in archived logs and screenshots; they must not be presented as original Canvas labels.

| Earlier draft | Official Canvas mapping |
|---|---|
| Original Story 2: reserve tickets | Partial implementation of official Story 3: Buy tickets |
| Original SEC-4: server-computed price | Official SEC-8: server-computed charge amount |
| Original SEC-1: input validation | Additional local validation control, not official SEC-1 (CMU SSO) |
| Original SEC-3: duplicate reservation IDs | Additional local replay control, not official SEC-3 (HTTPS/HSTS) |
| New Story 6 | Official Story 6 check-in, tested at the decoded-token/API boundary; no camera/QR-image generation |

The official TEST_SPEC uses REQ-x identifiers that are not defined in its companion requirements.md, has a configurable limit up to ten while requirements.md caps purchases at four, and uses disabled sold-out Buy while requirements.md asks for Join waitlist. These are unresolved source-spec conflicts; no claim is made that every starter test passes. Current local tests describe the demo's scoped behavior only. Full original draft specs can be recovered from the earlier local Git commits.

## Story 6 plan made before implementation
Already present: event catalog, simulated bookings, server validation and pricing. Missing: check-in.
Acceptance criterion: a scanned ticket becomes used and later scans are rejected.
Tests written first: valid scan; repeat scan; independent tickets; unknown token; blank token; HTTP first scan 200 and replay 409.
Assumption resolved: one ticket token represents one seat, not the whole booking. A keyboard-style scanner supplies decoded text; manual paste is the classroom substitute. A real role system is outside HW3's sign-in scope and remains an audit gap.
