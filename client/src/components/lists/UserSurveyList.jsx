import SurveyCard from '../card/SurveyCard.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import useFieldArray from '../../hooks/useFieldArray.js'
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer'
import { UserSurveyContext } from '../../context/userSurveyContext.js';
import Placeholder from '../card/placeholders/surveyCardPlaceholder.jsx';

const UserSurveyList = () => {

  const { fieldArray: surveys, setFieldArray: setSurveys, modifyFieldById, removeFieldById, totalDocuments: totalSurveys, setTotalDocuments: setTotalSurveys } = useFieldArray([]);
  const [nextPage, setNextPage] = useState(1);

  const [getUserSurvey, { isLoading, error }] = useAsync(async ({ page = 1, overwrite = true } = {}) => {
    const res = await fetchApi("get", `/survey-list/user`, {
      page,
      isDraft: false
    });
    setSurveys(prev => overwrite ? [...res.surveys] : [...prev, ...res.surveys]);
    setNextPage(res?.nextPage || null);
    setTotalSurveys(res?.totalSurveys || 0)
  })

  const { ref, inView } = useInView();

  useEffect(() => {
    if (surveys.length > 0) return;
    getUserSurvey();
  }, []);

  useEffect(() => {
    if (!inView || nextPage === null || isLoading) return;
    getUserSurvey({ page: nextPage, overwrite: false });
  }, [nextPage, inView, isLoading, surveys]);


  return (
    <UserSurveyContext.Provider
      value={{
        modifyFieldById,
        removeFieldById,
      }}
    >
      <p className="w-full text-left my-2 p-2 rounded  text-sm">
        Your Surveys {totalSurveys > 0 ? `(${totalSurveys})` : null}
      </p>
      <div className='space-y-3'>
        {surveys?.length > 0
        ? surveys.map((survey) => (
            <SurveyCard
              Context={UserSurveyContext}
              survey={survey}
              key={survey._id}
            >
              <div className="grid grid-cols-12 items-start ">
                <div className="col-span-11 col-start-1">
                  <SurveyCard.Preview />
                </div>
                {!survey.closed && (
                  <div className="col-span-1 col-start-12 w-full flex justify-center h-full items-center z-100">
                    <SurveyCard.OptionButton />
                  </div>
                )}
              </div>
              <SurveyCard.Author />
              <SurveyCard.Redirect />
              <SurveyCard.Bar />
            </SurveyCard>
          ))
        : !isLoading && (
            <div className="h-60 w-full flex flex-col justify-center gap-3 items-center text-center">
              <p className="text-xs opacity-70">
                You don’t have any surveys yet. Start by creating one to begin
                collecting responses.
              </p>
              <a
                href="/create"
                className="p-2 bg-zinc-900 text-neutral-100 dark:bg-neutral-100 rounded-lg dark:text-zinc-900"
              >
                Create survey
              </a>
            </div>
          )}
      </div>
      {isLoading && <Placeholder />}
      <div className="h-2 w-full shrink-0 " ref={ref} />
    </UserSurveyContext.Provider>
  );
}

export default UserSurveyList