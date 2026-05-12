import { Page } from "@playwright/test";
import { PatientLocators } from "../locators/patient.locator";

export class PatientPage {
  constructor(public page: Page) {}

  async registerPatient(
    givenName: string,
    familyName: string,
    gender: string,
    day: string,
    month: string,
    year: string,
    address: string
  ) {
    await this.page.goto(
      "openmrs/registrationapp/registerPatient.page?appId=referenceapplication.registrationapp.registerPatient"
    );
    await this.page.waitForLoadState("networkidle");

    await this.page.waitForSelector(PatientLocators.givenNameInput, { state: "visible" });
    await this.page.fill(PatientLocators.givenNameInput, givenName);
    await this.page.fill(PatientLocators.familyNameInput, familyName);
    await this.page.click(PatientLocators.nextButton);

    await this.page.waitForSelector(PatientLocators.genderSelect, { state: "visible" });
    await this.page.selectOption(PatientLocators.genderSelect, gender);
    await this.page.click(PatientLocators.nextButton);

    await this.page.waitForSelector(PatientLocators.birthdateDayInput, { state: "visible" });
    await this.page.fill(PatientLocators.birthdateDayInput, day);
    await this.page.selectOption(PatientLocators.birthdateMonthSelect, month);
    await this.page.fill(PatientLocators.birthdateYearInput, year);
    await this.page.click(PatientLocators.nextButton);

    await this.page.fill(PatientLocators.address1Input, address);
    await this.page.click(PatientLocators.nextButton); // to phone
    await this.page.click(PatientLocators.nextButton); // to relatives
    await this.page.click(PatientLocators.nextButton); // to confirm

    await this.page.click("input#submit");
    await this.page.waitForURL(/patientId=/, { timeout: 10000 });
  }

  async searchPatient(patientIdOrName: string) {
    await this.page.goto("openmrs/coreapps/findpatient/findPatient.page?app=coreapps.findPatient");
    await this.page.waitForLoadState("networkidle");

    await this.page.fill(PatientLocators.patientSearchInput, patientIdOrName);
    await this.page.waitForTimeout(2000); // wait for search results
    await this.page.click(PatientLocators.patientSearchResultsTableFirstRow);
    await this.page.waitForLoadState("networkidle");
  }

  async updatePatient(newGivenName: string) {
    // Assuming we are already on the patient dashboard
    await this.page.click(PatientLocators.editDemographicsLink);
    await this.page.waitForLoadState("networkidle");

    await this.page.fill(PatientLocators.givenNameInput, newGivenName);
    await this.page.click(PatientLocators.nextButton); // to gender
    await this.page.click(PatientLocators.nextButton); // to birthdate
    await this.page.click(PatientLocators.nextButton); // to confirm

    await this.page.click("#registration-submit");
    await this.page.waitForLoadState("networkidle");
  }

  async deletePatient(reason: string) {
    // Assuming we are already on the patient dashboard
    await this.page.click(PatientLocators.deletePatientLink);
    await this.page.waitForSelector(PatientLocators.deleteReasonInput);

    await this.page.fill(PatientLocators.deleteReasonInput, reason);
    await this.page.click(PatientLocators.confirmDeleteButton);
    await this.page.waitForLoadState("networkidle");
  }
}
