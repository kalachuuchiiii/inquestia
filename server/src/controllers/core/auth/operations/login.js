const User = require("../../../../models/user.js");
const bcrypt = require("bcryptjs");
const { signToken } = require("../../../../utils/auth/jwt.methods.js");
const { storeCookie } = require("../../../../utils/auth/cookies.methods.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { z } = require("zod");

const loginSchema = z.object({
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
    .min(8, "Password must contain 8-20 characters only.")
    .max(20, "Password must contain 8-20 characters only."),
});

const comparePasswords = async (candidatePass, pass) => {
  return await bcrypt.compare(candidatePass, pass);
};

const validateLoginFields = catchError(async (req, res, next) => {
  try {
    const parsed = loginSchema.parse(req.body.user);
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

const login = async (req, res) => {
  const { email, password: candidatePass } = req.user;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Incorrect username or password.",
    });
  }

  const isPasswordCorrect = await comparePasswords(candidatePass, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      success: false,
      message: "Incorrect username or password.",
    });
  }
  const token = await signToken({ user: user._id });

  storeCookie(res, {
    key: "token",
    value: token,
  });

  const userData = user.toObject();
  delete userData.password;

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: userData,
  });
};

module.exports = (build) => {
  build({
    name: "login",
    path: "/user/login",
    method: "post",
    middlewares: [validateLoginFields],
    fn: catchError(login),
  });
};
