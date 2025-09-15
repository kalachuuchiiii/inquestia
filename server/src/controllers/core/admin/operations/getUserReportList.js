const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getReportList } = require("../../../app/report/utils/getReportList");



module.exports = build => build({
    name: 'getUserReportList', 
    fn: catchError(getReportList('User')), 
    middlewares: [verifySession, getPageParam],
    method: 'get', 
    path: '/admin/user-reports'
})