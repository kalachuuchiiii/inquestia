import { useEffect, useRef, useState } from "react";
import { CiPaperplane } from "react-icons/ci";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import useAssistant from "@/features/app/assistant/hooks/useAssistant";
import { PROMPT_MAX } from "@inquestia/constants";
import { RestartConversationOption } from "./RestartConversationOption";
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "../../../../components/ui/input-group";
import { ConversationMap } from "@/features/app/assistant/components/ConversationMap";
import { verticalOpening } from "@/lib/variants";

const AssistantWidget = () => {
  const { user } = useAppSelector((state) => state.user);

  const {
    conversation,
    sendMessage,
    bottomRef,
    isRestartingConversation,
    isFetchingConversation,
    isSendingMessage,
    prompt,
    setPrompt,
    handleOnKeyEnter,
  } = useAssistant();

  const name = user.displayName.split(" ")[0];

  return (
    <motion.div
      variants={verticalOpening}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className=" outline-2 rounded-xl outline-offset-2 "
    >
      <div className=" overflow-hidden z-50  rounded-2xl flex flex-col justify-between  bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md">
        <nav className="p-4 bg-blue-50/60 dark:bg-zinc-900/70 flex justify-between rounded-t-xl items-center border-b border-zinc-200 dark:border-zinc-800">
          <div className="text-xl flex  items-center font-semibold ">
            <RestartConversationOption />

            <p>Hello, {name}!</p>
          </div>
          <Link to="/inko">
            <FaRobot className="text-zinc-500 dark:text-zinc-400" />
          </Link>
        </nav>
        <div className={`overflow-y-auto h-68 px-6 py-4 space-y-3`}>
          <ConversationMap conversation={conversation} />
          {isSendingMessage && (
            <p className="opacity-50 text-xs animate-pulse duration-200">
              Inko is thinking...
            </p>
          )}
       

        </div>
        <div className="flex w-full bg-blue-50/60 dark:bg-zinc-900/70 p-3 rounded-t-xl items-end border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-end w-full gap-2">
            <InputGroup className="w-full">
              <InputGroupTextarea
                placeholder="Chat with Inko..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                maxLength={PROMPT_MAX}
                onKeyDown={handleOnKeyEnter}
                rows={1}
              />

              <InputGroupButton
                disabled={
                  isSendingMessage ||
                  !prompt ||
                  isFetchingConversation ||
                  isRestartingConversation
                }
                onClick={() => sendMessage(prompt)}
              >
                <CiPaperplane className="size-6" />
              </InputGroupButton>
            </InputGroup>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssistantWidget;
