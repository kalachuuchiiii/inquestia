import { isValidEmail } from "@inquestia/utils";
import mongoose, {
  HydratedDocument,
  InferSchemaType,
  Types,
  type Model,
} from "mongoose";
import bcrypt from "bcryptjs";
import { ROLE_ENUM } from "@inquestia/constants";

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
      message: `Invalid Credentials`,
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

const Credential = mongoose.model("Credential", credentialSchema);

export default Credential;
