export const AppointmentLocators = {
  // Navigation
  appointmentsMenuLink: "a[href*='appointmentschedulingui']",
  manageAppointmentsLink: "a[href*='manageAppointments.page']",

  // Appointment Form
  patientSearchInput: "#patient-search",
  patientSearchResultsTableFirstRow: "table#patient-search-results-table tbody tr:nth-child(1)",
  serviceTypeSelect: "#service-type",
  providerSelect: "#provider",
  dateInput: "#appointment-date",
  startTimeInput: "#start-time",
  endTimeInput: "#end-time",
  saveAppointmentButton: "#save-button",

  // Conflict / Warning
  conflictWarningModal: "#appointment-conflict-modal",
  conflictWarningText: ".conflict-message",

  // Provider Availability
  providerStatusLabel: ".provider-status",
  providerUnavailableMessage: ".unavailable-message",
};
