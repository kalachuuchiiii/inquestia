import { z } from "zod";
import {
  TITLE_MIN,
  TITLE_MAX,
  DESCRIPTION_MIN,
  DESCRIPTION_MAX,
  TAGS_ENUM,
  TAGS_MIN,
  TAGS_MAX,
  AUTHORIZED_VIEWERS_MAX,
  BOOSTER_MIN,
  BOOSTER_MAX,
  RESPONDENT_COUNT_MIN,
  RESPONDENT_COUNT_MAX,
  SURVEY_STATUS_ENUM,
} from "@inquestia/constants";
import { QuestionsSchema } from "./question.schemas";
import {
  IDSchema,
  NumberOfAnswersAllowedSchema,
  TimestampSchema,
} from "./common.schemas";
import { UserSchema } from "./user.schemas";

export const TagSchema = z.enum(TAGS_ENUM);

export const TitleSchema = z
  .string()
  .min(TITLE_MIN, `Title must be at least ${TITLE_MIN} characters`)
  .max(TITLE_MAX, `Title must be at most ${TITLE_MAX} characters`);

export const RespondentCountSchema = z.coerce
  .number()
  .int()
  .min(
    RESPONDENT_COUNT_MIN,
    `Respondent count must be at least ${RESPONDENT_COUNT_MIN}`
  )
  .max(
    RESPONDENT_COUNT_MAX,
    `Respondent count must be at most ${RESPONDENT_COUNT_MAX}`
  );

export const DescriptionSchema = z
  .string()
  .min(
    DESCRIPTION_MIN,
    `Description must be at least ${DESCRIPTION_MIN} characters`
  )
  .max(
    DESCRIPTION_MAX,
    `Description must be at most ${DESCRIPTION_MAX} characters`
  );

export const TagsSchema = z
  .array(TagSchema)
  .min(TAGS_MIN, `You can only select ${TAGS_MIN}-${TAGS_MAX} tags`)
  .max(TAGS_MAX, `You can only select ${TAGS_MIN}-${TAGS_MAX} tags`);

export const AuthorizedViewersSchema = z
  .array(UserSchema)
  .max(
    AUTHORIZED_VIEWERS_MAX,
    `You can only authorize ${AUTHORIZED_VIEWERS_MAX} people`
  );

export const IsDraftSchema = z.preprocess((val) => val === "true", z.boolean());

export const BoosterSchema = z.coerce
  .number()
  .int()
  .min(BOOSTER_MIN, `Invalid booster point`)
  .max(BOOSTER_MAX, `Invalid booster point`)
  .catch(0);

export const SurveyStatusSchema = z.enum(
  SURVEY_STATUS_ENUM,
  `Invalid survey status`
);
export const SurveyFormSchema = z
  .object({
    title: TitleSchema,
    status: SurveyStatusSchema,
    description: DescriptionSchema,
    targetRespondents: RespondentCountSchema,
    booster: BoosterSchema,
    tags: TagsSchema,
    questions: QuestionsSchema,
    isDraft: z.boolean(),
  })
  .strip();

export const SurveySchema = SurveyFormSchema.safeExtend({
  createdAt: TimestampSchema,
  isClosed: z.boolean().catch(true),
  questions: QuestionsSchema,
  _id: IDSchema,
  totalRespondents: z.number().nonnegative().catch(0),
  authorId: z.union([UserSchema, IDSchema]),
  author: UserSchema.optional(),
  authorizedViewers: AuthorizedViewersSchema.optional().catch(undefined),
})
  .strip()
  .transform((v) =>
    typeof v.authorId === "object" ? { ...v, author: v.authorId } : v
  );

export type Survey = z.infer<typeof SurveySchema>;
export type SurveyForm = z.infer<typeof SurveyFormSchema>;
