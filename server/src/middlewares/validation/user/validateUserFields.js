const { z } = require("zod");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");


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

});

exports.validateUserFields = catchError(async (req, res, next) => {

    const parsed = userSchema.parse(req.body.user);
    console.log(parsed);
    req.user = parsed;
    if(!parsed){
      return res.status(400).json({
        success: false, 
        message: 'Invalid Form.'
      })
    }
    return next();
  
});
