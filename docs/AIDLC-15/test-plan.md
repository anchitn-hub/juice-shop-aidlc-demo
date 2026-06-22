# AIDLC-15 Test Plan

## Targeted Checks

- Search product data and tests for Banana Juice price references.
- Verify the Banana Juice (1000ml) data source contains price `1.49`.
- Run focused tests if a relevant non-API test exists.

## Required Workflow Checks

- `npm run lint`
- `npm run test:frontend`
- `npm run test:server`

## Explicitly Skipped in Codex Sandbox

- API/Supertest tests, per story instruction.

## RSN

Run `npm run rsn` only if the implementation modifies challenge-related code or challenge snippets. Otherwise document that RSN was not required.
