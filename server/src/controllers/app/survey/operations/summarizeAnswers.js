
const { verifyObjectId } = require("../../../../middlewares/verification/verifyObjectId.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { generateSystemData } = require("../../../../data/systemData.js");
const { filterSurveyList } = require("../../../../middlewares/validation/survey/filterSurveyList.js");

const summarizeAnswers = async(req, res) => {

   const { filteredData = null } = req;

   if(!filteredData){
    return res.status(400).json({
      success: false, 
      message: 'No filtered data found.'
    })
   }

   if (!filteredData.answers || filteredData.answers.length === 0) {
     return res.status(200).json({
       success: true,
       survey: filteredData.survey,
       response: `# No Data Available

It looks like we couldn’t find any answers for this survey with the current filters applied.  
This may happen because:

- The survey has not received any responses yet.  
- The selected filters are too restrictive and exclude all available answers.  
- The data might still be in the process of being collected.  

Before generating a summary, please make sure there are responses that match your chosen filters or try adjusting your filters to include more data.  

👉 Once responses are available, a summary will be generated automatically here.
`,
     });
   }

   const sysData = generateSystemData(filteredData.survey);
  
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
      content: `Here are the survey responses: ${JSON.stringify([...filteredData.plainAnswers])}`
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
 survey: filteredData.survey,
 response: response?.choices[0]?.message?.content
})

}

module.exports = build => build({
  name: 'survey_summary', 
  path: '/survey/summarize/:resourceId', 
  method: 'get', 
  middlewares: [verifySession, verifyObjectId, catchError(filterSurveyList(false, 1000))],
  fn: catchError(summarizeAnswers),
})