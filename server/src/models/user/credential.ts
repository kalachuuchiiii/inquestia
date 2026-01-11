
import { isValidEmail } from "@shared/utils";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { IMPLICIT_EMAIL_MSG, ROLE_ENUM } from "@shared/constants";

const credentialSchema = new mongoose.Schema({
    role: {
      type: String,
      default: 'user',
      enum: ROLE_ENUM,
      required: true
    },
    email: {
        required: true,
        unique: true,
        type: String,
        validate: {
            validator: isValidEmail,
            message: IMPLICIT_EMAIL_MSG.invalid
        }
    },
    password: {
        required: true,    
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

credentialSchema.methods.comparePasswords = async function(candidatePass: string){
  return await bcrypt.compare(candidatePass, this.password);
}

const Credential = mongoose.model('Credential', credentialSchema);