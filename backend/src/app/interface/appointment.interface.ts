export enum Services {
  RegularCheckup = 1,
  Cleaning,
  Whitening,
  Filling,
  RootCanal,
  Extraction,
  Consultation,
  Others,
}

export interface IAppointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: Date;
  time: string;
  service: Services;
  notes?: string;
}
