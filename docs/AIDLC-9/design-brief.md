# AIDLC-9 Design Brief

## Jira

- Key: AIDLC-9
- Summary: AIDLC smoke: add proxy reuse verification endpoint

## Problem

The AIDLC demo needs a small smoke-test endpoint that can verify requests are reaching Juice Shop through a reused proxy path.

## Product-Safe Assumption

The Jira description does not define an exact route or response contract. To keep the change minimal and avoid challenge behavior, the endpoint will be an unauthenticated REST smoke endpoint that reports only non-sensitive request facts derived by Express:

- request protocol
- request hostname
- request IP
- forwarded host header, when supplied

## Scope

- Add a `GET /rest/proxy-reuse-verification` endpoint.
- Return a static success status and limited proxy-related request metadata.
- Add API test coverage for direct and forwarded requests.

## Out of Scope

- No new challenges or challenge solving behavior.
- No frontend UI or translation changes.
- No dependency changes.
- No changes to intentionally vulnerable behavior.
