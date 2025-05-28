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
