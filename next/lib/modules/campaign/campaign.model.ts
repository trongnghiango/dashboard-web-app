import { BaseModel } from "../../models/base-model.model";

export enum CampaignStatus {
  DRAFT = "DRAFT", // mới tạo, chưa publish
  OPENED = "OPENED", //đã publish, đang chờ tới thời điểm startDate
  PENDING = "PENDING", //đang diễn ra có thể mua token
  DONE = "DONE", //kết thúc chiến dịch
}

export const campaignStatusData = [
  {
    name: "Draft",
    value: CampaignStatus.DRAFT,
  },
  {
    name: "Pending",
    value: CampaignStatus.PENDING,
  },
  {
    name: "Opened",
    value: CampaignStatus.OPENED,
  },
  {
    name: "Done",
    value: CampaignStatus.DONE,
  },
];

export type CreateCampaignInput = {
  name: string;
  startDate: Date;
  endDate: Date;
  ratioBNB: number;
  maxTokenLimit: number;
  minimumPurchaseAtherAmount: number;
  maximumPurchaseAtherAmount: number;
  priority: number;
};

export type UpdateCampaignInput = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  ratioBNB?: number;
  maxTokenLimit?: number;
  minimumPurchaseAtherAmount?: number;
  maximumPurchaseAtherAmount?: number;
  priority?: number;
  status?: string;
  is100PercentProgress?: boolean;
};

export enum CampaignArgNames {
  name = "Name",
  startDate = "Start Date",
  endDate = "End Date",
  ratioBNB = "Ratio BNB",
  maxTokenLimit = "Max Ather",
  minimumPurchaseAtherAmount = "Min Ather Amount",
  maximumPurchaseAtherAmount = "Max Ather Amount",
  priority = "Priority",
  status = "Status",
  is100PercentProgress = "100% ?",
  totalAtherAmount = "Ather",
}

export enum CampaignArgs {
  name = "name",
  startDate = "startDate",
  endDate = "endDate",
  ratioBNB = "ratioBNB",
  minimumPurchaseAtherAmount = "minimumPurchaseAtherAmount",
  maximumPurchaseAtherAmount = "maximumPurchaseAtherAmount",
  maxTokenLimit = "maxTokenLimit",
  priority = "priority",
  status = "status",
  is100PercentProgress = "is100PercentProgress",
  totalAtherAmount = "totalAtherAmount",
}

export interface Campaign extends BaseModel {
  name?: string;
  startDate?: Date;
  endDate?: Date;
  ratioBNB?: number;
  maxTokenLimit?: number;
  minimumPurchaseAtherAmount?: number;
  maximumPurchaseAtherAmount?: number;
  priority?: number;
  status?: string;
  is100PercentProgress?: boolean;
  totalAtherAmount?: number;
}

export const CampaignInitialValues: CreateCampaignInput = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  ratioBNB: 0,
  maxTokenLimit: 0,
  minimumPurchaseAtherAmount: 0,
  maximumPurchaseAtherAmount: 0,
  priority: 0,
};
