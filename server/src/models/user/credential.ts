import { isValidEmail } from "@shared/utils";
import mongoose, { HydratedDocument, InferSchemaType, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { IMPLICIT_EMAIL_MSG, ROLE_ENUM } from "@shared/constants";
import { ENV_CONFIG } from "@/config/environmentVars";


const credentialSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
    enum: ROLE_ENUM,
    required: true,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: isValidEmail,
      message: IMPLICIT_EMAIL_MSG.invalid,
    },
  },
  password: {
    required: true,
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

credentialSchema.methods.comparePasswords = async function (
  candidatePass: string
) {
  return await bcrypt.compare(candidatePass + ENV_CONFIG.PEPPER, this.password);
};

export type CredentialSchema = InferSchemaType<typeof credentialSchema>;
export type CredentialMethods = {
  comparePasswords: (candidatePass: string) => Promise<boolean>
}
export type CredentialModel = HydratedDocument<CredentialSchema, CredentialMethods>;

const Credential = mongoose.model<CredentialModel>(
  "Credential",
  credentialSchema
);

export default Credential;
