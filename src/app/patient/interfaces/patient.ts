import { A } from "ol/renderer/webgl/FlowLayer";
import { Appointment } from "src/app/appointments/interfaces/appointment";

export interface PatientInsert {
  avatar?: string;
  name?: string;
  surname?: string;
  birthDate?: string;
  address?: string;
  insuranceNumber?: string;
  email?: string;
  userID?: string;
  password?: string;
  lat?: number;
  lng?: number;
}

export interface Patient extends PatientInsert {
  _id: string;
}

export interface Record {
  _id: string;
  patient: Patient;
  medicalRecord: string;
  appointments: Appointment[];
}

export interface RecordResponse {
  resultado: Record;
}
