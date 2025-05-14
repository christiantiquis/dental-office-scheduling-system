export const DentalServices = [
  { name: "RegularCheckup", value: 1, text: "Regular Check-up" },
  { name: "TeethCleaning", value: 2, text: "Teeth Cleaning" },
  { name: "TeethWhitening", value: 3, text: "Teeth Whitening" },
  { name: "Filling", value: 4, text: "Filling" },
  { name: "RootCanal", value: 5, text: "Root Canal" },
  { name: "Extraction", value: 6, text: "Extraction" },
  { name: "Consultation", value: 7, text: "Consultation" },
  { name: "Others", value: 8, text: "Others" },
];

export type DentalServicesType = (typeof DentalServices)[number]["value"];
