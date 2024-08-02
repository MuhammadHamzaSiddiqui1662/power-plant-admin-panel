import { Dayjs } from "dayjs";
import { Gender, MaritalStatus, RoleType } from "../enums";

export interface User {
  imageSrc: string;
  name: string;
  gender: Gender;
  dateOfBirth: Dayjs;
  maritalStatus: MaritalStatus;
  isAlive: true;
  email: string;
  phoneNumber: string;
  password: string;
  currentAddress: string;
  permanentAddress: string;
  city: string;
  state: string;
  postalCode: string;
  cnicNumber: string;
  cnicExpiry: Dayjs;
  cnicFather: string;
  cnicHusband: string;
  organizationCode: RoleType;
  workEmail: string;
  workPassword: string;
  jwt: JWT;
}

export interface JWT {
  jwtToken: string;
  refreshToken: string;
  expireTime: string;
}
