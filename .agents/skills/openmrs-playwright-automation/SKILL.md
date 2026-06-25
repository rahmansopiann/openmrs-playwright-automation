```markdown
# openmrs-playwright-automation Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill introduces the core development patterns, coding conventions, and workflows used in the `openmrs-playwright-automation` repository. The project is a TypeScript-based automation suite for OpenMRS, leveraging Playwright for end-to-end testing. It follows a modular structure with page objects, locators, and test specs, and uses GitHub Actions for CI/CD integration.

## Coding Conventions

- **File Naming:**  
  Use camelCase for file names.  
  _Example:_  
  ```
  patientManagementPage.ts
  loginForm.locator.ts
  ```

- **Import Style:**  
  Use relative imports for modules within the project.  
  _Example:_  
  ```typescript
  import { PatientPage } from '../pages/patientPage';
  import { loginButton } from '../locators/loginForm.locator';
  ```

- **Export Style:**  
  Both named and default exports are used as appropriate.  
  _Example:_  
  ```typescript
  // Named export
  export function validatePatient() { ... }

  // Default export
  export default class PatientPage { ... }
  ```

- **Commit Messages:**  
  Freeform, usually concise (~34 characters), with or without prefixes.

## Workflows

### Playwright Workflow Iteration
**Trigger:** When updating, fixing, or enhancing the Playwright GitHub Actions workflow (e.g., Allure integration, notifications, deployment).  
**Command:** `/update-playwright-workflow`

1. Edit `.github/workflows/playwright.yml` to add, remove, or modify workflow steps.
2. If needed, update related config files such as `package.json` or `playwright.config.ts`.
3. Commit and push your changes, using small, incremental commits.

_Example:_  
```yaml
# .github/workflows/playwright.yml
- name: Deploy Allure Report
  run: npx allure generate ...
```

### Add New Test Feature with Page Object Pattern
**Trigger:** When adding automated tests for a new feature or scenario.  
**Command:** `/add-test-feature`

1. Create or update locators in `locators/*.locator.ts` for new UI elements.
2. Create or update page objects in `pages/*.ts` to encapsulate feature logic.
3. Write new test specs in `tests/*.spec.ts` for the feature.
4. Update configuration or documentation as needed (e.g., `README.md`, `playwright.config.ts`).

_Example:_  
```typescript
// locators/patientForm.locator.ts
export const patientNameInput = '#patient-name';

// pages/patientFormPage.ts
import { patientNameInput } from '../locators/patientForm.locator';
export class PatientFormPage {
  async enterName(name: string) {
    await this.page.fill(patientNameInput, name);
  }
}

// tests/patientForm.spec.ts
import { test, expect } from '@playwright/test';
import { PatientFormPage } from '../pages/patientFormPage';

test('should create a new patient', async ({ page }) => {
  const form = new PatientFormPage(page);
  await form.enterName('John Doe');
  // ... assertions ...
});
```

### Refactor Page Object and Tests
**Trigger:** When reorganizing or moving logic between page objects and updating corresponding tests.  
**Command:** `/refactor-page-object`

1. Move or refactor logic between `pages/*.ts` files.
2. Update locators in `locators/*.locator.ts` if necessary.
3. Update or refactor tests in `tests/*.spec.ts` to match the new structure.

_Example:_  
```typescript
// Move validation logic from FormPage to PatientPage
// pages/patientPage.ts
export class PatientPage {
  validatePatientDetails() { ... }
}

// tests/patient.spec.ts
import { PatientPage } from '../pages/patientPage';
test('validate patient details', async ({ page }) => {
  const patientPage = new PatientPage(page);
  await patientPage.validatePatientDetails();
});
```

## Testing Patterns

- **Test Files:**  
  Located in `tests/`, named with `.spec.ts` or `.test.ts` suffix.

- **Structure:**  
  Tests use Playwright's test runner (or compatible), with clear separation between test specs, page objects, and locators.

- **Example Test:**  
  ```typescript
  import { test, expect } from '@playwright/test';
  import { LoginPage } from '../pages/loginPage';

  test('user can log in', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('user', 'pass');
    expect(await login.isLoggedIn()).toBe(true);
  });
  ```

## Commands

| Command                     | Purpose                                                      |
|-----------------------------|--------------------------------------------------------------|
| /update-playwright-workflow | Update or enhance the Playwright CI workflow                 |
| /add-test-feature           | Add a new feature test suite with page objects and locators  |
| /refactor-page-object       | Refactor logic between page objects and update corresponding tests |
```