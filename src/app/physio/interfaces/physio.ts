export interface PhsyioInsert {
  avatar?: String;
  email: String;
  licenseNumber: String;
  name: String;
  specialty: String;
  surname: String;
  userID: String;
}
export interface Phsyio extends PhsyioInsert {
  _id: String;
}
