import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useAccount } from "../../account/hooks/useAccount";

export type ConversationMessage = {
  content: string;
  username: string;
  role: "user" | "assistant";
};

const MyCard = ({ message }: { message: ConversationMessage }) => {
  const { data: user } = useAccount();

  return (
    <div className="flex w-full justify-end">
      <div className="space-y-1">
        <p className="chat-name text-right">{user?.username}</p>
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
  return (
    <div className="w-full  space-y-4">
      {conversation.length > 0 &&
        conversation.map((msg, index) =>
          msg.role === "user" ? (
            <MyCard key={`${index}.user`} message={msg} />
          ) : (
            <SystemCard key={`${index}.system`} message={msg} />
          )
        )}
    </div>
  );
};
