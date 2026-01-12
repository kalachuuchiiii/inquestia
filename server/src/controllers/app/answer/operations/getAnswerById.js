
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const Answer = require("../../../../models/answer");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getBadgeByPoint } = require("../../../../utils/getBadgeByPoint");
const { verifyObjectId } = require("../../../../utils/schema/verifyObjectId");



module.exports = build => build({
    path: '/answer-by-id/:answerId', 
    method: 'get', 
    fn: catchError(getAnswerById), 
    name: 'getAnswerById', 
    middlewares: [verifySession]
})