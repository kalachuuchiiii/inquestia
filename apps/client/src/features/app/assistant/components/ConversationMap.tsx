import type { ConversationMessage, Role } from "@inquestia/types";
import { motion } from "framer-motion";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { FaRobot } from "react-icons/fa";
import { useAppSelector } from "@/hooks/useAppSelector";

const MyCard = ({ message }: { message: ConversationMessage }) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="flex w-full justify-end">
      <div className="space-y-1">
        <p className="chat-name text-right">
          {user.username}
        </p>
        <div className=" overflow-x-auto px-4 py-2 rounded-2xl text-sm lg:text-base ml-auto  w-fit  shadow-sm bg-neutral-100  text-zinc-900">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const SystemCard = ({ message }: { message: ConversationMessage }) => {
  return (
    <div className="flex  w-full overflow-x-auto  justify-start">
      <div className="space-y-1">
        <p className="chat-name">Inko</p>
        <div
          className=" outline rounded-xl m-2  overflow-x-auto px-4 py-2 rounded-2xl text-sm lg:text-base shadow-sm 
            bg-zinc-200  dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export const ConversationMap = ({
  conversation,
}: {
  conversation: ConversationMessage[];
}) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="w-full  space-y-4">
      {conversation.length > 0 ? (
        conversation.map((msg, index) =>
          msg.role === "user" ? (
            <MyCard key={`${index}.user`} message={msg} />
          ) : (
            <SystemCard key={`${index}.system`} message={msg} />
          )
        )
      ) : (
        // 🦄 Hero state
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center  text-center text-zinc-500 dark:text-zinc-400 select-none"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="mb-4 p-4 rounded-full dark:inquestia-bg-dark inquestia-bg"
          >
            <FaRobot size={40} className="text-white drop-shadow-lg" />
          </motion.div>
          <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100 mb-2">
            Meet Inko 🤖
          </h2>
          <p className="text-sm opacity-70 max-w-xs">
            Start chatting to get insights, tips, or help navigating the
            platform.
          </p>
        </motion.div>
      )}
    </div>
  );
};
