# AIDLC-12 Design Brief

## Jira

- Key: AIDLC-12
- Summary: AIDLC smoke add sandbox safe pipeline endpoint

## Goal

Add `GET /rest/aidlc/sandbox-status` for the AIDLC demo pipeline. The endpoint returns static JSON:

```json
{
  "status": "success",
  "data": "sandbox safe"
}
```

## Assumptions

- The endpoint is a smoke-test endpoint only.
- No authentication, persistence, challenge state, or frontend UI is required.
- No translation changes are required because there is no user-facing UI copy.
- The existing AIDLC route pattern is the preferred implementation location.

## Security

This change must not introduce new vulnerabilities or challenge behavior. The endpoint returns fixed static data and does not process user input.
