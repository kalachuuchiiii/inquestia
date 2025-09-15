import { useParams } from "react-router-dom";
import UserCard from '../../components/card/UserProfileCard.jsx';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import { useEffect, useState } from 'react';
import SurveyCard from '../../components/card/SurveyCard.jsx';
import SurveyCardPlaceholder from '../../components/card/placeholders/surveyCardPlaceholder.jsx';
import { useInView } from 'react-intersection-observer';
import LoadingDisplay from '../../components/html/LoadingDisplay.jsx';
import { GoReport } from "react-icons/go";
import { AnimatePresence } from "framer-motion";
import ReportUserModal from "../../components/modals/ReportUserModal.jsx";

const ViewProfilePage = () => {

  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userSurveys, setUserSurveys] = useState([]);
  const [nextPage, setNextPage] = useState(0);
  const [totalUserSurvey, setTotalUserSurvey] = useState(null);
  const [isReporting, setIsReporting] = useState(false);

  const [getProfile, { isLoading, error }] = useAsync(async () => {
    const res = await fetchApi("get", "/user/profile", {
      username
    })
    if (!res?.success) return;
    setUserProfile(res.userProfile);
    setNextPage(1);
  }, [username])

  const [getUserSurvey, { isLoading: isFetchingSurvey, error: isFetchingSurveyError }] = useAsync(async ({ overwrite = true, page = 1 } = {}) => {
    if (!userProfile?._id) return;
    const res = await fetchApi("get", `/user/${userProfile?._id}/survey-list`, {
      page
    });
    
    if (!res?.success) return;
    setUserSurveys(prev => overwrite ? res.surveys : [...prev, ...res.surveys]);
    setTotalUserSurvey(res.totalSurveys);
    setNextPage(res.nextPage);
  }, [userProfile]);

  const { ref, inView } = useInView();

  useEffect(() => {
    getProfile();
  }, [username])

  useEffect(() => {
    if (!userProfile) return;
    getUserSurvey();
  }, [userProfile]);

  useEffect(() => {
    if (!inView || isFetchingSurvey || nextPage === null) return;
    getUserSurvey({ page: nextPage, overwrite: false });
  }, [nextPage, inView, ref])
  
  if(isLoading ){
    return <LoadingDisplay>
      <p>Loading...</p>
    </LoadingDisplay>
  }


  return (
    <>
      <AnimatePresence>
        {isReporting && (
          <ReportUserModal
            username={userProfile.username}
            userId = {userProfile._id}
            onClose={() => setIsReporting(false)}
          />
        )}
      </AnimatePresence>
      <div className="p-3 w-full">
        <div className="space-y-4 flex justify-between p-3 gap-2 items-start w-full">
          {userProfile && <div className="w-full">
            <UserCard user={userProfile} />
            </div>
            }
          <button className="shrink-0 p-2" onClick = {() => setIsReporting((prev) => !prev)}>
            <GoReport size = {26} />
          </button>
        </div>
        {userSurveys?.length > 0 && (
          <>
            <div className="p-3 my-2 w-full border-b-1 border-b-neutral-100 text-center">
              <p>Surveys ({totalUserSurvey})</p>
            </div>
            <div>
              {userSurveys.map((s) => {
                return (
                  <SurveyCard key={s._id} survey={s}>
                    <SurveyCard.Preview />
                    <SurveyCard.Author />
                    <SurveyCard.Redirect />
                    <SurveyCard.Bar />
                  </SurveyCard>
                );
              })}
            </div>
          </>
        )}
        {isFetchingSurvey && <SurveyCardPlaceholder />}
        <div ref={ref} />
      </div>
    </>
  );
}

export default ViewProfilePage