# Campus Tickets — HW3 demo
Live demo: https://campus-tickets-hw3.vercel.app/
Public repository: https://github.com/sameenrahmancmu/campus-tickets-hw3

## Specs and scope
The official Canvas Starter A files are now in docs/requirements.md, docs/SECURITY_SPEC.md, and docs/TEST_SPEC.md. Read the HW3 scope appendix and docs/implementation-map.md for deliberate demo substitutions, source-spec conflicts, and original-label mappings. Earlier screenshots/logs say SEC-4 for the price rule; that was an original draft ID. The official rule is SEC-8. Official SEC-4 (role checks) remains unmet.

## Run
Node.js 22 or newer; no dependencies or API keys.
```
npm install
npm test
npm run build
npm run dev
```
Open http://localhost:3000. Buy two Fall social tickets as Alex Tartan through Simulated payment. Copy one displayed ticket code, paste it into the officer demo below, and click Check in ticket. It should show Checked in. Submit the same code again: it should say Already used. Paste another 32-character hex code that was not issued: it should say Invalid ticket.

## Non-goals and limitations
No real payments, sign-in provider, database, real officer authorization, email, QR images, camera decoding, waitlist, seat holds, or cancellation. The scanner field accepts decoded token text, including keyboard scanner output. Typed names do not prove identity. State lives in one process and resets on deploy/restart/cold start; separate Vercel instances may disagree or fail to recognize a ticket. This is a classroom demo, not real ticket sales or secure event admission. If a live valid token unexpectedly says Invalid ticket, record that actual outcome; it demonstrates the memory limitation.

## Part B: Story 6 acceptance-to-test table
| Criterion | Test name | Local result |
|---|---|---|
| A valid scanned token becomes used | Story 6: scanning a valid ticket marks it used | Pass |
| Subsequent scan rejected | Story 6: a later scan of the same ticket is rejected as Already used | Pass |
| Seats have independent tickets | Story 6: separate tickets in one order can each be checked in once | Pass |
| Unknown token rejected | Story 6: an invalid ticket is rejected without consuming a valid ticket | Pass |
| Blank token rejected | Story 6: an empty scanner input is rejected | Pass |
| API enforces single use | Story 6 HTTP: the same ticket receives 200 then 409 through the check-in API | Pass |

## Security spec audit
| Requirement | Status | Evidence or remaining gap |
|---|---|---|
| SEC-1 | Not at all | Typed names only; no CMU SSO. |
| SEC-2 | Not at all | No authenticated sessions or inactivity expiry. |
| SEC-3 | Partly | Live Vercel URL uses HTTPS; HTTP redirect and HSTS enforcement have not been verified. |
| SEC-4 | Not at all | Demo check-in is public; no server-side officer/club authorization. |
| SEC-5 | Not at all | No club permissions or denied-access audit log. |
| SEC-6 | Not at all | No authenticated ticket ownership checks. |
| SEC-7 | Not at all; HW3 substitute | Payments are simulated; no Stripe Checkout is used and no card details are collected. |
| SEC-8 | Fully for simulated totals | Server computes price times validated quantity and ignores client amounts. No real charges are made. |
| SEC-9 | Not at all | No Stripe webhook endpoint or signature verification. |
| SEC-10 | Not at all | Booking replay handling is not Stripe-event idempotency. |
| SEC-11 | Partly | No API keys in this demo; no secrets-manager integration. |
| SEC-12 | Not at all | No connected Stripe accounts or dual approval. |
| SEC-13 | Partly | Unique 128-bit random, PII-free tokens are issued; QR images are not generated. |
| SEC-14 | Partly | Synchronous check-in in one process permits one success per token; distributed consistency is not guaranteed. |
| SEC-15 | Not at all | No scan-abuse pauses or officer notifications. |
| SEC-16 | Not at all | No per-account checkout-hoarding limit. |
| SEC-17 | Partly | Demo stores a display name and transaction/ticket fields; no production Andrew-email or Stripe-ID collection. |
| SEC-18 | Not at all | No scheduled 90-day anonymization. |
| SEC-19 | Not at all | No officer-only CSV export or export logging. |
| SEC-20 | Partly | Dynamic catalog text uses textContent; officer editing is absent and the official E2E injection test has not run. |
| SEC-21 | Not at all | No sensitive-action audit trail. |
| SEC-22 | Not at all | No append-only admin-only log or retention. |

## Part C: SEC-8 before and after
Before (original draft called this SEC-4): Partly — default total uses server price, but client totalCents can override it.
After: Fully for simulated totals — server multiplies its own price by validated quantity and ignores browser totals.
Actual failing evidence: evidence/03-security-failing.txt (the original draft test label says SEC-4). It returns 0 when 2400 is required. That test was written and run before the price fix; no historical labels have been altered. Current tests retain that historical label to match the screenshot; the additional official SEC-8 test verifies the same rule.

## Evidence
Evidence 00–04 records the earlier original-spec build. Evidence 05 records the new official Story 6 tests failing before implementation. Evidence 06 records them passing with the final build. No screenshot or automated local test proves the whole production spec or a live cross-instance guarantee.

## Publishing
Keep framework:null in vercel.json. Upload the api, lib, public, docs, tests, and evidence folders as folders, plus this README.md and vercel.json. No secrets are needed.
