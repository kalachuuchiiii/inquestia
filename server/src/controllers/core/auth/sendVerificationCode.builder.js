const { validateUserFields } = require("../../../middlewares/validation/user/validateUserFields.js");
const {checkUserPresence} = require("../../../middlewares/validation/user/checkUserPresence.js");
const { preventUserDuplication } = require("../../../middlewares/validation/user/preventUserDuplication.js");
const { validateUsername } = require("../../../middlewares/validation/user/validateUsername.js");
const { sendVerificationCode } = require("./operations/sendVerificationCode.js");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");



const sendVerificationCodeBuilder = (build) => {
  build({
  name: "register_otp",
  method: "post",
  path: "/user/register/otp",
  middlewares: [validateUserFields, validateUsername, catchError(checkUserPresence), catchError(preventUserDuplication)],
  fn: catchError(sendVerificationCode)
})
}

module.exports = sendVerificationCodeBuilder;