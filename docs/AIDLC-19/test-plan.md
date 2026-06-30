# AIDLC-19 Test Plan

## Targeted Verification

- Confirm Apple Juice (1000ml) seed data uses price 2.99.
- Run any existing unit tests that cover product seed data or catalog pricing.
- Update and run focused tests if existing coverage asserts the old price.

## Workflow Verification

Expected workflow checks:

- `npm run lint`
- `npm run test:frontend`
- `npm run test:server`

## Not Run In Sandbox

- API/Supertest tests are intentionally not run in the Codex action sandbox per story instructions.

## RSN

Run `npm run rsn` only if the implementation touches challenge-related source snippets or codefixes.
