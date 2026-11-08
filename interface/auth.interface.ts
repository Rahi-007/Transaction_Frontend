import { IUser } from "./user.interface";

export interface ILoginPayload {
  phone: string;
  pin: string;
}

export interface ILoginRes {
  accessToken: string;
  user: IUser;
}