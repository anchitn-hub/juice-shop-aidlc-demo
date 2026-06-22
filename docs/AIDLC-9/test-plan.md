# AIDLC-9 Test Plan

## Automated Tests

- Add an API test for `GET /rest/proxy-reuse-verification` returning HTTP 200 and `status: success`.
- Add an API test that sends `X-Forwarded-Proto`, `X-Forwarded-Host`, and `X-Forwarded-For` headers and verifies Express reports those proxy-derived values.

## Targeted Commands

```bash
node --import ./test/api/helpers/test-env.mjs --import tsx --test --test-force-exit test/api/http.test.ts
```

## Workflow Commands

```bash
npm run lint
npm run test:frontend
npm run test:server
```

## RSN

RSN is not expected because the change does not modify challenge code, challenge metadata, snippets, or codefix files.
