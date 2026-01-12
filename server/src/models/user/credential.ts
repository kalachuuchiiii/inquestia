
import { isValidEmail } from "@shared/utils";
import mongoose, { Document, Types } from "mongoose";
import bcrypt from 'bcryptjs';
import { IMPLICIT_EMAIL_MSG, ROLE_ENUM } from "@shared/constants";
import { ICredential } from "@shared/types";

const credentialSchema = new mongoose.Schema<ICredential & Document>({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

credentialSchema.methods.comparePasswords = async function(candidatePass: string){
  return await bcrypt.compare(candidatePass, this.password);
}

const Credential = mongoose.model('Credential', credentialSchema);