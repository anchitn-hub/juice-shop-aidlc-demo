# AIDLC Juice Shop Golden Pipeline Runbook

## Goal

Show the golden AI-assisted delivery lifecycle where Codex turns a request into a Jira story, accepts it, implements against Juice Shop, runs security review and CI gates, opens a PR, waits for human approval, deploys from `main`, and updates Jira through every stage.

## Demo Flow

1. Start from Codex with a change request.
2. Dispatch `AIDLC Request To Jira`.
3. The workflow creates a Jira Story and transitions it to `In Progress`.
4. Jira Automation sees the new Jira story and dispatches `Jira To Codex PR`.
5. Codex implements the story in a `codex/<JIRA_KEY>` branch.
6. The workflow rejects docs-only changes when a code change is required.
7. `npm run lint`, `npm run test:frontend`, and `npm run test:server` run. The full aggregate `npm test` command still exists for local/upstream use, but the AIDLC demo gate avoids API tests that depend on external services and seeded runtime preconditions.
8. Codex runs pre-PR security review and writes `docs/<JIRA_KEY>/security-pre-pr.md`.
9. Jenkins demo gate runs. If Jenkins credentials are absent, it writes a simulated evidence artifact.
10. The workflow opens a PR into `main`.
11. `Vercel Deployment` creates a preview deployment for the PR and comments with the URL.
12. `Codex PR Review Pack` posts the reviewer summary and security notes.
13. A human manually approves the PR.
14. `PR Approval Jira Update` comments on the Jira issue and attempts to move it to `Approved`.
15. A human manually merges into `main`.
16. `Vercel Deployment` creates a production deployment from `main`.
17. `Vercel Deployment` comments the production deployment URL on the Jira issue.
18. `Merge And Close Jira` transitions Jira to `Done`.

## Required GitHub Secrets

- `OPENAI_API_KEY`
- `JIRA_BASE_URL`
- `JIRA_EMAIL`
- `JIRA_API_TOKEN`
- `JIRA_PROJECT_KEY`

## Optional Jenkins Secrets

- `JENKINS_URL`
- `JENKINS_USER`
- `JENKINS_API_TOKEN`
- `JENKINS_JOB_NAME`
- `JENKINS_JOB_TOKEN`

## Optional Vercel Deployment Secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

`Vercel Deployment` runs on PRs into `main` for preview deployments and on pushes to `main` for production deployments.

## Manual Merge Guard

No workflow merges PRs. The PR review workflow posts evidence only. Jira moves to `Done` only after GitHub emits a merged PR event.

## Bootstrap Checklist

Strict UI rule: use only the Chrome profile named `theaicompany.org`, logged in as `anjiten@theaiaicompany.org`, for Jira, GitHub, ChatGPT/Codex, and Vercel demo UI work.

1. Create or fork the Juice Shop demo repository in the customer/demo GitHub org.
2. Push this pipeline scaffold to the repository.
3. Ensure the repository has a `main` branch.
4. Set `main` as the repository default branch. This is required for the golden pipeline; `develop` must not remain the demo default.
5. Add the required GitHub Actions secrets.
6. Add optional Jenkins secrets if the demo should call a live Jenkins job.
7. Configure Jira/Rovo automation to call `Jira To Codex PR`. `AIDLC Request To Jira` only creates the Jira ticket; Jira Automation must be the single handoff into GitHub Actions.
   - Jira Automation trigger: work item created in `AIDLC`.
   - Jira Automation action: send web request to `https://api.github.com/repos/anchitn-hub/juice-shop-aidlc-demo/actions/workflows/jira-to-codex-pr.yml/dispatches`.
   - Required GitHub token scope for that web request: fine-grained token limited to `anchitn-hub/juice-shop-aidlc-demo` with `Actions: Read and write` and required `Metadata: Read-only`.
8. Confirm branch protection requires manual review before merge.

## Local GitHub CLI Isolation

When using `gh` locally for this demo, run it with a repo-local config directory:

```bash
export GH_CONFIG_DIR="$PWD/.codex-gh-aicompany"
```

Do not run `gh auth setup-git` or `git config --global` for this demo.

Useful local commands:

```bash
export GH_CONFIG_DIR="$PWD/.codex-gh-aicompany"
gh auth status
gh repo view
```
