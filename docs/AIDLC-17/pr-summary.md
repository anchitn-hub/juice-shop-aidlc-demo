# AIDLC-17 PR Summary

## Jira

- Key: AIDLC-17
- Summary: Change Berry Juice (1000ml) value to 1.05

## Summary

Updated the default seeded catalog price for `Berry Juice (1000ml)` from `3.49` to `1.05` and added focused server config validation coverage for the new price.

## Acceptance Criteria Coverage

- `Berry Juice (1000ml)` displays or stores the value `1.05` wherever this product value is managed: covered by `config/default.yml`, the default product catalog source.
- Existing product behavior remains unchanged apart from this value update: only the Berry Juice price and focused test coverage were changed.

## Files Changed

- `config/default.yml`
- `test/server/configValidation.unit.test.ts`
- `docs/AIDLC-17/design-brief.md`
- `docs/AIDLC-17/implementation-plan.md`
- `docs/AIDLC-17/test-plan.md`
- `docs/AIDLC-17/pr-summary.md`

## Tests Run

- `node --import ./test/server/helpers/test-env.mjs --import tsx --test --test-force-exit test/server/configValidation.unit.test.ts` - passed
- `npm run test:frontend` - passed (`120` files, `1281` tests); Vitest also logged a non-fatal warning that the GitHub step-summary path is read-only in this sandbox
- Backend ESLint portion of `npm run lint` - passed before the command reached `lint:config`
- `node --import tsx lib/scripts/lintConfig.ts` - passed
- `cd frontend && npm run lint && npm run lint:scss` - passed

## Tests Expected From Workflow

- `npm run lint`: expected to pass in CI. In this sandbox, it fails at `npm run lint:config` because the `tsx` CLI cannot open `/tmp/tsx-1001/*.pipe` (`EPERM`). The same config lint script passed with `node --import tsx lib/scripts/lintConfig.ts`.
- `npm run test:server`: expected from CI. In this sandbox, it hung twice after `test/server/order.unit.test.ts`; the changed `configValidation.unit.test.ts` passed both as part of the partial output and as a targeted test. A single-file probe of `test/server/preconditionValidation.unit.test.ts` also hung before reporting results.
- API/Supertest tests were not run, per story instruction.

## Security Considerations

This is a static catalog data update. It does not alter authentication, authorization, request handling, payment logic, challenge mechanics, dependencies, uploads/downloads, or intentionally vulnerable behavior.

## RSN

Not run. No challenge-related code or challenge snippets were modified.

## Manual Reviewer Notes

- Confirm the product catalog/API displays `Berry Juice (1000ml)` at `1.05` when seeded from `config/default.yml`.
- Confirm no translated product names or unrelated product prices changed.
