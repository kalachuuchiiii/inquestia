
import SurveyCard from "../card/SurveyCard";
import SurveyCardPlaceholder from "../card/placeholders/surveyCardPlaceholder";
const NearlyCompletedSurveys = ({ nearlyCompletedSurveys = [] }) => {
  return (
    <div className="w-full overflow-hidden">
      <div className="text-neutral-100">
        <h2 className="text-lg lato">Nearly Completed Surveys</h2>
        <p className="text-sm opacity-80">
          These surveys are close to reaching completion. Your input can help wrap them up.
        </p>
      </div>
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex w-max gap-3">
            {nearlyCompletedSurveys?.length > 0 ? (
              nearlyCompletedSurveys.map((s, i) => (
                <div key={i} className="shrink-0">
                  <SurveyCard survey={s}>

                    <SurveyCard.Preview />
                    <SurveyCard.Author />
                    <SurveyCard.Redirect />
                    <SurveyCard.Bar />
                  </SurveyCard>
                  
                </div>
              ))
            ) : (
              <div className="shrink-0">
                <SurveyCardPlaceholder />
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default NearlyCompletedSurveys