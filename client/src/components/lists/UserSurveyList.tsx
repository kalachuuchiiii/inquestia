import SurveyCard from '../card/SurveyCard.jsx'
import { fetchApi } from '../../utils/fetchApi.js'
import { useInView } from 'react-intersection-observer'
import { UserSurveyContext } from '../../context/userSurveyContext.js'
import Placeholder from '../card/placeholders/surveyCardPlaceholder.jsx'
import { useInfiniteQuery } from '@tanstack/react-query'
import useFieldArray from '../../hooks/useFieldArray.js'
import { useEffect } from 'react'
import ArrowButton from '../html/ArrowButton.jsx'

const UserSurveyList = () => {
  const getUserSurvey = async ({ pageParam = 1 }) => {
    const res = await fetchApi('get', `/survey-list/user`, {
      page: pageParam,
      isDraft: false,
    })
    return {
      surveys: res.surveys,
      totalSurveys: res?.totalSurveys ?? 0,
      nextPage: res?.nextPage, 
    }
  }

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['user-surveys'],
    queryFn: getUserSurvey,
    getNextPageParam: (lastPage) => lastPage.nextPage, 
     keepPreviousData: true,
  })
  const {
    fieldArray: surveys,
    setFieldArray,
    modifyFieldById,
    removeFieldById,
  } = useFieldArray(data?.pages.flatMap((page) => page.surveys) ?? []);

  useEffect(() => {
      setFieldArray(data?.pages?.flatMap((page) => page.surveys) ?? []);
  }, [data])

  const totalSurveys = data?.pages[0]?.totalSurveys ?? 0

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <UserSurveyContext.Provider
      value={{
        modifyFieldById,
        removeFieldById,
      }}
    >
      <p className="w-full text-left my-2 p-2 rounded text-sm">
        Your Surveys {totalSurveys > 0 ? `(${totalSurveys})` : null}
      </p>

      <div className="space-y-3">
        {surveys?.length > 0 ? (
          surveys.map((survey) => (
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
                  <div className="col-span-1 col-start-12 w-full flex justify-center h-full items-center z-40">
                    <SurveyCard.OptionButton />
                  </div>
                )}
              </div>
              <SurveyCard.Author />
              <SurveyCard.Redirect />
              <SurveyCard.Bar />
            </SurveyCard>
          ))
        ) : !isLoading ? (
          <div className="h-60 w-full flex flex-col justify-center gap-3 items-center text-center">
            <p className="text-xs opacity-70">
              You don’t have any surveys yet. Start by creating one to begin
              collecting responses.
            </p>
            <ArrowButton
              to="/create"
              className="inquestia-button"
            >
              Create survey
            </ArrowButton>
          </div>
        ) : null}
      </div>
      {isLoading || isFetchingNextPage ? <Placeholder /> : !hasNextPage && (
            <div className="w-full text-center p-2">You've reached the end</div>
          )}
      <div className="h-2 w-full shrink-0" ref={ref} />
    </UserSurveyContext.Provider>
  );
}

export default UserSurveyList
