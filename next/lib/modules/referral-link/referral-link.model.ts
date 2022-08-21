import { BaseModel } from "../../models/base-model.model";

export type CreateReferralLinkInput = {
    name?: string;
}

export type UpdateReferralLinkInput = {
    name?: string;
}

export enum ReferralLinkArgNames {
    name = "Name",
}

export enum ReferralLinkArgs {
    name = "name",
}

export interface ReferralLink extends BaseModel {
    name?: string;
}

export const ReferralLinkInitialValues: CreateReferralLinkInput = {
    name: "",
}