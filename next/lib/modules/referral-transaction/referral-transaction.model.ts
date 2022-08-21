import { BaseModel } from "../../models/base-model.model";
import { Customer } from "../customer/customer.model";

export enum ReferralTransactionStatus {
  PENDING = "PENDING",
  DONE = "DONE", // blockchain xu ly xong
}

export type CreateReferralTransactionInput = {
  name?: string;
};

export type UpdateReferralTransactionInput = {
  name?: string;
};

export enum ReferralTransactionArgNames {
    amountAther = "Amount ather",
    status = "Status",
    customerId = "Customer Id",
    transactionId = "Transaction Id",
    customer = "Customer",
}

export enum ReferralTransactionArgs {
  amountAther = "amountAther",
  status = "status",
  customerId = "customerId",
  transactionId = "transactionId",
  customer = "customer",
}

export interface ReferralTransaction extends BaseModel {
  amountAther?: number;
  status?: ReferralTransactionStatus;
  customerId?: string;
  transactionId?: string;
  customer?: Customer
}

export const ReferralTransactionInitialValues: CreateReferralTransactionInput = {
  name: "",
};
