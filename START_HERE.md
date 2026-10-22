# Start here — Campus Tickets

## What this package contains
A complete classroom demo with three original specification files, a responsive page, a Node.js API, 27 automated tests, real failing/passing terminal logs, and local Git history. It uses Node.js built-ins; no third-party packages or API keys are required. Next.js was preferred rather than mandatory in the assignment; this project uses a smaller native Node.js implementation instead.

IMPORTANT: The specifications are new drafts, not the official Canvas starter A files and not your October 1 team's specs. The assignment asks you to use your team's specs or one of the Canvas starter sets. Obtain the three course files and compare/replace these before representing this project as compliant with a course starter. Do not say you used the official Tartan Tickets spec.

## 1. Run it on your Mac
1. Extract this ZIP and open the campus-tickets folder in VS Code.
2. Open Terminal > New Terminal.
3. Run each command separately:
```
node --version
npm install
npm test
npm run build
npm run dev
```
Use Node.js 22 or newer. Visit http://localhost:3000.
Click Get tickets on Fall social. Type Alex Tartan, choose 2 tickets, and click Simulated payment. Expected: confirmation, $24.00 simulated total, inventory reduced by two. No money moves.

## 2. Publish your own public GitHub repository
This folder includes a local .git directory with real commits. Finder may hide it. Preserve it while extracting.
1. In GitHub Desktop choose File > Add Local Repository and select campus-tickets. Do not initialize a nested repository.
2. Inspect History, including the first commit file list. Capture the actual screenshot required by Part A.
3. Review changed files. Never include .env files, keys, node_modules, or .next.
4. Publish repository and uncheck Keep this code private.
5. Open the public GitHub URL and verify the code is visible while signed out.
Git commits were created during this assisted build with your name and known CMU email. Include the AI disclosure in your submission.

## 3. Deploy on Vercel
1. Sign in to Vercel with GitHub and import this repository.
2. Choose Other if a framework is requested. Root directory: campus-tickets repository root, where package.json is located. Build command: npm run build. Output directory: public. Use the supported Node.js runtime matching package.json. No environment variables are needed.
3. The included vercel.json maps /api/events and /api/bookings to the Node function.
4. Deploy. Test the actual URL: the event cards must load from /api/events, and a simulated reservation must return confirmation from /api/bookings. Local tests do not prove hosting works.
5. If deployment fails, preserve the actual build error and fix it. Do not substitute a screenshot of local output for deployment evidence.
6. Make one honest follow-up change after the first deployment, such as adding your actual live URL to README.md. Commit and push it. Wait for another Ready deployment. This gives you the required multiple-deployment screenshot. A single push of three old commits does not automatically create three deployments.
7. Post your live URL, repo link, and accurate spec description in the Canvas gallery. The original gallery deadline has already passed; do not misstate when you posted it.

## 4. Use the recorded evidence accurately
The evidence folder contains actual logs from this build, not invented output:
- 00-initial-tests.txt: Story 1, 2 passing tests.
- 01-story2-failing.txt: 19 tests, 17 failures before Story 2 implementation.
- 02-story2-passing.txt: all 19 Story 1/2 tests pass.
- 02-story2-build.txt: successful syntax/asset/config build check.
- 03-security-failing.txt: forged browser total accepted; 1 failure, 19 passes.
- 04-security-and-http-passing.txt: all 27 tests pass after the fix and HTTP checks.
- 04-final-build.txt: final successful build check.
- security-audit-before-after.md: exact SEC-4 before/after row.

Open the logs in your editor and capture them honestly as recorded terminal logs. If your instructor requires screenshots of an actual terminal run, the archived Git commits allow the earlier stages to be reproduced in a separate folder. Do not claim these are screenshots from your laptop or live deployment. Never roll your working project back unless you understand Git; use a separate checkout instead.

## 5. Finish the submission
SUBMISSION_WORKSHEET.md lists the exact evidence still needed. Part D must be performed manually by you in a browser on a gallery app. Do not run automated attacks. Part E needs the actual Ridge prompt/code and tokenizer counts; no invented token counts or prices are included.

This ZIP is project source, not the PDF/DOCX Canvas submission. The live deployment, screenshot collection, peer testing, and your own final writing remain to be completed.
