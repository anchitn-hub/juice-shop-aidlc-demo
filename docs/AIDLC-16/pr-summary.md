# AIDLC-16 PR Summary

## Jira

- AIDLC-16
- Change Banana Juice (1000ml) price to 2.49 in Juice Shop demo

## Summary

Updated the default seeded catalog price for `Banana Juice (1000ml)` from `1.49` to `2.49` and updated the existing server config validation test to assert the new price.

## Acceptance Criteria Coverage

- `Banana Juice (1000ml)` displays price `2.49` in the demo UI via the default product catalog data.
- Product API/data source returns price `2.49` because the seeded default product configuration now uses `2.49`.
- Relevant validation coverage was updated in `test/server/configValidation.unit.test.ts`.
- No unrelated product prices were changed.

## Files Changed

- `config/default.yml`
- `test/server/configValidation.unit.test.ts`
- `docs/AIDLC-16/design-brief.md`
- `docs/AIDLC-16/implementation-plan.md`
- `docs/AIDLC-16/test-plan.md`
- `docs/AIDLC-16/pr-summary.md`

## Tests Run Or Expected From Workflow

- Passed: `node --import ./test/server/helpers/test-env.mjs --import tsx --test --test-force-exit test/server/configValidation.unit.test.ts`
- Passed: `./node_modules/.bin/eslint *.ts data lib models routes test/**/*.ts views`
- Passed: `node --import tsx lib/scripts/lintConfig.ts`
- Passed: `cd frontend && npm run lint`
- Passed: `cd frontend && npm run lint:scss`
- Passed: `npm run test:frontend` (`120` files, `1281` tests). Vitest logged a GitHub step-summary write error because the sandbox exposes that runner temp path as read-only, but the command exited successfully.
- Incomplete in sandbox: `npm run lint` reached `npm run lint:config` and failed because the `tsx` CLI could not create an IPC pipe under `/tmp` (`listen EPERM`). The same config linter passed through `node --import tsx`.
- Incomplete in sandbox: `timeout 300s npm run test:server` timed out after progressing through the server suite and passing the edited `configValidation.unit.test.ts`; later server files were still pending when the timeout interrupted the run.
- Not run: API/Supertest tests, per implementation instruction.

## Security Considerations

This change updates static seeded catalog data only. It does not add vulnerabilities, modify challenge behavior, affect authentication/authorization, or change request handling.

## Manual Reviewer Notes

- Review `config/default.yml` around the Banana Juice entry to confirm only that product price changed.
- No translation files were modified.
- RSN was not run because no challenge-related source or codefix files were changed.
