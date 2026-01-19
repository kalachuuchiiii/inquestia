import { isValidObjectId } from "mongoose";
import z from "zod";

export const ObjectIdSchema = z
  .string('Invalid Object ID')
  .refine(isValidObjectId, "Invalid Object ID");
