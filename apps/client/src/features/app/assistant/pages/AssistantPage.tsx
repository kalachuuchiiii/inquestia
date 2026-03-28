
import { CiPaperplane } from "react-icons/ci";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import useAssistant from "@/features/app/assistant/hooks/useAssistant";
import { useAppSelector } from "@/hooks/useAppSelector";
import { PROMPT_MAX } from "@inquestia/constants";
import { RestartConversationOption } from "@/features/app/assistant/components/RestartConversationOption";
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ConversationMap } from "@/features/app/assistant/components/ConversationMap";
import { CgHello } from "react-icons/cg";

const AssistantPage = () => {
  const { user } = useAppSelector((state) => state.user);

  const {
    conversation,
    sendMessage,
    prompt,
    bottomRef,
    setPrompt,
    isSendingMessage,
    isFetchingConversation,
    isRestartingConversation,
    handleOnKeyEnter,
  } = useAssistant();

  const name = user.nickname ?? user.username;

  return (
    <div>
   
   
      <div className="flex flex-col  outline rounded-xl oveflow-hidden p-2 justify-between shadow-md relative   rounded-xl mx-auto md:w-full flex-col md:my-10 ">
        <header className="p-4 flex justify-between  items-center border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <RestartConversationOption />
            <span>Hello, {name}!</span>
          </div>
        </header>
        <main className="h-100 overflow-y-auto p-6 space-y-4">
          {conversation.length > 0 ? (
            <ConversationMap conversation={conversation} />
          ) : (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center h-full text-zinc-500 dark:text-zinc-400"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="mb-4 p-6 rounded-full dark:inquestia-bg-dark inquestia-bg"
              >
                <FaRobot size={50} className="text-white drop-shadow-lg" />
              </motion.div>
              <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100 mb-2">
                Meet Inko 🤖
              </h2>
              <p className="text-sm opacity-70 max-w-sm">
                Start chatting to get insights, tips, or help navigating the
                platform.
              </p>
            </motion.div>
          )}

          {isSendingMessage && (
            <p className="opacity-50 text-xs animate-pulse">
              Inko is thinking...
            </p>
          )}
          <div ref={bottomRef}></div>
        </main>

        {/* Chat input */}
        <footer className="pt-6">
          <div className="flex items-end gap-2">
            <InputGroup className="w-full">
              <InputGroupTextarea
                placeholder="Chat with Inko..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                maxLength={PROMPT_MAX}
                rows={1}
                onKeyDown={handleOnKeyEnter}
              />

              <InputGroupButton
                disabled={
                  !prompt ||
                  isSendingMessage ||
                  isFetchingConversation ||
                  isRestartingConversation
                }
                onClick={() => sendMessage(prompt)}
              >
                <CiPaperplane className="size-8" />
              </InputGroupButton>
            </InputGroup>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AssistantPage;
