import React, { useEffect, useState } from 'react'
import useAsync from '../../hooks/useAsync';
import { fetchApi } from '../../utils/fetchApi';
import { useInView } from 'react-intersection-observer';
import SurveyCard from '../../components/card/SurveyCard';
import SurveyCardPlaceholder from '../../components/card/placeholders/surveyCardPlaceholder';

const SharedSurvey = () => {
    const [sharedSurveys, setSharedSurveys] = useState([]);
    const [totalSharedSurveys, setTotalSharedSurveys] = useState(1); 
    const [nextPage, setNextPage] = useState(1);
    const { ref, inView } = useInView();
    const [getSharedSurvey, { isLoading } ] = useAsync(async({ page = 1, overwrite = true} = {}) => {
        const res = await fetchApi('get', `/survey-shared?page=${page}` );
        console.log(res);
        if(res?.success){
          setSharedSurveys(prev => overwrite ? res.sharedSurveys : [...prev, ...res.sharedSurveys])
          setNextPage(res.nextPage);
          setTotalSharedSurveys(res.totalSharedSurveys);
        }
    })

    useEffect(() => {
         getSharedSurvey();
    }, [])

    useEffect(() => {
        if(!inView || nextPage === null || nextPage === 0 || isLoading)return;
        getSharedSurvey({ page: nextPage, overwrite: false});
    }, [inView])


  return (
    <div>
      <div className="my-8">
        <h1 class="text-2xl font-bold text-gradient text-zinc-800 dark:text-zinc-100">
          Surveys Shared With You
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400">
          Explore the surveys others have shared with you. You can view their
          responses and gain insights from their results.
        </p>
      </div>
      <div className='space-y-2'>
        {sharedSurveys?.length > 0 ? (
          sharedSurveys.map((survey) => (
            <SurveyCard survey={survey} key={survey._id}>
              <div className="flex items-start gap-2">
                <SurveyCard.Preview />
                <SurveyCard.Report />
              </div>
              <SurveyCard.Author />
              <SurveyCard.Redirect />

              <SurveyCard.Bar />
            </SurveyCard>
          ))
        ) : totalSharedSurveys === 0 ? (
          <p className=" text-center my-30 opacity-50 w-full">
            No surveys has been shared to you yet.
          </p>
        ) : (
          nextPage === null && (
            <p className=" text-center my-30 h-20 opacity-50 w-full">
              You've reached end.
            </p>
          )
        )}
      </div>
      {isLoading && <SurveyCardPlaceholder number={8} />}
    </div>
  );
}

export default SharedSurvey