import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { loadConfig } from "../envLoader";

const ENV = (process.env.ENV as "dev" | "staging") || "dev";
const config = loadConfig(ENV);

test.describe("Authentication", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("OMRS-1 Login with valid credentials @positive @smoke @login", async () => {
    await loginPage.login(
      config.credentials.username,
      config.credentials.password,
      config.credentials.location
    );
    await expect(loginPage.page).toHaveURL(/home.page/);
  });

  test("OMRS-2 Login with invalid credentials @negative @login", async () => {
    await loginPage.login("wrong", "wrong", config.credentials.location);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid username/password. Please try again.");
  });

  test("OMRS-3 Login with empty credentials @negative @login", async () => {
    await loginPage.login("", "", config.credentials.location);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid username/password. Please try again.");
  });

  test("OMRS-4 Login with invalid username @negative @login", async () => {
    await loginPage.login("Testing", config.credentials.password, config.credentials.location);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid username/password. Please try again.");
  });

  test("OMRS-5 Login with invalid password @negative @login", async () => {
    await loginPage.login(config.credentials.username, "Test123", config.credentials.location);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid username/password. Please try again.");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
