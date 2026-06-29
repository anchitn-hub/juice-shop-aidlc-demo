# AIDLC-18 PR Summary

## Jira

- Key: AIDLC-18
- Summary: Change Apple Juice (1000ml) value to 1.99

## Summary

Updated the default seeded product data so Apple Juice (1000ml) is priced at 1.99. Updated focused expectations that derive from that seeded product price.

## Acceptance Criteria Coverage

- Apple Juice (1000ml) displays or stores the value 1.99 wherever this product value is managed through the default product catalog.
- Existing product behavior remains unchanged apart from this value update.
- No unrelated product values were changed.

## Files Changed

- `config/default.yml`
- `test/server/configValidation.unit.test.ts`
- `test/api/chat.test.ts`
- `test/api/order-history.test.ts`
- `docs/AIDLC-18/design-brief.md`
- `docs/AIDLC-18/implementation-plan.md`
- `docs/AIDLC-18/test-plan.md`
- `docs/AIDLC-18/pr-summary.md`

## Tests Run Or Expected From Workflow

- Passed: `node --import ./test/server/helpers/test-env.mjs --import tsx --test --test-force-exit test/server/configValidation.unit.test.ts`
- Passed: `npm run test:frontend` (120 files, 1281 tests). Vitest could not write the GitHub Actions step summary because the sandbox exposes that path as read-only, but the command exited successfully.
- Passed: `npx eslint *.ts data lib models routes test/**/*.ts views`
- Passed: `node --import tsx lib/scripts/lintConfig.ts`
- Passed: `cd frontend && npm run lint`
- Passed: `cd frontend && npm run lint:scss`
- Blocked in sandbox: `npm run lint` fails at `npm run lint:config` because the `tsx` CLI cannot create its IPC pipe under `/tmp/tsx-1001/*.pipe` (`listen EPERM`). The equivalent config lint script passed through `node --import tsx`.
- Blocked in sandbox: `npm run test:server` reached passing output through `test/server/order.unit.test.ts`, then timed out after 240 seconds with remaining files interrupted. The directly affected `test/server/configValidation.unit.test.ts` passed separately.
- Not run in sandbox: API/Supertest tests, per workflow instruction.

## Security Considerations

This change only updates an existing product catalog price and associated test expectations. It does not add vulnerabilities, challenges, challenge behavior, dependencies, routes, authentication behavior, or translation changes.

## Manual Reviewer Notes

- Confirm `/api/Products/1` or product search results show Apple Juice (1000ml) at 1.99 after deployment.
- Confirm the shop UI displays Apple Juice (1000ml) at 1.99 after deployment.
- API test expectations were updated but not run locally because Supertest/API tests are excluded from this sandbox workflow.
- RSN was not run because no challenge source snippet or codefix file was modified.
