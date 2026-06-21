# AIDLC Juice Shop Demo Runbook

## Goal

Show an AI-assisted delivery lifecycle where Codex turns a request into a Jira story, accepts it, implements against Juice Shop, runs security review and CI gates, opens a PR, and waits for human merge approval.

## Demo Flow

1. Start from Codex with a change request.
2. Dispatch `AIDLC Request To Jira`.
3. The workflow creates a Jira Story and transitions it to `In Progress`.
4. The workflow dispatches `Jira To Codex PR`.
5. Codex implements the story in a `codex/<JIRA_KEY>` branch.
6. The workflow rejects docs-only changes when a code change is required.
7. `npm run lint` and `npm test` run.
8. Codex runs pre-PR security review and writes `docs/<JIRA_KEY>/security-pre-pr.md`.
9. Jenkins demo gate runs. If Jenkins credentials are absent, it writes a simulated evidence artifact.
10. The workflow opens a PR into `develop`.
11. `Codex PR Review Pack` posts the reviewer summary and security notes.
12. A human manually approves and merges.
13. `Merge And Close Jira` transitions Jira to `Done`.

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

## Manual Merge Guard

No workflow merges PRs. The PR review workflow posts evidence only. Jira moves to `Done` only after GitHub emits a merged PR event.

## Bootstrap Checklist

1. Create or fork the Juice Shop demo repository in the customer/demo GitHub org.
2. Push this pipeline scaffold to the repository.
3. Ensure the repository has a `develop` branch.
4. Prefer setting `develop` as the demo repository default branch so `workflow_dispatch` actions are visible from the same branch that PRs target.
5. Add the required GitHub Actions secrets.
6. Add optional Jenkins secrets if the demo should call a live Jenkins job.
7. Configure Jira/Rovo automation to call `Jira To Codex PR`, or use `AIDLC Request To Jira` when Codex should create the Jira ticket first.
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
