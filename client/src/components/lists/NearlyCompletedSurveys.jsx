import SurveyCard from '../card/SurveyCard.jsx';
import SurveyPlaceholder from '../card/placeholders/surveyCardPlaceholder.jsx';

const NearlyCompletedSurveys = ({nearlyCompletedSurveys = []}) => {


return <>
            <div className = "text-neutral-100">
        <h2 className = "text-lg lato" >Nearly Completed Surveys</h2>
        <p className = "text-sm opacity-80" >These surveys are close to reaching completion. Your input can help wrap them up.</p>
      </div>
    <div className=" overflow-x-auto p-2 border-l-1  scrollbar-none space-y-3 ">
      <div className="w-max flex gap-2">
        {
          nearlyCompletedSurveys?.length > 0 ? nearlyCompletedSurveys.map((s) => <div key = {s._id}>
             <SurveyCard survey={s} >
            <SurveyCard.Preview />
            <SurveyCard.Author />
            <SurveyCard.Redirect />
            <SurveyCard.Bar />
          </SurveyCard >
          </div>
          ) : <div className = "w-90">
            <SurveyPlaceholder />
          </div>
        }
      </div>
    </div>
</>
}

export default NearlyCompletedSurveys