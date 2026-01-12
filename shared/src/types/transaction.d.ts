import { Types } from "mongoose";
import { AMOUNT_ENUM, STATUS_ENUM } from "@shared/constants";

export type TransactionAmount = (typeof AMOUNT_ENUM)[number];
export type TransactionStatus = (typeof STATUS_ENUM)[number];

export interface ITransaction {
  _id: Types.ObjectId;

  candidate: Types.ObjectId;  
  photoProof?: string | null;

  amount: TransactionAmount;
  status: TransactionStatus;

  phoneNumber: string;

  createdAt: Date;
  updatedAt: Date;
}
