export interface IAppointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: Date;
  time: string;
  service: string;
  status: "completed" | "cancelled" | "confirmed";
  notes?: string;
}
