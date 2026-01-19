import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAsync from "../../hooks/useAsync";
import { fetchApi } from "../../utils/fetchApi";
import AnswerCard from "../../components/card/AnswerCard";
import ArrowButton from "../../components/html/ArrowButton";
import LoadingDisplay from "../../components/html/LoadingDisplay";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { useAppSelector } from "@/hooks/useAppSelector";

const ViewAnswer = () => {
  const { id } = useParams();
  const api = useApi();
  const { user } = useAppSelector((state) => state.user);

  const { data: answer, isPending: isLoading } = useQuery({
    queryKey: ["answer", id],
    queryFn: async () => {
      const res = await api.get(`/api/answer/${id}`);
      return res.data.answer;
    },
  });

  if (!answer) {
    return <LoadingDisplay>Please wait...</LoadingDisplay>;
  }

  return (
    <div className="flex flex-col py-2 w-full justify-start items-start gap-8">
      <AnswerCard
        showModifyAuthenticityButton
        getAnswer={getAnswer}
        showRedirectToSurvey
        answer={answer}
      />
      {answer?.survey?.user === user?._id && (
        <ArrowButton to={`/answer/s/${answer.survey?._id}`}>
          View in Survey Center
        </ArrowButton>
      )}
    </div>
  );
};

export default ViewAnswer;
