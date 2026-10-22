# Campus Tickets
Original course demo built from newly authored specs in docs/. This is not the official Canvas Tartan Tickets starter set.

## Run
Install Node.js 22 or newer. No external dependencies or API keys are used.
```
npm install
npm test
npm run build
npm run dev
```
Open http://localhost:3000. Click Get tickets, type a made-up name, choose 1–4 tickets, and click Simulated payment. Try a blank name or quantity 5 to see browser rejection. Server validation is independently tested.

## Non-goals and limitations
No real payments, authentication, email, database, cancellation, or external AI calls. Display names are not identities. Data lives in process memory: it resets on every deploy, restart, or cold start, and can differ across Vercel instances. This app is suitable for a classroom demonstration, not real ticket sales. Idempotency and capacity checks hold only inside one process. Public events contain fictional demo details.

## Security spec audit
| Requirement | Current status | Reason |
|---|---|---|
| SEC-1 | Fully | Server validates all reservation fields. |
| SEC-2 | Fully | UI uses textContent to display all dynamic text. |
| SEC-3 | Fully within one process | Replay returns original result; changed payload conflicts. |
| SEC-4 | Fully | Server multiplies its own price by validated quantity and ignores browser totals. |
| SEC-5 | Not at all | No sign-in or authorization. |
| SEC-6 | Not at all | Process memory only. |
| SEC-7 | Not at all | No shared rate limiting. |
| SEC-8 | Fully | API bounds JSON bodies at 8 KiB. |

## Publish
See START_HERE.md for GitHub and Vercel instructions. No deployment has been performed by generating these files.
