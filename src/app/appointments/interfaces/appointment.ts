export interface AppointmentInsert {
  date?: string;
  physio?: string;
  diagnosis?: string;
  treatment?: string;
  observations?: string;
  patient?: string;
  status?: string;
}
export interface Appointment extends AppointmentInsert {
  _id: string;
}
