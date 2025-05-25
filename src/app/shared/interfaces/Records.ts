import { Appointment } from 'src/app/appointments/interfaces/appointment';

export interface Record2 {
  _id: string;
  patient: {
    _id: string;
  };
  medicalRecord: string;
  appointments: Appointment[];
}

export interface SingleRecordsResponse {
  resultado: Record2;
}
