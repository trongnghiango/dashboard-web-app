import { BaseModel } from "../../models/base-model.model";
import { Customer } from "../customer/customer.model";

export enum SupportStatus {
  NEW = "NEW", // moi tao
  PENDING = "PENDING", // cho ho tro
  DONE = "DONE", // ho tro thanh cong
  REJECT = "REJECT", // tu cho ho tro
}

export enum SupportTypes {
  BUY_TOKEN = "BUY_TOKEN",
  CLAIM_TOKEN = "CLAIM_TOKEN",
  AIRDROP = "AIRDROP",
  LIST_NFT = "LIST_NFT",
}

export const supportTypesData = [
  {
    name: "Buy token",
    value: SupportTypes.BUY_TOKEN,
  },
  {
    name: "Claim token",
    value: SupportTypes.CLAIM_TOKEN,
  },
  {
    name: "Airdrop",
    value: SupportTypes.AIRDROP,
  },
  {
    name: "List nft",
    value: SupportTypes.LIST_NFT,
  },
];


export const supportStatusData = [
  {
    name: "New",
    value: SupportStatus.NEW,
  },
  {
    name: "Pending",
    value: SupportStatus.PENDING,
  },
  {
    name: "Done",
    value: SupportStatus.DONE,
  },
  {
    name: "Reject",
    value: SupportStatus.REJECT,
  },
];

export type CreateSupportInput = {
  transactionHash?: string;
  blockNumber?: string;
  content?: string;
  amountAther?: number;
  nftId?: string;
  type?: SupportTypes;
};

export enum SupportArgNames {
  transactionHash = "Transaction Hash",
  blockNumber = "Block Number",
  amountAther = "Amount Ather",
  content = "Content",
  reason = "Reason",
  status = "Status",
  type = "Type",
  nftId="Nft Id",
  customer = "Customer",
}

export enum SupportArgs {
  transactionHash = "transactionHash",
  blockNumber = "blockNumber",
  amountAther = "amountAther",
  content = "content",
  reason = "reason",
  status = "status",
  type = "type",
  nftId="nftId",
  customerId = "customerId",
}

export interface Support extends BaseModel {
  transactionHash?: string;
  blockNumber?: string;
  amountAther?: number;
  content?: string;
  reason?: string;
  type?: string;
  nftId?: string;
  status?: SupportStatus;
  campaignId?: string;
  customerId?: string;
  customer?: Customer;
}

export const SupportInitialValues: CreateSupportInput = {
  transactionHash: "",
  blockNumber: "",
  content: "",
  amountAther: 0,
  nftId: "",
  type: SupportTypes.AIRDROP,
};
