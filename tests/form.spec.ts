import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { FormPage } from "../pages/formPage";
import { PatientPage } from "../pages/patientPage";
import { loadConfig } from "../envLoader";

const ENV = (process.env.ENV as "dev" | "staging") || "dev";
const config = loadConfig(ENV);

test.describe("Form Validation", () => {
  let loginPage: LoginPage;
  let formPage: FormPage;
  let patientPage: PatientPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    formPage = new FormPage(page);
    patientPage = new PatientPage(page);

    await loginPage.goto();
    await loginPage.login(
      config.credentials.username,
      config.credentials.password,
      config.credentials.location
    );
    await page.waitForLoadState("networkidle");
  });

  test("Test required field validation @form", async () => {
    await formPage.validateRequiredFields();
  });

  test("Test invalid input (date, numeric field) @form", async () => {
    await formPage.validateInvalidInput();
  });

  test("Test successful form submission @form", async ({ page }) => {
    const uniqueName = "ValidUser" + Date.now();
    await patientPage.registerPatient(
      uniqueName,
      "Automated",
      "F",
      "05",
      "3",
      "2000",
      "Valid Address"
    );
    await expect(page).toHaveURL(/patientId=/);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
