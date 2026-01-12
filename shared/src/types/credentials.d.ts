import { Types } from "mongoose";
import { ROLE_ENUM } from "@shared/constants";

export type Role = (typeof ROLE_ENUM)[number];

export interface ICredential {
  _id: Types.ObjectId;

  role: Role;

  email: string;
  password: string;

  userId: Types.ObjectId;   
}
