import { ANSWER_MAX, ANSWER_MIN, ANSWER_MSG } from "../constants";
import z from "zod";
export const TextAnswerSchema = z.string().min(ANSWER_MIN, ANSWER_MSG.min).max(ANSWER_MAX, ANSWER_MSG.max);