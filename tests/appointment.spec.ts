import { test } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { AppointmentPage } from "../pages/appointmentPage";
import { loadConfig } from "../envLoader";

const ENV = (process.env.ENV as "dev" | "staging") || "dev";
const config = loadConfig(ENV);

test.describe("Appointment Scheduling", () => {
  let loginPage: LoginPage;
  let appointmentPage: AppointmentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    appointmentPage = new AppointmentPage(page);

    await loginPage.goto();
    await loginPage.login(
      config.credentials.username,
      config.credentials.password,
      config.credentials.location
    );
    await page.waitForLoadState("networkidle");
  });

  test("Test time-slot conflict (overbooking) @negative @appointment", async () => {
    // Attempt to book an appointment with a known conflicting time
    await appointmentPage.checkTimeSlotConflict(
      "100JPV",
      "General Consultation",
      "Dr. Smith",
      "2025-10-10",
      "09:00",
      "10:00"
    );
  });

  test("Test provider availability @negative @appointment", async () => {
    // Attempt to select a provider who is currently on leave / unavailable
    await appointmentPage.checkProviderAvailability(
      "100JPV",
      "General Consultation",
      "Dr. OnLeave"
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
