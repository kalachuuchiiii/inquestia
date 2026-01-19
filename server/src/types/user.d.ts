import { ROLE_ENUM } from "@shared/constants";
import { UserDTO } from "@shared/types";
import { HydratedDocument, Types } from "mongoose";


export type UserFields = Omit<UserDTO, '_id'> & {
    _id: Types.ObjectId
    lastUsernameUpdate: Date;
    password?: string;
    email?: string;
    role?: typeof ROLE_ENUM[number]
}
export interface UserMethods {
     banDetails: {
        isBanned: boolean;
        remainingMS: number
      };
}

export type UserDoc = HydratedDocument<UserFields, UserMethods>;