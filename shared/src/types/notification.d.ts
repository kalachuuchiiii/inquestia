import { Types } from "mongoose";
import { NOTIFICATION_ACTION_ENUM } from "@shared/constants";

export type NotificationAction = (typeof NOTIFICATION_ACTION_ENUM)[number];

export interface INotification {
  _id: Types.ObjectId;

  receiver: Types.ObjectId;  
  sender: Types.ObjectId;   

  action: NotificationAction;
  resourceId: Types.ObjectId; 

  isRead: boolean;

  createdAt: Date;
  updatedAt: Date;
}
