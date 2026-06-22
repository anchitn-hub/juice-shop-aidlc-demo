# AIDLC-13 Test Plan

## Targeted Verification

- Run the focused server/product test that covers seeded product data.
- Confirm the Apple Juice 1000ml seeded price is 2.99.

## Workflow Verification

- `npm run lint`
- `npm run test:frontend`
- `npm run test:server`

## Not Run in Sandbox

- `npm run test:api`, because API/Supertest tests are explicitly excluded from the Codex action sandbox for this story.

## RSN

Run `npm run rsn` only if the implementation touches challenge-related code or snippets.
