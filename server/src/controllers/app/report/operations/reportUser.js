const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { reportEntity } = require("../utils/reportEntity");


 module.exports = build => build({
    name: 'reportUser', 
    path:'/report/user/:resourceId', 
    method:'post', 
    fn: catchError(reportEntity('User')), 
    middlewares: [verifyObjectId, verifySession]
 })