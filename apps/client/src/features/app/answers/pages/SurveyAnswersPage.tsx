import api from "@/lib/axios.instance";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { useSurveyAnswers } from "../hooks/useSurveyAnswers";

import { Button } from "@/components/ui/button";
import { RefreshCcw, X } from "lucide-react";
import SurveyStatistics from "@/features/app/analytics/components/SurveyStatistics";
import { motion } from "framer-motion";
import { AnswerCard } from "../components/MyAnswerCard";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAccount } from "../../account/hooks/useAccount";

const SurveyAnswersPage = () => {
  const { survey, answers } = useSurveyAnswers();
  const { surveyId } = useParams();
  const { data: user } = useAccount();
  const {
    data: statistics,
    refetch: fetchStatistics,
    isPending,
  } = useQuery({
    queryFn: async () => {
      const response = await api.get(`/api/assistant/statistics/${surveyId}`);
      return response.data.statistics;
    },
    queryKey: ["statistics"],
    enabled: !!user,
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <div className="p-2">
            <div className="flex mb-6 flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h1 className="lg:text-3xl font-bold tracking-tighter leading-4 text-lg mb-2">
                  {survey?.title}
                </h1>
                <p className="text-base">{survey?.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => fetchStatistics()}
                  disabled={isPending}
                  variant="outline"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Refresh
                </Button>
                <Link to={`/ai-summary/${survey?._id}`}>
                  <Button>
                    <img src="/star.gif" className="lg:size-6" /> AI Summary
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {statistics.length > 0 && (
            <div className="mt-6 mb-3">
              <SurveyStatistics data={statistics} />
            </div>
          )}
        </div>
      </motion.div>

      {answers.length > 0 ? (
        <div className="space-y-3">
          {answers.map((ans, idx) => (
            <motion.div
              key={ans._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <AnswerCard answer={ans} key={ans._id} />
            </motion.div>
          ))}
        </div>
      ) : (
        <Empty className="p-8 text-center">
          <EmptyHeader>
            <EmptyMedia>
              <X />
            </EmptyMedia>
            <EmptyTitle>No responses to show</EmptyTitle>
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
};

export default SurveyAnswersPage;
