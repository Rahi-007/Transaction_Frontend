import { Gender } from "@/config/enum";

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  // avatar?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAddUser {
  firstName: string;
  lastName?: string;
  phone: string;
  // avatar?: string;
  pin: string;
  dateOfBirth?: Date;
  gender?: Gender;
}

export interface IUpdateUser {
  firstName: string;
  lastName?: string;
  phone: string;
  // avatar?: string;
  dateOfBirth?: Date;
  gender?: Gender;
}
