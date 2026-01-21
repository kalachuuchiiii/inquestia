import {
  AMOUNT_ENUM,
  AMOUNT_MSG,
  PHONE_NUMBER_MAX,
  PHONE_NUMBER_MIN,
  PHONE_NUMBER_MSG,
  STATUS_ENUM,
  STATUS_MSG,
} from "@shared/constants";
import { ITransaction } from "@shared/types";
import { isValidPHNum } from "@shared/utils";
import mongoose, { Document, HydratedDocument, InferSchemaType } from "mongoose";

// note that the transaction is done manually, not automated. this feature is available only to our respondents
const transactionSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  photoProof: {
    //an evidence of the admin
    type: String,
    default: null,
  },
  amount: {
    type: Number,
    enum: AMOUNT_ENUM,
    validate: {
      validator: (a: number) => AMOUNT_ENUM.includes(a),
      message: AMOUNT_MSG.invalid,
    },
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: {
      values: STATUS_ENUM,
      message: STATUS_MSG.enum,
    },
    default: "pending",
  },
  phoneNumber: {
    type: String,
    required: true,
    min: [PHONE_NUMBER_MIN, PHONE_NUMBER_MSG.max],
    max: [PHONE_NUMBER_MAX, PHONE_NUMBER_MSG.max],
    validate: {
      validator: isValidPHNum,
      message: PHONE_NUMBER_MSG.invalid,
    },
  },
});

export type TransactionSchema = InferSchemaType<typeof transactionSchema>;
export type TransactionModel = HydratedDocument<TransactionSchema>;


const Transaction = mongoose.model<TransactionModel>("Transaction", transactionSchema);

export default Transaction;
