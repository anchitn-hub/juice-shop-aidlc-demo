You are Codex implementing a Jira story for the AIDLC Juice Shop demo.

Use the environment variables:

- `ISSUE_KEY`
- `ISSUE_SUMMARY`
- `ISSUE_DESCRIPTION`

Repository rules:

1. Read `AGENTS.md` before editing.
2. Juice Shop is intentionally vulnerable. Do not add new vulnerabilities, new challenges, or challenge behavior unless the Jira story explicitly asks for that and the acceptance criteria are clear.
3. Do not modify translations directly. Use UI copy that does not require i18n changes unless the Jira story explicitly scopes localization.
4. Remove AI-generated noise. Keep comments only when they explain non-obvious logic.
5. Keep the change focused and suitable for a PR into `main`.

Before code changes, create:

- `docs/${ISSUE_KEY}/design-brief.md`
- `docs/${ISSUE_KEY}/implementation-plan.md`
- `docs/${ISSUE_KEY}/test-plan.md`

Then:

1. Inspect the relevant code and tests.
2. Make the smallest code change that satisfies the Jira story.
3. Add or update appropriate tests.
4. Prefer targeted tests while iterating, then leave `npm run lint`, `npm run test:frontend`, and `npm run test:server` clean for the workflow.
5. If challenge-related code is modified, run or document the need for `npm run rsn`.
6. Write `docs/${ISSUE_KEY}/pr-summary.md` with:
   - Jira link/key
   - Summary
   - Acceptance criteria coverage
   - Files changed
   - Tests run or expected from workflow
   - Security considerations
   - Manual reviewer notes

If the story is ambiguous, make the smallest product-safe assumption and record it in the design brief.
