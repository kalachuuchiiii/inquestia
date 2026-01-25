import { z } from "zod";
import {
  TITLE_MIN,
  TITLE_MAX,
  TITLE_MSG,
  DESCRIPTION_MIN,
  DESCRIPTION_MAX,
  DESCRIPTION_MSG,
  TARGET_RESPONDENTS_MIN,
  TARGET_RESPONDENTS_MAX,
  TARGET_RESPONDENTS_MSG,
  TOTAL_RESPONDENTS_MAX,
  TOTAL_RESPONDENTS_MSG,
  TAGS_ENUM,
  TAGS_MIN,
  TAGS_MAX,
  TAGS_MSG,
  AUTHORIZED_VIEWERS_MAX,
  AUTHORIZED_VIEWERS_MSG,
  APPLIED_BOOSTER_MIN,
  APPLIED_BOOSTER_MAX,
} from "../constants";
import { QuestionsSchema } from "./question.schemas";

export const TagSchema = z.enum(TAGS_ENUM);

export const TitleSchema = z
  .string()
  .min(TITLE_MIN, TITLE_MSG.min)
  .max(TITLE_MAX, TITLE_MSG.max);

export const DescriptionSchema = z
  .string()
  .min(DESCRIPTION_MIN, DESCRIPTION_MSG.min)
  .max(DESCRIPTION_MAX, DESCRIPTION_MSG.max);

export const TargetRespondentsSchema = z
  .number()
  .int()
  .min(TARGET_RESPONDENTS_MIN, TARGET_RESPONDENTS_MSG.min)
  .max(TARGET_RESPONDENTS_MAX, TARGET_RESPONDENTS_MSG.max);

export const TotalRespondentsSchema = z
  .number()
  .int()
  .max(TOTAL_RESPONDENTS_MAX, TOTAL_RESPONDENTS_MSG.max);
  
export const TagsSchema = z
  .array(TagSchema)
  .min(TAGS_MIN, TAGS_MSG.range)
  .max(TAGS_MAX, TAGS_MSG.range);

export const AuthorizedViewersSchema = z
  .array(z.string())
  .max(AUTHORIZED_VIEWERS_MAX, AUTHORIZED_VIEWERS_MSG.max);

export const IsDraftSchema = z.preprocess((val) => val === 'true', z.boolean());

export const AppliedBoostersSchema = z
  .number()
  .int()
  .min(APPLIED_BOOSTER_MIN)
  .max(APPLIED_BOOSTER_MAX);

  export const SurveyFormSchema = z.object({
    title: TitleSchema,
    description: DescriptionSchema,
    targetRespondents: TargetRespondentsSchema,
    booster: AppliedBoostersSchema,
    tags: TagsSchema,
    questions: QuestionsSchema,
    isDraft: z.boolean(),
    _id: z.string().optional()
  })

  type x = z.infer<typeof SurveyFormSchema>
