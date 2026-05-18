import { CiPaperplane } from "react-icons/ci";

import useAssistant from "@/features/app/assistant/hooks/useAssistant";
import { PROMPT_MAX } from "@inquestia/constants";
import { RestartConversationOption } from "@/features/app/assistant/components/RestartConversationOption";
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ConversationMap } from "@/features/app/assistant/components/ConversationMap";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAccount } from "../../account/hooks/useAccount";

const AssistantPage = () => {
  const { data: user } = useAccount();

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

  const name = user?.nickname || user?.username;

  return (
    <div className="relative">
      <div className="flex flex-col rounded-xl pb-2 justify-between  relative   mx-auto  flex-col ">
        <header className="p-4 flex sticky top-0 justify-between dark:bg-zinc-950 w-full left-0">
          <div className="flex items-center z-50 gap-2 text-xl font-semibold">
            <RestartConversationOption />
            <span>Hello, {name}!</span>
          </div>
        </header>
        <Separator />
        <main>
          {conversation.length > 0 ? (
            <ConversationMap conversation={conversation} />
          ) : (
            // Empty state
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <img src="/inka.gif" />
                </EmptyMedia>
                <EmptyTitle className="font-bold">Meet Inka</EmptyTitle>
                <EmptyDescription>
                  Start chatting to get insights, tips, or help navigating the
                  platform.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          {isSendingMessage && (
            <p className="opacity-50 text-xs animate-pulse">
              Inko is thinking...
            </p>
          )}
          <div ref={bottomRef}></div>
        </main>

        <footer className="pt-6  fixed w-full max-w-[720px] bottom-6  ">
          <div className="flex items-end gap-2">
            <InputGroup className="w-full dark:bg-zinc-900">
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
                className="mx-3"
                onClick={() => sendMessage(prompt)}
              >
                <CiPaperplane className="size-6" />
              </InputGroupButton>
            </InputGroup>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AssistantPage;
