const { login } = require("./operations/login.js");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");
const { validateUserFields } = require("../../../middlewares/validation/user/validateUserFields.js");
const { requireUserPresence } = require("../../../middlewares/validation/user/requireUserPresence.js");
const { checkUserPresence } = require("../../../middlewares/validation/user/checkUserPresence.js");

const loginBuilder = (build) => {
  build({
    name: "login",
    path: "/user/login", 
    method: "post", 
    middlewares: [validateUserFields, catchError(checkUserPresence), catchError(requireUserPresence)], 
    fn: catchError(login)
  })
}

module.exports = loginBuilder;