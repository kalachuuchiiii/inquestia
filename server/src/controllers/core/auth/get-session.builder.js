
const { verifySession } = require("../../../middlewares/verification/verifySession.js");
const { getSession } = require("./operations/getSession.js");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");

const getSessionBuilder = (build) => {
  build({
    name: 'session',
    path: '/user/session', 
    method: "post", 
    middlewares: [
      catchError(verifySession)], 
    fn: catchError(getSession)
  })
}

module.exports = getSessionBuilder;