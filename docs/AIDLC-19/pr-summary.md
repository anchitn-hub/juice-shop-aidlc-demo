# AIDLC-19 PR Summary

## Jira Link/Key

- AIDLC-19

## Summary

Updated Apple Juice (1000ml) in the default product catalog from 1.99 to 2.99. Updated server, API, and frontend test expectations that model Apple Juice display, line totals, and seeded order totals.

## Acceptance Criteria Coverage

- Apple Juice (1000ml) displays a price of 2.99 anywhere product prices are shown: covered by `config/default.yml`, server catalog validation, and frontend product/product-details display fixtures.
- Adding Apple Juice (1000ml) to the basket uses 2.99 for line item totals: covered through the canonical product seed value used by basket/order flows and updated frontend line-total fixtures.
- Checkout/order totals calculate using 2.99 for Apple Juice (1000ml): covered by order history fixture expectations, with three Apple Juice items totaling 8.97 and the first seeded order totaling 11.96.
- No other product prices are changed: only the Apple Juice (1000ml) `price` field changed in `config/default.yml`.
- Relevant seed data, fixtures, snapshots, or tests are updated: updated server config validation, API chat/order-history expectations, and frontend price-rendering/order fixtures.

## Files Changed

- `config/default.yml`
- `test/server/configValidation.unit.test.ts`
- `test/api/chat.test.ts`
- `test/api/order-history.test.ts`
- `frontend/src/app/product/product.component.spec.ts`
- `frontend/src/app/product-details/product-details.component.spec.ts`
- `frontend/src/app/order-completion/order-completion.component.spec.ts`
- `frontend/src/app/track-result/track-result.component.spec.ts`
- `frontend/src/app/accounting/accounting.component.spec.ts`
- `docs/AIDLC-19/design-brief.md`
- `docs/AIDLC-19/implementation-plan.md`
- `docs/AIDLC-19/test-plan.md`
- `docs/AIDLC-19/pr-summary.md`

## Tests Run Or Expected From Workflow

Run successfully:

- `node --import ./test/server/helpers/test-env.mjs --import tsx --test --test-force-exit test/server/configValidation.unit.test.ts`
- `npx ng test --include='src/app/product/product.component.spec.ts' --include='src/app/product-details/product-details.component.spec.ts' --include='src/app/order-completion/order-completion.component.spec.ts' --include='src/app/track-result/track-result.component.spec.ts' --include='src/app/accounting/accounting.component.spec.ts'`
- `npx eslint *.ts data lib models routes test/**/*.ts views`
- `node --import tsx lib/scripts/lintConfig.ts`
- `cd frontend && npm run lint`
- `cd frontend && npm run lint:scss`
- `GITHUB_STEP_SUMMARY=/tmp/aidlc-19-vitest-summary.md npm run test:frontend`

Not completed in sandbox:

- `npm run lint`: top-level ESLint passed, but the combined script failed at `npm run lint:config` because the `tsx` CLI could not open its IPC pipe in `/tmp` under the action sandbox (`listen EPERM`). The same config lint script passed with `node --import tsx lib/scripts/lintConfig.ts`.
- `npm run test:server`: the suite reached `test/server/order.unit.test.ts` with passing output, then stalled before `test/server/preconditionValidation.unit.test.ts` on repeated attempts. The touched server spec passed independently.

Not run by instruction:

- API/Supertest tests, including `test/api/chat.test.ts` and `test/api/order-history.test.ts`, were updated but not executed inside the Codex action sandbox.

Expected from workflow:

- `npm run lint`
- `npm run test:server`
- API/Supertest checks in CI or an approved environment

## Security Considerations

This is a catalog seed data and test expectation change only. It does not add vulnerabilities, challenges, auth behavior, authorization behavior, input handling, payment logic, dependencies, or translation changes.

## Manual Reviewer Notes

- Confirm the deployed catalog/search/product details UI shows Apple Juice (1000ml) at 2.99.
- Confirm adding Apple Juice (1000ml) to a basket and placing an order uses 2.99 for line and order totals.
- RSN was not run because no challenge source snippets or codefixes were modified.
