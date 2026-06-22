# AIDLC-14 PR Summary

## Jira Link/Key

AIDLC-14

## Summary

Updated the default seeded product data so Banana Juice (1000ml) is priced at 2.49.

## Acceptance Criteria Coverage

- Banana Juice (1000ml) displays a price of 2.49 anywhere product prices are sourced from the default product data.
- The default seeded product data now uses 2.49 for Banana Juice (1000ml).
- Existing product listing and checkout flows are unchanged; only the product data value changed.

## Files Changed

- `config/default.yml`
- `test/server/configValidation.unit.test.ts`
- `docs/AIDLC-14/design-brief.md`
- `docs/AIDLC-14/implementation-plan.md`
- `docs/AIDLC-14/test-plan.md`
- `docs/AIDLC-14/pr-summary.md`

## Tests Run Or Expected From Workflow

- Passed: `node --import ./test/server/helpers/test-env.mjs --import tsx --test --test-force-exit test/server/configValidation.unit.test.ts`
- Passed: `./node_modules/.bin/eslint *.ts data lib models routes test/**/*.ts views`
- Passed: `node --import tsx lib/scripts/lintConfig.ts`
- Passed: `cd frontend && ./node_modules/.bin/ng lint`
- Passed: `cd frontend && npx stylelint "**/*.scss"`
- Passed: `npm run test:frontend` with 120 files and 1281 tests passing. Vitest reported an additional sandbox-only inability to write the GitHub Actions step summary to a read-only path after tests completed.
- Partial: `npm run test:server` passed the updated config validation test and 36 of 38 server test files. The failures are sandbox listener restrictions in unrelated tests:
  - `test/server/preconditionValidation.unit.test.ts`: `connect EPERM 127.0.0.1:3000` and `listen EPERM 0.0.0.0:3000`
  - `test/server/webhook.unit.test.ts`: `listen EPERM 0.0.0.0`
- Not run: API/Supertest tests, per sandbox instruction.

## Security Considerations

This change does not add vulnerabilities, new challenges, challenge behavior, dependencies, or translation edits. It only changes an existing product price in default demo data.

## Manual Reviewer Notes

- `npm run lint` could not complete directly in the sandbox because the `tsx` CLI attempted to create an IPC pipe under `/tmp` and failed with `EPERM`; the same lint sub-steps were run manually and passed.
- RSN was not run because the changed product is not challenge-related.
