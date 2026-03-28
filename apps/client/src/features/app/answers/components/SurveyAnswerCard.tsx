import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserBadge } from "@/components/ui/UserBadge";
import type { QuestionWithAnswers, UserDTO } from "@inquestia/types";
import { Button } from "@/components/ui/button";
import { useAnswerActions } from "../hooks/useAnswerActions";
import { useState } from "react";
import { toast } from "sonner";

export const SurveyAnswerCard = ({
  answer,
  user,
}: {
  answer: QuestionWithAnswers;
  user: UserDTO;
}) => {
  const { toggleAnswerAuthenticity, isTogglingAuthenticity } =
    useAnswerActions();
  const [ans, setAns] = useState(answer);

  const handleToggle = async () => {
    try {
      await toggleAnswerAuthenticity(answer._id);
      setAns((prev) => ({
        ...prev,
        isAuthentic: !prev.isAuthentic,
      }));
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };
  const userBadgeProps = {
    user,
    displayBadge: true,
  };

  return (
    <Card>
      <CardHeader>
        <div className="mb-2">
           <UserBadge
              user={user}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <UserBadge.Avatar className="size-10" />
                <div className="flex flex-col ">
                  <UserBadge.Nickname className="font-semibold lg:text-lg" />
                  <UserBadge.Username className="lg:text-base" />
                </div>
                <UserBadge.Badge />
              </div>
            </UserBadge>
        </div>
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
                            "rounded-lg inquestia-button  outline outline-white/40"
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
        <Button className={`${ ans.isAuthentic &&'inquestia-button' }`} variant={'outline'} onClick={handleToggle}>
          {ans.isAuthentic ? "Authentic" : "Not authentic"}
        </Button>
      </CardFooter>
    </Card>
  );
};
