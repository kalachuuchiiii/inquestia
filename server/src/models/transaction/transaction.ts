import { AMOUNT_ENUM, AMOUNT_MSG, INVALID_PHONE_NUMBER_MSG, PHONE_NUMBER_MAX, PHONE_NUMBER_MIN, PHONE_NUMBER_MSG, STATUS_ENUM } from "@shared/constants";
import { isValidPHNum } from "@shared/utils";
import mongoose from "mongoose";


// note that the transaction is done manually, not automated. this feature is only for our respondents

const transactionSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  photoProof: { //an evidence of the admin
    type: String, 
    default: null,
  }, 
  amount: { 
    type: Number,
    enum: AMOUNT_ENUM, 
    validate: {
      validator: (a: number) => AMOUNT_ENUM.includes(a),
      message: AMOUNT_MSG.invalid
     },
    required: true, 
    default: 0
  }, 
  status: { 
    type: String, 
    enum: STATUS_ENUM, 
    default: 'pending' 
  },
  phoneNumber: {
  type: String,
  required: true,
  min: [PHONE_NUMBER_MIN, PHONE_NUMBER_MSG.max],
  max: [PHONE_NUMBER_MAX, PHONE_NUMBER_MSG.max],
  validate: {
    validator: isValidPHNum,
    message: PHONE_NUMBER_MSG.invalid
  }
}

})

const Transaction = mongoose.model('Transaction', transactionSchema)


export default Transaction;