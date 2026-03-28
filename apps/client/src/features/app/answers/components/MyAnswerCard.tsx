import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserBadge } from "@/components/ui/UserBadge";
import type { QuestionWithAnswers, UserDTO } from "@inquestia/types";
import { Link } from "react-router-dom";

export const AnswerCard = ({ answer }: { answer: QuestionWithAnswers }) => {


  return (
    <Card>
      <CardHeader>
        <div className="mb-2">
           <UserBadge
              user={answer.survey.author as UserDTO}
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
        </div>

        <CardTitle>{answer.title}</CardTitle>
        <CardDescription>{answer.description}</CardDescription>
      </CardHeader>
      <div className="space-y-3 px-2">
        {answer.questions.map((q, idx) =>
          q?.type === "text" ? (
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>
                    {idx + 1}). {q.question}
                  </CardTitle>
                  <CardDescription>Open-ended question</CardDescription>
                </div>
                <div className="p-2 bg-muted outline rounded-lg  opacity-80">
                  {q.answer}
                </div>
              </CardHeader>
            </Card>
          ) : (
            q?.type === "select" && (
              <Card>
                <div>
                  <CardHeader>
                    <div>
                      <CardTitle>
                        {idx + 1}). {q.question}
                      </CardTitle>
                      <CardDescription>Choice-based question</CardDescription>
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
          )
        )}
      </div>
      <CardFooter className="flex items-center justify-end">
        <Link to={`/survey/published/${answer.survey._id}`}>
          <Button className="inquestia-button">View Survey</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
