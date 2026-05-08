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
    await this.page.click(LoginLocators.sessionLocationSelect);
    await this.page.click(LoginLocators.loginButton);
  }

  async getErrorMessage() {
    return this.page.textContent(LoginLocators.errorMessage);
  }
  async currentUrl() {
    return this.page.url();
  }
}
