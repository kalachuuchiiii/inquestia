import { NOTIFICATION_ACTION_ENUM } from "@shared/constants";
import { Document, HydratedDocument, Types } from "mongoose";


export type NotificationSchema = Document & {
    receiver: Types.ObjectId;
    sender: Types.ObjectId;
    action: typeof NOTIFICATION_ACTION_ENUM[number];
    resourceId: Types.ObjectId;
    isRead: boolean;
}

export type NotificationModel = HydratedDocument<NotificationSchema>;