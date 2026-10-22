# HW3 submission worksheet — NOT a completed submission
Name: Sameen Rahman
Live Vercel URL: [add actual URL]
Public GitHub URL: [add actual URL]
Spec provenance: original Campus Tickets draft; replace/compare with permitted course specs before submission.

## Part A
[Insert actual first-commit file-list screenshot.]
[Insert actual Vercel Deployments screenshot showing at least two deployments.]

## Part B
Story 2: Reserve tickets with a simulated payment.
Paste Scope for HW3 from docs/requirements.md.

| Acceptance criterion | Test name (see tests/reservations.test.js for exact full name) | Passing |
|---|---|---|
| AC3: valid booking | AC3: a valid request returns a confirmation and simulated total | Yes, local |
| AC4: unknown event | AC4: an unknown event is rejected without changing inventory | Yes, local |
| AC5: integer quantity 1–4 | AC5: quantity … is rejected without changing inventory (five cases) | Yes, local |
| AC6: name length and trimming | AC6: a blank name is rejected; a name longer than 80 characters is rejected; an 80-character name is accepted and names are trimmed | Yes, local |
| AC7: simulated-payment flag | AC7: an unconfirmed simulated payment is rejected | Yes, local |
| AC8: capacity | AC8: sold-out inventory cannot be oversold | Yes, local |
| AC9: duplicate submission | AC9: retrying the same request returns the same confirmation and reduces capacity once | Yes, local |
| AC10: conflicting replay | AC10: reusing a request ID with a different payload is rejected | Yes, local |
| AC11: inventory deduction | AC11: accepted tickets are deducted exactly once | Yes, local |

[Insert failing and passing test/build evidence; recorded logs are in evidence/.]

Run these yourself at your LIVE Vercel URL, then fill the last column:
| What I tried | What the spec says should happen | What actually happened |
|---|---|---|
| Fall social, Alex Tartan, 2 tickets, simulated payment | Confirmation, $24.00 simulated total, inventory minus two | [observe] |
| Leave the name blank and submit | Request refused; no reservation | [observe] |
| Enter 5 tickets and submit | Request refused; no reservation | [observe] |

[Insert GitHub commit-history screenshot.]

## Part C
Paste before/after rows from evidence/security-audit-before-after.md.
[Insert actual failed SEC-4 and passing test evidence.]
C-why: [write 2–3 sentences in your own words; use the facts in the evidence note.]

## Part D
Classmate's live URL: [required]
Classmate's public repository: [required]
Read their specs first. Only use manual browser interaction, harmless input, and made-up data. The examples below are a plan, NOT completed attempts. Replace each with exact actions and observations, tied to their real requirement IDs.

| # | Exact input or steps | Actual story/SEC number | Expected behavior | Actual behavior | Broke? | Severity and reason |
|---|---|---|---|---|---|---|
| 1 | Input: blank required name or one over their quantity cap | [from their spec] | [from their spec] | [observe] | [yes/no/partly] | [explain] |
| 2 | Text: <b>hello</b> in a name/message field | [from their spec] | [from their spec] | [observe] | [yes/no/partly] | [explain] |
| 3 | Timing: double-click the submission button | [from their spec] | [from their spec] | [observe] | [yes/no/partly] | [explain] |
| 4 | Inspect: manually view the outgoing request in browser Network panel | [from their spec] | [from their spec] | [observe; a sent total alone does not prove the server trusts it] | [yes/no/partly] | [explain] |

D1: [write an EARS requirement addressing your real finding, then explain a test.]

## Part E: write your own 300–400-word memo, plus the cost table
To: [club officer/manager]
Recommendation: [yes/no/yes-if, grounded in actual tests and live observations]
Still unmet: SEC-5 authentication and SEC-6 durable, atomic inventory are two major user-facing gaps. SEC-7 shared rate limiting is also unmet. Explain business consequences and needed services.
Agent decision: retry behavior needed an explicit rule. Possible spec line already adopted in AC9: WHEN an identical request ID and payload are retried within a process, the server SHALL return the original confirmation without reserving additional tickets. Explain this in your words.

For E4, obtain the actual Ridge INSTRUCTIONS, five tool descriptions, and typical customer question from Canvas or your own Ridge code. Use the model actually named there. The assignment mentions gemini-3.5-flash; verify that exact name and its current official pricing, and explicitly flag any discrepancy rather than silently substituting another model.

| Item | Your number | Method/source and date checked |
|---|---|---|
| Model | [verify exact ID] | [actual Ridge source] |
| Input tokens per model call | [measure] | tiktokenizer.com; record tokenizer, and note it may only approximate Gemini tokenization |
| Output tokens per reply | [estimate from actual rule] | Roughly word limit × 4/3 |
| Model calls per reply | [justify; allow for tool steps] | Distinguish final reply from intermediate tool-call outputs |
| Input price per million | [verify] | https://ai.google.dev/gemini-api/docs/pricing ; [date] |
| Output price per million | [verify] | https://ai.google.dev/gemini-api/docs/pricing ; [date] |
| Cost per request | [calculate] | (sum of input tokens across all calls × input price + sum of output tokens across all calls × output price) / 1,000,000 |
| Cost per day | [calculate] | Cost per request × 10,000 |
| Cost per 30 days | [calculate] | Daily cost × 30 |
| Hosting | [verify eligibility and cost] | https://vercel.com/docs/plans/hobby ; https://vercel.com/pricing ; [date] |

Explicitly state whether repeated tool-call context and growing conversation/customer memory are included. Check free-tier quotas for the exact model and current data-use terms at https://ai.google.dev/gemini-api/terms . Do not assume a displayed free tier covers 10,000 requests/day. Finish with observed or unmeasured latency and what you would measure to validate the estimate.

## AI use disclosure — adapt accurately
I used ChatGPT/Codex to create the original draft specifications, application code, automated tests, local test/build logs, and this submission worksheet. The build process recorded failing tests before implementing the reservation feature and the SEC-4 fix. [Add the deployment, live checks, peer testing, writing, and any other AI use you actually completed.] I reviewed [state what you reviewed].
