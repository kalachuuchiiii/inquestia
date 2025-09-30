

const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { getPageParam } = require("../../../../middlewares/pagination/getPageParam.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { filterSurveyList } = require("../../../../middlewares/validation/survey/filterSurveyList.js");


const getSurveyAnswers = async(req, res) => {
 const { filteredData } = req;

  if(!filteredData){
    return res.status(400).json({
      success: false, 
      message: 'No filtered data found'
    })
  }

  return res.status(200).json({
    ...filteredData
  })
 }

module.exports = build => build({
  name: 'answer_list', 
  method: 'get', 
  path: '/answer/s/:resourceId',
  fn: catchError(getSurveyAnswers),
  middlewares: [verifySession, verifyObjectId, getPageParam, catchError(filterSurveyList(true, 4))]
})