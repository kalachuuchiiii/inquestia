

const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getReportList } = require("../../../app/report/utils/getReportList");


module.exports = build => build({
    name: 'getResolvedUserReportList', 
    fn: catchError(getReportList('User', true)), 
    middlewares: [verifySession, getPageParam],
    method: 'get', 
    path: '/admin/resolved/user-reports'
});