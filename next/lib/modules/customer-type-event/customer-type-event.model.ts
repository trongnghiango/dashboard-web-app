import { BaseModel } from "../../models/base-model.model";

export type CreateCustomerTypeEventInput = {
  customerId: string;
  typeEventId: string;
  amountAther: number;
};

export enum CustomerTypeEventArgNames {
  customerId = "customerId",
  typeEventId = "typeEventId",
  amountAther = "amountAther",
}

export enum CustomerTypeEventArgs {
  customerId = "customerId",
  typeEventId = "typeEventId",
  amountAther = "amountAther",
}

export interface CustomerTypeEvent extends BaseModel {
  customerId?: string;
  typeEventId?: string;
  amountAther?: number;
}

export const TypeEventInitialValues: CreateCustomerTypeEventInput = {
  customerId: "",
  typeEventId: "",
  amountAther: 0,
};
