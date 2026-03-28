const { z } = require("zod");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");
const { interests } = require("../../../data/interests.js");

const textQuestionSchema = z.object({
  type: z.literal("text"),
  question: z
    .string()
    .min(6, "Question must be at least 6 characters long.")
    .max(250, "Question cannot exceed 250 characters."),
  isRequired: z.boolean().default(false),
});

const selectQuestionSchema = z.object({
  type: z.literal("select"),
  question: z
    .string()
    .min(6, "Question must be at least 6 characters long.")
    .max(250, "Question cannot exceed 250 characters."),
  isRequired: z.boolean().default(false),
  multipleChoice: z.boolean().default(false),
  choices: z
    .array(
      z
        .string()
        .min(1, 'Each choice must contain at least 1 character.')
        .max(100,  'Each choice cannot exceed 100 characters.')
    )
    .min(2, "You must provide at least 2 choices.")
    .max(8, "You can only add up to 8 choices."),
});


const questionSchema = z.union([textQuestionSchema, selectQuestionSchema]);


const surveySchema = z.object({
  title: z
    .string()
    .min(6, "Survey title must be at least 10 characters long.")
    .max(250, "Survey title cannot exceed 250 characters."),
  description: z
    .string()
    .min(6, "Survey description must be at least 10 characters long.")
    .max(500, "Survey description cannot exceed 500 characters."),
  targetRespondents: z
    .number()
    .min(8, "Target respondents must be at least 8.")
    .max(1000, "Target respondents cannot exceed 1000."),
  tags: z
    .array(z.enum(interests, { message: "One or more tags are invalid." }))
    .min(1, "You must select at least 1 tag.")
    .max(5, "You can select up to 5 tags."),
  booster: z
    .number()
    .min(0, "Boost points must be between 0 and 5.")
    .max(5, "Boost points must be between 0 and 5."),
  questions: z
    .array(questionSchema)
    .min(1, "A survey must contain at least 1 question.")
    .max(16, "A survey can only contain 16 questions at most."),
});


exports.validateSurveyFields = catchError(async (req, res, next) => {

    const { survey } = req.body;
    if (!survey) {
      return res.status(400).json({
        success: false,
        message: "Survey is undefined.",
      });
    }
    

    const parsed = surveySchema.parse({
      ...survey, 
      targetRespondents: parseInt(survey.targetRespondents), 
      booster: parseInt(survey.booster) || 0

    });

    if (parsed.questions.every((q) => !q.isRequired)) {
      return res.status(400).json({
        success: false,
        message: "You must have at least 1 required question.",
      });
    }

    

    req.verifiedSurvey = parsed;
    next();
});
