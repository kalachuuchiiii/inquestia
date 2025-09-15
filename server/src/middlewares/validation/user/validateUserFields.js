const { z } = require("zod");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");

const parseBirthday = (val) => {
  if (typeof val !== "string") return undefined;
  const parts = val.split(/[-/]/);
  if (parts.length !== 3) return undefined;

  let [year, month, day] = parts.map((p) => parseInt(p, 10));
  if (year < 100) {
    year += year >= 50 ? 1900 : 2000;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return isNaN(date.getTime()) ? undefined : date;
};


const isOldEnough = (date) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 8,
    today.getMonth(),
    today.getDate()
  );
  return date <= minDate;
};

const userSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required.")
    .email("Invalid email format."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?-]*$/,
      "Invalid password"
    )
    .min(8, "Password must contain 8-20 characters only.")
    .max(20, "Password must contain 8-20 characters only."),
  birthdate: z.preprocess(
    parseBirthday,
    z
      .date({ invalid_type_error: "Invalid birthday format. Use yy-mm-dd." })
      .refine(isOldEnough, { message: "You must be at least 8 years old." })
  ),
  gender: z.enum(
    [
      "male",
      "female",
      "transgender",
      "non-binary",
      "other"
    ],
    {
      required_error: "Gender is required.",
      invalid_type_error: "Invalid gender option.",
    }
  ),
});

exports.validateUserFields = catchError(async (req, res, next) => {
  try {
    const parsed = userSchema.parse(req.body.user);
    console.log(parsed);
    req.user = parsed;
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const parsedErr = JSON.parse(err);
      return res.status(400).json({
        success: false,
        message: parsedErr[0].message, 
      });
    }
    throw err;
  }
});
