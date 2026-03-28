import type { ConversationMessage } from "@inquestia/types";
import { BaseStore } from "./BaseStore";


export class ConversationStore extends BaseStore<{
  createdAt: Date;
  conversation: ConversationMessage[];
}> {
  constructor() {
    super("3d", "1d");
  }
}

export const conversationStore = new ConversationStore();
