import  { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Button } from "../../components/ui/button";
import { CiPaperplane } from "react-icons/ci";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import useAssistant from "@/hooks/useAssistant";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Textarea } from "@/components/ui/textarea";
import { PROMPT_MAX } from "@shared/constants";
import { RestartConversationOption } from "@/components/RestartConversationOption";
import { InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";

const AssistantPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");

  const {
    conversation,
    sendMessage,
    isSendingMessage,
    isFetchingConversation,
    isRestartingConversation,
    restartConversation,
  } = useAssistant();

  // Scroll to bottom when conversation updates
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const name = user.nickname ?? user.username;
  const names = { system: "Inko", user: name };

  return (
    <div className="flex shadow-md  rounded-xl mx-auto md:w-full flex-col md:my-10  bg-gradient-to-b from-blue-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}

      <header className="p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 text-xl font-semibold">
           <RestartConversationOption />
          <span className="text-gradient">Hello, {name}!</span>
        </div>
      </header>

      {/* Chat area */}
      <main className="md:h-100 h-80   overflow-y-auto p-6 space-y-4">
        {conversation.length > 0 ? (
          conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                }`}
              >
                <p className="text-xs font-semibold opacity-70 mb-1">
                  {names[msg.role]}
                </p>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
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
      <footer className="p-4 bg-white/80  dark:bg-zinc-900/70 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-end gap-2">
          <InputGroupAddon  className="w-full">
            <InputGroupTextarea
              placeholder="Chat with Inko..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={PROMPT_MAX}
              rows={1}
              className="flex-1"
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
          </InputGroupAddon>
        </div>
      </footer>
    </div>
  );
};

export default AssistantPage;
