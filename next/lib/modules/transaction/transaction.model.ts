import { BaseModel } from "../../models/base-model.model";

export enum TransactionStatus {
  PENDING = "PENDING", // chờ blockchain xu lý
  DONE = "DONE", // blockchain xu ly xong
}

export type UpdateTransactionInput = {
  name?: string;
};

export enum TransactionArgNames {
  transactionHash = "Transaction Hash",
  address = "Address",
  amountBNB = "Amount BNB",
  amountAther = "Amount Ather",
  ratioBNB = "ratio BNB",
  percentPaid = "% Paid",
  status = "Status",
  blockId = "Block Id",
  customerId = "Customer Id",
  campaignId = "Campaign Id",
  broadcastedAll = "Broadcasted All",
}

export enum TransactionArgs {
  transactionHash = "transactionHash",
  address = "address",
  amountBNB = "amountBNB",
  amountAther = "amountAther",
  ratioBNB = "ratioBNB",
  percentPaid = "percentPaid",
  status = "status",
  blockId = "blockId",
  customerId = "customerId",
  campaignId = "campaignId",
  broadcastedAll = "broadcastedAll",
}

export interface Transaction extends BaseModel {
  transactionHash?: string;
  address?: string;
  amountBNB?: number;
  amountAther?: number;
  ratioBNB?: number;
  percentPaid?: number;
  status?: string;
  blockId?: number;
  customerId?: string;
  campaignId?: string;
  broadcastedAll?: boolean;
}
