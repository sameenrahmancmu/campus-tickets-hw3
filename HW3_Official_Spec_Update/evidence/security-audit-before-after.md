# Part C: SEC-4 evidence

Before, in the Story 2 commit:
| Requirement | Status | Reason |
|---|---|---|
| SEC-4 | Partly | Default total uses server price, but client totalCents can override it. |

After:
| Requirement | Status | Reason |
|---|---|---|
| SEC-4 | Fully | Server multiplies its own price by validated quantity and ignores browser totals. |

Failing test: SEC-4: the server ignores a forged browser total and computes its own price.
Observed failure: expected 2400 cents but received 0 cents.
Fix: remove the client total override; compute event.priceCents * validated quantity.
Remaining: real payments, persistent inventory, authentication, and shared rate limiting are not implemented.

C-why: explain this yourself in 2–3 sentences. Relevant fact: a visitor can bypass the page and submit a different API request; server enforcement does not rely on that visitor's browser or a model following instructions.
