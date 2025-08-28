const Survey = require("../../../../models/survey.js");
const Answer = require("../../../../models/answer.js")
const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { generateSystemData } = require("../../../../data/systemData.js")

const summarizeAnswers = async(req, res) => {

  const { verifiedUser, verifiedId: surveyId } = req;
  const survey = await Survey.findById(surveyId).lean();
  if(!survey){
    return res.status(400).json({
      success: false, 
      message: "Survey not found."
    })
  }
  if(survey.user.toString() !== verifiedUser._id.toString()){
    return res.status(400).json({
      success: false, 
      message: "You can't generate a summary of survey of others."
    })
  }
  
  if(survey?.isDraft){
    return res.status(400).json({
      success: false, 
      message: "You can't generate a summary of a draft"
    })
  }
  
  const answers = await Answer.find({
    survey: survey._id
  }).populate({
    path: 'answers.question', 
    model: 'Question'
  })
  

  if(answers?.length < 1){
    return res.status(400).json({
      success: false, 
      message: "There aren’t enough responses to this survey to generate a summary."
    })
  }
  
  const sysData = generateSystemData(survey);
  
   let response  = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'openai/gpt-oss-120b',
    messages: [{ role: "system", content: sysData }, {
      role: "user", 
      content: `Here are the survey responses: ${JSON.stringify([...answers])}`
    }]
  })
})

response = await response.json();

if(!response || response?.error){
  return res.status(400).json({
    success: false, 
    message: "Summary Generation Failed. Please try again."
  })
}

return res.status(200).json({
 success: true, 
 survey,
 answers,
 response
})

}

module.exports = build => build({
  name: 'survey_summary', 
  path: '/survey/summarize/:resourceId', 
  method: 'get', 
  middlewares: [verifySession, verifyObjectId],
  fn: catchError(summarizeAnswers),
})