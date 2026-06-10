export const PatientLocators = {
  givenNameInput: "input[name='givenName']",
  familyNameInput: "input[name='familyName']",
  genderSelect: "#gender-field",
  birthdateDayInput: "#birthdateDay-field",
  birthdateMonthSelect: "#birthdateMonth-field",
  birthdateYearInput: "#birthdateYear-field",
  address1Input: "#address1",
  nextButton: "#next-button",
  submitButton: "input#submit",
  patientSearchInput: "#patient-search",
  patientSearchResultsTableFirstRow: "table#patient-search-results-table tbody tr:nth-child(1)",
  editDemographicsLink: "a[href*='sectionId=demographics']",
  deletePatientLink: "a#org\\.openmrs\\.module\\.coreapps\\.deletePatient",
  deleteReasonInput: "#delete-reason",
  confirmDeleteButton: "div#delete-patient-creation-dialog button.confirm",
  fieldError: "span.field-error",
  dateRequiredField: "#demographics-birthdate",

  // Duplicate Check
  duplicateWarningModal: "#similarPatients",
  duplicateWarningText: ".similar-patient-name",

  // Merge Patient
  mergePatientLink: "a[href*='mergePatients.page']",
  patient1Input: "#patient1-text",
  patient2Input: "#patient2-text",
  continueMergeButton: "#confirm-button",
  firstPatientToKeep: "#keep-first",
  confirmMergeButton: "#confirm-merge-button",

  // Advanced Search
  advancedSearchButton: "#advanced-search-button",
  genderFilterSelect: "#gender-filter",
  ageFilterInput: "#age-filter",
  locationFilterSelect: "#location-filter",
  applyFilterButton: "#apply-filter-button",
};
