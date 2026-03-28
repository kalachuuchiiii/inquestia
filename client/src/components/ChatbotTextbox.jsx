import React, { useEffect, useRef } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { CiPaperplane } from "react-icons/ci";
import { useSelector } from "react-redux";
import Textarea from "./html/Textarea";
import Button from "./html/Button";
import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { FaRobot } from "react-icons/fa6";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import useChatbot from "../hooks/useChatbot";
import { Link } from "react-router-dom";

const ChatbotTextbox = () => {
  const { user } = useSelector((state) => state.user);
    const bottomRef = useRef(null)
 const { conversation, message, getConversation, setConversation, setMessage, sendMessage, isLoading, refreshConversation} = useChatbot(true);

  useEffect(() => {
      if(bottomRef?.current){
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, [conversation])

  const name = user?.nickname
    ? user.nickname.split(" ")[0]
    : user?.username
    ? user.username.split(" ")[0]
    : "Guest";

    useEffect(() => {
        if(window.location.pathname === '/chatbot'){
        setConversation([]) 
        return;
      }
        getConversation();
    }, [])

    useEffect(() => {
      if(window.location.pathname === '/chatbot'){
        setConversation([])
      }
    }, [window.location.pathname])

    const names = {
      system: 'Inko',
      user: name
    };

    

  return (
    <div className="w-full bottom-0">
      <div className="overflow-hidden p-1 rounded-b-lg outline outline-black/20 dark:outline-white/20 rounded-t-2xl flex flex-col justify-between  bg-white/50 dark:bg-zinc-950/60 backdrop-blur-md">
        {/* Header */}
        <nav className="p-4 bg-blue-50/60 dark:bg-zinc-900/70 flex justify-between rounded-t-xl items-center border-b border-zinc-200 dark:border-zinc-800">
          <div className="text-xl flex gap-2 items-center font-semibold text-gradient">
            {window.location.pathname !== "/chatbot" && (
              <button onClick={refreshConversation}>
                <GoPlus size={25} className="text-blue-600" />
              </button>
            )}
            <p>Hello, {name}!</p>
          </div>
          <Link to="/chatbot">
            <BsChevronCompactRight className="text-zinc-500 dark:text-zinc-400" />
          </Link>
        </nav>

        {/* Chat area */}
        <div
          className={`overflow-y-auto h-68 px-6 py-4 space-y-3`}
        >
          {conversation.length > 0 ? (
            conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] overflow-x-auto px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  <p>{names[msg.role]}</p>
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
          {isLoading && (
            <p className="opacity-50 text-xs animate-pulse duration-200">
              Inko is thinking...
            </p>
          )}
          <div ref={bottomRef}></div>
        </div>

        {/* Chatbox */}
        {window.location.pathname === "/chatbot" ? (
          <div />
        ) : (
          <div className="flex w-full bg-blue-50/60 dark:bg-zinc-900/70 p-3 rounded-t-xl items-end border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-end w-full gap-2">
              <div className="w-full">
                <Textarea
                  placeholder="Chat with Inko..."
                  value={message}
                  className=""
                  onChange={(e) => setMessage(e.target.value)}
                  displayLimit={false}
                  limit={1000}
                  rows={1}
                />
              </div>
              <div>
                <Button disabled = {isLoading || !message} loadingState = {isLoading} className="" onClick={sendMessage}>
                  <CiPaperplane size={20} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotTextbox;
