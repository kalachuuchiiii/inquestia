export type SendMessageResponse = {
    responseContent: string;
    success: boolean;
};
export type ConversationMessage = {
    role: "user" | "system";
    content: string;
};
export type GetConversationResponse = {
    success: boolean;
    conversation: ConversationMessage[];
};
