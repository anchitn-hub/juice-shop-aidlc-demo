# AIDLC-12 Implementation Plan

## Scope

Add the smallest backend change needed for `GET /rest/aidlc/sandbox-status`.

## Steps

1. Inspect existing AIDLC route and test patterns.
2. Add a route handler that returns the required static JSON.
3. Register the handler in `server.ts` under the existing custom REST API routes.
4. Add focused server unit coverage for the handler.
5. Add focused API test coverage for the registered route, but do not run API tests in the Codex action sandbox.
6. Run targeted server tests and lint where feasible.

## Out Of Scope

- New challenges or challenge metadata.
- Frontend UI changes.
- Translation changes.
- Dependency changes.
