# AIDLC-17 Test Plan

## Targeted Tests

- Run the server config validation unit test that checks the Berry Juice price.

## Required Workflow Tests

- `npm run lint`
- `npm run test:frontend`
- `npm run test:server`

## Not Run In Codex Sandbox

- API/Supertest tests, per Jira implementation instruction.

## Manual Validation

- Confirm the default product config contains `Berry Juice (1000ml)` with price `1.05`.
- Confirm no unrelated product prices changed.
