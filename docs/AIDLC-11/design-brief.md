# AIDLC-11 Design Brief

## Jira

- Key: AIDLC-11
- Summary: AIDLC smoke add pipeline status endpoint

## Goal

Add a small smoke endpoint at `GET /rest/aidlc/pipeline-status` that returns JSON indicating the AIDLC pipeline is golden.

Expected response body:

```json
{
  "status": "success",
  "data": {
    "pipeline": "golden"
  }
}
```

## Assumptions

- This endpoint is operational demo plumbing, not a Juice Shop challenge.
- The endpoint must not affect challenge state, scoring, hints, or intentional vulnerabilities.
- No frontend copy or translation changes are required.

## Security Notes

- The endpoint returns static non-sensitive data.
- No user input, authentication state, database access, or challenge behavior is involved.
