import { BaseModel } from "../../models/base-model.model";

export type CreateMemberTransactionInput = {
    name?: string;
}

export type UpdateMemberTransactionInput = {
    name?: string;
}

export enum MemberTransactionArgNames {
    name = "Name",
}

export enum MemberTransactionArgs {
    name = "name",
}

export interface MemberTransaction extends BaseModel {
    name?: string;
}

export const MemberTransactionInitialValues: CreateMemberTransactionInput = {
    name: "",
}