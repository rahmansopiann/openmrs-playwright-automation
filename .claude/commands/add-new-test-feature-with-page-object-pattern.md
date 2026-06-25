---
name: add-new-test-feature-with-page-object-pattern
description: Workflow command scaffold for add-new-test-feature-with-page-object-pattern in openmrs-playwright-automation.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-test-feature-with-page-object-pattern

Use this workflow when working on **add-new-test-feature-with-page-object-pattern** in `openmrs-playwright-automation`.

## Goal

Add a new feature test suite using Playwright, including new page objects, locators, and test specs.

## Common Files

- `locators/*.locator.ts`
- `pages/*.ts`
- `tests/*.spec.ts`
- `README.md`
- `playwright.config.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update locators in locators/*.locator.ts for new UI elements.
- Create or update page objects in pages/*.ts to encapsulate feature logic.
- Write new test specs in tests/*.spec.ts for the feature.
- Update configuration or documentation as needed (e.g., README.md, playwright.config.ts).

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.