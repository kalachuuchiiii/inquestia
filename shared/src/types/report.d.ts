import { Types } from "mongoose";
import { GENERAL_REASONS } from "@shared/constants";

export type GeneralReason = (typeof GENERAL_REASONS)[number];

export interface ReportedEntity {
  entityId: Types.ObjectId;
  entity: "User" | "Survey";
}

export interface IReport {
  _id: Types.ObjectId;

  specificReason: string;
  generalReason: GeneralReason;

  reportedEntity: ReportedEntity;

  entityOwner: Types.ObjectId;
  reportedBy: Types.ObjectId;    

  isResolved: boolean;
  resolveAction?: string;

  createdAt: Date;
  updatedAt: Date;
}
