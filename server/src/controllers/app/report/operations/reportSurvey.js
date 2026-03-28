const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { reportEntity } = require("../utils/reportEntity");


 module.exports = build => build({
    name: 'reportSurvey', 
    path:'/report/survey/:resourceId', 
    method:'post', 
    fn: catchError(reportEntity('Survey')), 
    middlewares: [verifyObjectId, verifySession]
 })