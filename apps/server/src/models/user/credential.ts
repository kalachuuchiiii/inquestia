import { isValidEmail } from "@inquestia/utils";
import mongoose, { HydratedDocument, InferSchemaType, Types, type Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IMPLICIT_EMAIL_MSG, ROLE_ENUM } from "@inquestia/constants";
import { ENV_CONFIG } from "@/config/env";


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
  return await bcrypt.compare(candidatePass, this.password);
};

export type CredentialSchema = InferSchemaType<typeof credentialSchema>;
export type CredentialMethods = {
  comparePasswords: (candidatePass: string) => Promise<boolean>
}
export type CredentialModel = Model<HydratedDocument<CredentialSchema, CredentialMethods>>;

const Credential = mongoose.model<CredentialSchema, CredentialModel>(
  "Credential",
  credentialSchema
);

export default Credential;
