# AIDLC-18 Test Plan

## Targeted Verification

- Search the repository for Apple Juice and the previous price to identify affected tests and fixtures.
- Run focused tests covering product seed data if available.

## Required Workflow Verification

- `npm run lint`
- `npm run test:frontend`
- `npm run test:server`

## Not Run In Sandbox

- API/Supertest tests, per Jira workflow instruction.

## RSN

RSN is only required if challenge-related code is modified.
