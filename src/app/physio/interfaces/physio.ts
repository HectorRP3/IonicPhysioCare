export interface PhsyioInsert {
  avatar?: String;
  email: String;
  licenseNumber: String;
  name: String;
  specialty: String;
  surname?: String;
  userID?: String;
  password?: String;
  starts?: number;
}
export interface Physio extends PhsyioInsert {
  _id: String;
}
