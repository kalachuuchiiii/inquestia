import { EntityHelper } from "@/helper";
import Answer, { AnswerModel } from "@/models/answer/answer";

import {
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors/customErrorClass";
import { SurveyDTO, UserDTO } from "@shared/types";
import { SortOrder, Types } from "mongoose";

const entityHelper = new EntityHelper<AnswerModel>(Answer);

export class AnswerService {
 
}
