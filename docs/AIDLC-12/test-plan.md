# AIDLC-12 Test Plan

## Automated Tests

- Add a server unit test for the route handler response payload.
- Add an API integration test for `GET /rest/aidlc/sandbox-status` response status, content type, and body.

## Local Codex Sandbox Execution

- Run targeted server unit tests for the new handler.
- Run `npm run lint`.
- Do not run API/supertest tests in the Codex action sandbox per story instruction.

## Workflow Expectations

- `npm run test:frontend` should remain clean in workflow.
- `npm run test:server` should remain clean in workflow.
- API coverage should be executed by the normal CI workflow outside this sandbox.

## RSN

RSN is not expected to be required because this change does not modify challenge-related code or code snippets.
