import { BaseModel } from "../../models/base-model.model";

export type CreateTypeEventInput = {
  name: string;
  code: string;
  startDate: Date;
  percentFirst: number;
  percentClaim: number;
  periodCliff: number;
  ratioUSD: number;
};

export type UpdateTypeEventInput = {
  name: string;
  startDate: Date;
  percentFirst: number;
  percentClaim: number;
  periodCliff: number;
  ratioUSD: number;
};

export enum TypeEventArgNames {
  name = "Name",
  code = "Code",
  startDate = "Start Date",
  percentFirst = "% First",
  percentClaim = "% Claim",
  periodCliff = "Period Cliff",
  ratioUSD = "Ratio USD",
}

export enum TypeEventArgs {
  name = "name",
  code = "code",
  startDate = "startDate",
  percentFirst = "percentFirst",
  percentClaim = "percentClaim",
  periodCliff = "periodCliff",
  ratioUSD = "ratioUSD",
}

export interface TypeEvent extends BaseModel {
  name?: string; //vip1 , binh thuong
  code?: string; //VIP1 , VIP2 , NORMAL , ....
  startDate?: Date; // thời gian bắt đầu claim
  percentFirst?: number; // tỉ lệ claim lần đầu
  percentClaim?: number; // tỉ lệ claim
  periodCliff?: number; // khoảng cách thời gian claim tiếp theo
  ratioUSD?: number; //VIP1:0.5 , VIP2:1
}

export const TypeEventInitialValues: CreateTypeEventInput = {
  name: "",
  code: "",
  startDate: new Date(),
  percentFirst: 0,
  percentClaim: 0,
  periodCliff: 0,
  ratioUSD: 0,
};
