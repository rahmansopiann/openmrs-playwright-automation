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

  test("Login with valid credentials", async () => {
    await loginPage.login(config.credentials.username, config.credentials.password);
    await expect(loginPage.page).toHaveURL(/home/);
  });

  test("Invalid login @negative", async () => {
    await loginPage.login("wrong", "wrong");
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid username or password");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
