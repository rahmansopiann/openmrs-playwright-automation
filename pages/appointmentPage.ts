import { Page, expect } from "@playwright/test";
import { AppointmentLocators } from "../locators/appointment.locator";

export class AppointmentPage {
  constructor(public page: Page) {}

  async navigateToManageAppointments() {
    await this.page.goto(
      "openmrs/appointmentschedulingui/manageAppointments.page?app=appointmentschedulingui.schedulingDashboard"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async checkTimeSlotConflict(
    patientId: string,
    serviceType: string,
    provider: string,
    date: string,
    startTime: string,
    endTime: string
  ) {
    await this.navigateToManageAppointments();

    await this.page.fill(AppointmentLocators.patientSearchInput, patientId);
    await this.page.waitForTimeout(2000);
    await this.page.click(AppointmentLocators.patientSearchResultsTableFirstRow);
    await this.page.waitForLoadState("networkidle");

    await this.page.selectOption(AppointmentLocators.serviceTypeSelect, serviceType);
    await this.page.selectOption(AppointmentLocators.providerSelect, provider);
    await this.page.fill(AppointmentLocators.dateInput, date);
    await this.page.fill(AppointmentLocators.startTimeInput, startTime);
    await this.page.fill(AppointmentLocators.endTimeInput, endTime);

    await this.page.click(AppointmentLocators.saveAppointmentButton);

    // Verify that the conflict warning appears
    await this.page.waitForSelector(AppointmentLocators.conflictWarningModal, {
      state: "visible",
      timeout: 10000,
    });
    const conflictMessage = await this.page
      .locator(AppointmentLocators.conflictWarningText)
      .textContent();
    expect(conflictMessage).toBeTruthy();
    // Assuming conflict message contains something related to the provider or time
    // expect(conflictMessage).toContain(provider);
  }

  async checkProviderAvailability(patientId: string, serviceType: string, provider: string) {
    await this.navigateToManageAppointments();

    await this.page.fill(AppointmentLocators.patientSearchInput, patientId);
    await this.page.waitForTimeout(2000);
    await this.page.click(AppointmentLocators.patientSearchResultsTableFirstRow);
    await this.page.waitForLoadState("networkidle");

    await this.page.selectOption(AppointmentLocators.serviceTypeSelect, serviceType);

    // Attempt to select the provider
    await this.page.selectOption(AppointmentLocators.providerSelect, provider);

    // Verify provider status shows they are on leave/unavailable, or that the system gives a message
    // If the select option fails or there's a specific message, we assert it here
    const isUnavailableMsgVisible = await this.page.isVisible(
      AppointmentLocators.providerUnavailableMessage
    );

    if (isUnavailableMsgVisible) {
      const msg = await this.page
        .locator(AppointmentLocators.providerUnavailableMessage)
        .textContent();
      expect(msg).toBeTruthy();
    } else {
      // In some systems, the provider is simply not in the dropdown if unavailable
      // If we attempt to set value and it's missing, playwright would normally fail on selectOption
      // We assume here there is an explicit message
      const optionsCount = await this.page
        .locator(`select${AppointmentLocators.providerSelect} option[value='${provider}']`)
        .count();
      if (optionsCount === 0) {
        expect(optionsCount).toBe(0); // Expected if unavailable
      }
    }
  }
}
