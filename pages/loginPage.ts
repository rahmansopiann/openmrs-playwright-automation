import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/login.locator";

export class LoginPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto("openmrs/spa/login");
  }

  async login(username: string, password: string) {
    await this.page.fill(LoginLocators.usernameInput, username);
    await this.page.click(LoginLocators.continueButton);
    await this.page.fill(LoginLocators.passwordInput, password);
    await this.page.click(LoginLocators.loginButton);
  }

  async getErrorMessage() {
    return this.page.textContent(LoginLocators.errorMessage);
  }
  async currentUrl() {
    return this.page.url();
  }
}
