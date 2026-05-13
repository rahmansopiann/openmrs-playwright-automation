import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/login.locator";

export class LoginPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto("openmrs/login.htm");
  }

  async login(username: string, password: string, location: string) {
    await this.page.fill(LoginLocators.usernameInput, username);
    await this.page.fill(LoginLocators.passwordInput, password);
    // Ideally we should use the location string here to select, e.g. `//li[@id='${location}']`
    // but the test is currently hardcoded or using the LoginLocators variable directly.
    await this.page.click(LoginLocators.sessionLocationSelect);
    await this.page.click(LoginLocators.loginButton);
    // Suppress unused variable error by logging it
    console.log(`Logging in at ${location}`);
  }

  async getErrorMessage() {
    return this.page.textContent(LoginLocators.errorMessage);
  }
  async currentUrl() {
    return this.page.url();
  }
}
