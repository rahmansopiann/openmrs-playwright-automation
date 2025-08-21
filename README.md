# OpenMRS Playwright Automation

## Summary

This project is a test automation framework for the OpenMRS application, built using Playwright and TypeScript. It provides end-to-end tests to ensure the quality and reliability of the application. The framework uses the Page Object Model (POM) design pattern for better test maintenance and readability. It also includes Allure for comprehensive test reporting.

## Project Structure

```
.
├── .github/                # GitHub Actions workflows
│   └── workflows/
│       └── playwright.yml  # CI pipeline for running tests
├── locators/               # Contains element locators for pages
│   └── login.locator.ts
├── pages/                  # Page Object Model files
│   └── loginPage.ts
├── tests/                  # Test scripts
│   └── auth.spec.ts
├── allure-report/          # Generated Allure report
├── allure-results/         # Raw Allure results
├── env.dev.ts              # Environment configuration for Development
├── env.staging.ts          # Environment configuration for Staging
├── envLoader.ts            # Helper to load environment configurations
├── package.json            # Project dependencies and scripts
├── playwright.config.ts    # Playwright configuration file
└── README.md               # This file
```

## Test Scenarios

The scope of testing for this project includes the following modules and scenarios:

### Authentication Module
- Test login with valid credentials
- Test login with invalid credentials (negative case)
- Test login with empty input

### Patient Management
- Test create new patient
- Test search patient
- Test update patient details
- Test delete patient

### Appointment Scheduling
- Test create appointment
- Test update appointment
- Test cancel appointment

### Form Validation
- Test required field validation
- Test invalid input (date, numeric field)
- Test successful form submission

## How to Run

### 1. Prerequisites

-   Node.js installed
-   npm or yarn

### 2. Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/rahmansopiann/openmrs-playwright-automation.git
cd openmrs-playwright-automation
npm install
```

### 3. Running Tests

You can run the tests against different environments.

-   Run tests on the **development** environment:
    ```bash
    npm test
    ```

-   Run tests on the **staging** environment:
    ```bash
    npm run test:staging
    ```

### 4. Viewing Reports

This project uses Allure to generate test reports.

-   Generate the Allure report:
    ```bash
    npm run allure:generate
    ```

-   Open the generated report in your browser:
    ```bash
    npm run allure:open
    ```

## Sample Report

Test reports are generated using Allure. The report provides a detailed overview of the test execution, including passed/failed tests, execution time, and steps for each test. You can find the generated report in the `allure-report` directory after running the generation command.

## Author

-   Rahman Sopian
