import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UserBadge } from "@/components/ui/UserBadge";
import type { Answer } from "@inquestia/schemas";

import { Link } from "react-router-dom";

export const AnswerCard = ({ answer }: { answer: Answer }) => {
  const getQuestion = (questionId: string) => {
    return answer.survey?.questions.find((q) => q._id === questionId)?.question;
  };
  return (
    <Card className="bg-">
      <CardHeader>
        <div className="mb-2">
          {answer.respondent && !answer.isAnonymous ? (
            <UserBadge
              user={answer.respondent}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <UserBadge.Avatar className="size-10" />
                <div className="flex flex-col ">
                  <UserBadge.Nickname className="font-semibold lg:text-lg" />
                  <UserBadge.Username className="lg:text-base" />
                </div>
              </div>
            </UserBadge>
          ) : (
            <p className="opacity-50">Anonymous participant</p>
          )}
        </div>

        <div className="my-2">
          <h1 className="lg:text-3xl tracking-tighter font-bold leading-6">
            {answer.survey?.title}
          </h1>
          <p className="lg:text-lg opacity-75 ">{answer.survey?.description}</p>
        </div>
      </CardHeader>
      <Carousel className="space-y-3 px-2">
        <CarouselNext />
        <CarouselPrevious />
        <CarouselContent>
          {answer.responses.map((q, idx) => (
            <CarouselItem key={q.questionId}>
              {q?.type === "open_ended" ? (
                <Card className="bg-">
                  <CardHeader>
                    <div>
                      <CardTitle>
                        {idx + 1}). {getQuestion(q.questionId)}
                      </CardTitle>
                      <CardDescription>Open-ended question</CardDescription>
                    </div>
                    <div className="p-2 bg-muted outline rounded-lg  opacity-80">
                      {q.answer}
                    </div>
                  </CardHeader>
                </Card>
              ) : (
                q?.type === "close_ended" && (
                  <Card className="bg-0">
                    <div>
                      <CardHeader>
                        <div>
                          <CardTitle>
                            {idx + 1}). {getQuestion(q.questionId)}
                          </CardTitle>
                          <CardDescription>
                            Choice-based question
                          </CardDescription>
                        </div>
                        <div className="space-y-2">
                          {q.choices.map((c) => (
                            <div
                              className={`${
                                q.answers.includes(c) &&
                                "rounded-lg  outline outline-white/40"
                              } py-1.5 px-3`}
                            >
                              {c}
                            </div>
                          ))}
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                )
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <CardFooter className="flex items-center justify-end">
        <Link to={`/survey/published/${answer.survey?._id}`}>
          <Button className="inquestia-button">View Survey</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
