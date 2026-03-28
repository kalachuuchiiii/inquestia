import api from "@/lib/axios.instance";
import {  useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GetSurveyByIdResponse, UserDTO } from "@inquestia/types";
import { useSurveyAnswers } from "../hooks/useSurveyAnswers";
import { AnswerFormCard } from "../components/AnswerFormCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Star, RefreshCcw } from "lucide-react";
import { SurveyAnswerCard } from "../components/SurveyAnswerCard";
import SurveyStatistics from "@/features/app/analytics/components/SurveyStatistics";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SurveyAnswersPage = () => {
  const { survey, answers, filterForm, filterFormControl, applyFilters } = useSurveyAnswers();
  const { surveyId } = useParams();
  const { accessToken } = useAppSelector(state => state.user);
  const [isAuthentic, setIsAuthentic] = useState<boolean | null>(null);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);


  const { data, refetch: fetchStatistics } = useQuery({
    queryFn: async() => {
  const response = await api.get(`/api/assistant/statistics/${surveyId}`, {
        params: {
          isAuthentic,
        },
      });
      if (response.data?.success) {
        setStatistics(response.data.statistics);
      }
    },
    queryKey: ['statistics', isAuthentic],
    enabled: !!accessToken
  })

  return (
    <>
      {/* Authenticity Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 border-blue-200 dark:border-zinc-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
              Filter by Authenticity
            </CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              View statistics for all responses, only authentic, or only non-authentic answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setIsAuthentic(null)}
                variant={isAuthentic === null ? "default" : "outline"}
              >
                📊 All Responses
              </Button>
              <Button
                onClick={() => setIsAuthentic(true)}
                variant={isAuthentic === true ? "default" : "outline"}
              >
                ✅ Authentic Only
              </Button>
              <Button
                onClick={() => setIsAuthentic(false)}
                variant={isAuthentic === false ? "default" : "outline"}
              >
                ❌ Non-Authentic Only
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Survey Header & Statistics Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-6 p-4">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{survey?.title}</CardTitle>
                <CardDescription className="text-base">{survey?.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => fetchStatistics()}
                  disabled={isLoadingStats}
                  variant="outline"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Refresh
                </Button>
                <Link to={`/ai-summary/${survey?._id}`}>
                  <Button variant="outline">
                    <Star className="w-4 h-4" /> AI Summary
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          {/* Statistics Chart */}
          {statistics.length > 0 && (
            <CardContent className="mt-6">
              <SurveyStatistics data={statistics} />
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Filter and Carousel Section */}
   
        <Card className="p-4 mb-6 w-full ">
          <CardHeader className="pb-3 w-full">
            <CardTitle className="text-lg">Filter Questions</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Carousel className="w-full" >
              <CarouselContent className="w-full">
                {filterForm.responses.map((f, idx) => (
                  <CarouselItem key={idx}>
                    <AnswerFormCard
                      idx={idx}
                      answerFormControl={filterFormControl}
                      question={f}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
            <div className="flex items-center my-6 gap-2 justify-end flex-wrap">
              <Button onClick={applyFilters} className="inquestia-button">
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
  
      {/* Answers List Section */}
    
        <Card className="p-4 bg-gradient-to-r from-zinc-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">
              Survey Responses ({answers.length})
            </CardTitle>
            <CardDescription>
              {answers.length === 0
                ? "No responses yet for this survey"
                : `Showing ${answers.length} response${answers.length !== 1 ? "s" : ""}`}
            </CardDescription>
          </CardHeader>
        </Card>

        {answers.length > 0 ? (
          <div className="space-y-3">
            {answers.map((ans, idx) => (
              <motion.div
                key={ans._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <SurveyAnswerCard answer={ans} user={ans?.respondent as UserDTO} />
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-zinc-500 dark:text-zinc400">
              No responses match your current filter
            </p>
          </Card>
        )}
   
    </>
  );
};

export default SurveyAnswersPage;
