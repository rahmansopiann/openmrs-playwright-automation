import { Page, expect } from "@playwright/test";
import { PatientLocators } from "../locators/patient.locator";
import { FormLocators } from "../locators/form.locator";

export class FormPage {
  constructor(public page: Page) {}

  async validateRequiredFields() {
    await this.page.goto(
      "openmrs/registrationapp/registerPatient.page?appId=referenceapplication.registrationapp.registerPatient"
    );
    await this.page.waitForLoadState("networkidle");

    // Click next without filling anything
    await this.page.click(PatientLocators.nextButton);

    // Expect error messages to appear
    const errorCount = await this.page.locator(FormLocators.fieldError).count();
    expect(errorCount).toBeGreaterThan(0);
  }

  async validateInvalidInput() {
    await this.page.goto(
      "openmrs/registrationapp/registerPatient.page?appId=referenceapplication.registrationapp.registerPatient"
    );
    await this.page.waitForLoadState("networkidle");

    await this.page.fill(PatientLocators.givenNameInput, "Test");
    await this.page.fill(PatientLocators.familyNameInput, "User");
    await this.page.click(PatientLocators.nextButton);

    await this.page.selectOption(PatientLocators.genderSelect, "M");
    await this.page.click(PatientLocators.nextButton);

    // Enter letters in numeric date field
    await this.page.fill(PatientLocators.birthdateDayInput, "abc");
    await this.page.selectOption(PatientLocators.birthdateMonthSelect, "1");
    await this.page.fill(PatientLocators.birthdateYearInput, "xyz");
    await this.page.click(PatientLocators.nextButton);

    // Expect error messages on date fields
    const errorCount = await this.page.locator(FormLocators.fieldError).count();
    expect(errorCount).toBeGreaterThan(0);
  }
}
