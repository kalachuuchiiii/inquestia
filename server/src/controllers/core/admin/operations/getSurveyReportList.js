const { getPageParam } = require("../../../../middlewares/pagination/getPageParam");
const { verifySession } = require("../../../../middlewares/verification/verifySession");
const { catchError } = require("../../../../utils/errorHandlers/catchError");
const { getReportList } = require("../../../app/report/utils/getReportList");



module.exports = build => build({
    name: 'getSurveyReportList', 
    fn: catchError(getReportList('Survey')), 
    middlewares: [verifySession, getPageParam],
    method: 'get', 
    path: '/admin/survey-reports'
})