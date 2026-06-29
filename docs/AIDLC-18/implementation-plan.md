# AIDLC-18 Implementation Plan

## Steps

1. Inspect product seed data and tests for Apple Juice (1000ml).
2. Change the canonical Apple Juice (1000ml) seed price to 1.99.
3. Update any targeted tests that assert the previous Apple Juice price.
4. Run focused verification during development.
5. Run or leave clean for workflow:
   - `npm run lint`
   - `npm run test:frontend`
   - `npm run test:server`

## Constraints

- Do not run API/Supertest tests inside the Codex action sandbox.
- Do not modify translations directly.
- Run or document RSN only if challenge-related code changes.
