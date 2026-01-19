import { CredentialDTO } from "@shared/types";
import { JwtPayload } from "jsonwebtoken";
import { HydratedDocument, Types } from "mongoose";

export type CredentialMethods = {
  comparePasswords: (candidatePassword: string) => boolean;
};

export type CredentialSchema = Omit<CredentialDTO, 'userId' | '_id'> & {
 userId: Types.ObjectId;
 _id: Types.ObjectId;
}

export type CredentialModel = HydratedDocument<
  CredentialFields,
  CredentialMethods
>;

export interface SessionTokenPayload extends JwtPayload {
  userId: string;
}