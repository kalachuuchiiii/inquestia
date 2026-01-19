import { useParams } from "react-router-dom";
import UserCard from "../../components/card/UserProfileCard.jsx";
import { useEffect, useState } from "react";
import SurveyCard from "../../components/card/SurveyCard.jsx";
import SurveyCardPlaceholder from "../../components/card/placeholders/surveyCardPlaceholder.jsx";
import { useInView } from "react-intersection-observer";
import LoadingDisplay from "../../components/html/LoadingDisplay.jsx";
import { GoReport } from "react-icons/go";

import { Dialog } from "@/components/ui/dialog.js";
import ReportSurveyModal from "@/components/modals/ReportSurveyModal.js";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios.instance.js";

const ViewProfilePage = () => {
  const { username } = useParams();
  const [totalUserSurvey, setTotalUserSurvey] = useState(null);
  const [isReporting, setIsReporting] = useState(false);

  const { data: userProfile, isPending: isLoading } = useQuery({
    queryKey: ["user_profile", username],
    queryFn: async () => {
      const res = await API.get(`/api/user`, {
        params: {
          filter: {
            username,
          },
        },
      });
      return res.data.userProfile;
    },
  });

  const {
    data,
    fetchNextPage: getUserSurvey,
    hasNextPage,
    isFetchingNextPage: isFetchingSurvey,
  } = useInfiniteQuery({
    queryKey: ["user_surveys", username],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await API.get(
        `/api/users/survey-list/${userProfile._id}?page=${pageParam}`
      );
      setTotalUserSurvey(res.data.totalSurveys);
      return res;
    },
    getNextPageParam: (res) => res.data.nextPage,
    enabled: !!userProfile._id,
  });

  const userSurveys = data?.pages.flatMap((d) => d.data.surveys) ?? [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView || isFetchingSurvey || !hasNextPage) return;
    getUserSurvey();
  }, [inView, ref]);

  if (isLoading) {
    return (
      <LoadingDisplay>
        <p>Loading...</p>
      </LoadingDisplay>
    );
  }

  return (
    <>
      <Dialog open={isReporting}>
        <ReportSurveyModal />
      </Dialog>
      <div className="p-3 w-full">
        <div className="space-y-4 md:flex flex-col justify-between p-3 gap-2 items-start w-full">
          {userProfile && (
            <div className="w-full">
              <UserCard user={userProfile} />
            </div>
          )}
          <button
            className="p-2 flex gap-2 items-center"
            onClick={() => setIsReporting((prev) => !prev)}
          >
            <GoReport size={26} /> <p>Report</p>
          </button>
        </div>
        {userSurveys?.length > 0 ? (
          <>
            <div className="p-3 my-2 w-full text-left">
              <p>Surveys ({totalUserSurvey})</p>
            </div>
            <div>
              {userSurveys.map((s) => {
                return <SurveyCard key={s._id} survey={s} />;
              })}
            </div>
          </>
        ) : (
          <p className="text-center w-full">No surveys yet.</p>
        )}
        {isFetchingSurvey ? (
          <SurveyCardPlaceholder />
        ) : (
          !hasNextPage &&
          userSurveys.length > 0 && (
            <div className="w-full text-center p-2">You've reached the end</div>
          )
        )}
        <div ref={ref} />
      </div>
    </>
  );
};

export default ViewProfilePage;
