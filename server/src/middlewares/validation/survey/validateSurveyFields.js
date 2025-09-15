const { z } = require("zod");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");
const { interests } = require("../../../data/interests.js");

const textQuestionSchema = z.object({
  type: z.literal("text"),
  question: z
    .string()
    .min(6, "Question must be at least 6 characters long.")
    .max(100, "Question cannot exceed 100 characters."),
  isRequired: z.boolean().default(false),
});

const selectQuestionSchema = z.object({
  type: z.literal("select"),
  question: z
    .string()
    .min(6, "Question must be at least 6 characters long.")
    .max(100, "Question cannot exceed 100 characters."),
  isRequired: z.boolean().default(false),
  multipleChoice: z.boolean().default(false),
  choices: z
    .array(
      z
        .string()
        .min(1, "Each choice must contain at least 1 character.")
        .max(30, "Each choice cannot exceed 30 characters.")
    )
    .min(2, "You must provide at least 2 choices.")
    .max(8, "You can only add up to 8 choices."),
});


const questionSchema = z.union([textQuestionSchema, selectQuestionSchema]);


const surveySchema = z.object({
  title: z
    .string()
    .min(6, "Survey title must be at least 6 characters long.")
    .max(80, "Survey title cannot exceed 80 characters."),
  description: z
    .string()
    .min(10, "Survey description must be at least 10 characters long.")
    .max(150, "Survey description cannot exceed 150 characters."),
  targetRespondents: z
    .number()
    .min(8, "Target respondents must be at least 8.")
    .max(1000, "Target respondents cannot exceed 1000."),
  tags: z
    .array(z.enum(interests, { message: "One or more tags are invalid." }))
    .min(1, "You must select at least 1 tag.")
    .max(5, "You can select up to 5 tags."),
  questions: z
    .array(questionSchema)
    .min(1, "A survey must contain at least 1 question.")
    .max(8, "A survey can only contain 8 questions at most."),
  ageGroup: z.object({
    minAge: z
      .number()
      .min(8, "Minimum age must be at least 8.")
      .max(120, "Minimum age cannot exceed 120.")
      .default(8),
    maxAge: z
      .number()
      .min(8, "Maximum age must be at least 8.")
      .max(120, "Maximum age cannot exceed 120.")
      .default(120),
  }).refine(
    (data) => data.maxAge >= data.minAge,
    { message: "maxAge must be greater than or equal to minAge." }
  ),
  genderGroup: z
    .array(
      z.enum(["male", "female", "non-binary", "transgender", "other"], {
        message: "Invalid gender option.",
      })
    )
    .min(1, "You must select at least 1 gender.")
    .default(["male", "female", "non-binary", "transgender", "other"]),
});


exports.validateSurveyFields = catchError(async (req, res, next) => {

    const { survey } = req.body;
    if (!survey) {
      return res.status(400).json({
        success: false,
        message: "Survey is undefined.",
      });
    }
    const { minAge, maxAge } = survey.ageGroup;

    const parsed = surveySchema.parse({
      ...survey, 
      ageGroup: {
        minAge: parseInt(minAge),
         maxAge: parseInt(maxAge)
      }, 
      targetRespondents: parseInt(survey.targetRespondents)
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
