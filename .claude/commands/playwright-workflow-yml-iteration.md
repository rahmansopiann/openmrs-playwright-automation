---
name: playwright-workflow-yml-iteration
description: Workflow command scaffold for playwright-workflow-yml-iteration in openmrs-playwright-automation.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /playwright-workflow-yml-iteration

Use this workflow when working on **playwright-workflow-yml-iteration** in `openmrs-playwright-automation`.

## Goal

Iteratively develop and refine the Playwright CI workflow, often for Allure integration, notifications, or deployment.

## Common Files

- `.github/workflows/playwright.yml`
- `package.json`
- `playwright.config.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit .github/workflows/playwright.yml to add, remove, or modify steps (e.g., Allure deployment, notifications, environment variables).
- Optionally update related config files (e.g., package.json, playwright.config.ts) if needed for the workflow.
- Commit and push changes, often with small, incremental commits.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.