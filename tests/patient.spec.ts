import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { PatientPage } from "../pages/patientPage";
import { loadConfig } from "../envLoader";

const ENV = (process.env.ENV as "dev" | "staging") || "dev";
const config = loadConfig(ENV);

test.describe("Patient Management", () => {
  let loginPage: LoginPage;
  let patientPage: PatientPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    patientPage = new PatientPage(page);

    await loginPage.goto();
    await loginPage.login(
      config.credentials.username,
      config.credentials.password,
      config.credentials.location
    );
    await page.waitForLoadState("networkidle");
  });

  test("Test create new patient @positive @patient", async ({ page }) => {
    const uniqueName = "TestUser" + Date.now();
    await patientPage.registerPatient(
      uniqueName,
      "Automated",
      "M",
      "01",
      "1",
      "1990",
      "123 Main St"
    );

    // Check if we are redirected to patient dashboard which has patientId in URL
    await expect(page).toHaveURL(/patientId=/);
  });

  test("Test search patient @positive @patient", async ({ page }) => {
    // We assume 100JPV exists as discovered in exploratory scripts
    await patientPage.searchPatient("100JPV");
    await expect(page).toHaveURL(/patientId=/);
  });

  test("Test update patient details @positive @patient", async ({ page }) => {
    // First register a new patient to update
    const uniqueName = "UpdateUser" + Date.now();
    await patientPage.registerPatient(
      uniqueName,
      "Automated",
      "F",
      "15",
      "5",
      "1985",
      "456 Update St"
    );
    await expect(page).toHaveURL(/patientId=/);

    // Update the patient
    const newName = "Updated" + Date.now();
    await patientPage.updatePatient(newName);

    // Ensure we are back on patient dashboard
    await expect(page).toHaveURL(/patientId=/);

    // Optionally we could verify the new name is visible on the page
    const content = await page.content();
    expect(content).toContain(newName);
  });

  test("Test delete patient @positive @patient", async ({ page }) => {
    // First register a new patient to delete
    const uniqueName = "DeleteUser" + Date.now();
    await patientPage.registerPatient(
      uniqueName,
      "Automated",
      "M",
      "20",
      "10",
      "1975",
      "789 Delete St"
    );
    await expect(page).toHaveURL(/patientId=/);

    // Delete the patient
    await patientPage.deletePatient("Test deletion");

    // Wait for redirect to home or search page after deletion
    await page.waitForTimeout(3000);
    const currentUrl = await page.url();
    expect(currentUrl).not.toContain("patientId="); // We shouldn't be on the patient dashboard anymore
  });

  test("Test required field validation @negative @patient", async () => {
    await patientPage.validateRequiredFields();
  });

  test("Test invalid input (date, numeric field) @negative @patient", async () => {
    await patientPage.validateInvalidInput();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
