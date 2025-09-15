const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getReportList } = require("../../../app/report/utils/getReportList");


module.exports = build => build({
    name: 'getResolvedSurveyReportList', 
    fn: catchError(getReportList('Survey', true)), 
    middlewares: [verifySession, getPageParam],
    method: 'get', 
    path: '/admin/resolved/survey-reports'
})