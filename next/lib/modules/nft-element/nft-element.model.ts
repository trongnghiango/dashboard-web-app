import { BaseModel } from "../../models/base-model.model";

export type CreateNftElementInput = {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
};

export type UpdateNftElementInput = {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
};

export enum NftElementArgNames {
  name = "Name",
  description = "Description",
  color = "Color",
  image = "Image",
}

export enum NftElementArgs {
  name = "name",
  description = "description",
  color = "color",
  image = "image",
}

export interface NftElement extends BaseModel {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
}

export const NftElementInitialValues: CreateNftElementInput = {
  name: "",
  description: "",
  color: "",
  image: "",
};
