import { Patient } from "./patient";

export interface SinglePatientResponse {
  resultado: Patient;
}

export interface PatientsResponse {
  resultado: Patient[];
}