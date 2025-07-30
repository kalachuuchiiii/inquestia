const { validateUserFields } = require("../../../middlewares/validation/user/validateUserFields.js");
const { checkUserPresence } = require("../../../middlewares/validation/user/checkUserPresence.js");
const { preventUserDuplication } = require("../../../middlewares/validation/user/preventUserDuplication.js")
const { validateUsername } = require("../../../middlewares/validation/user/validateUsername.js");
const { register } = require("./operations/register.js");
const { verifyOTP } = require("../../../middlewares/verification/verifyOTP.js");
const { hashPassword } = require("../../../middlewares/hashing/hashPassword.js");
const { catchError, catchErrorWithSession } = require("../../../utils/errorHandlers/catchError.js");

const registerBuilder = (build) => {
  build({
  name: "register",
  method: "post",
  path: "/user/register",
  middlewares: [catchError(validateUserFields), validateUsername, catchError(checkUserPresence), catchError(preventUserDuplication), catchError(verifyOTP), catchError(hashPassword)],
  fn: catchErrorWithSession(register)
})

}

module.exports = registerBuilder;