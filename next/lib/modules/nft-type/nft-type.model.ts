import { BaseModel } from "../../models/base-model.model";

export type CreateNftTypeInput = {
  name?: string;
  description: string;
  color: string;
  image: string;
};

export type UpdateNftTypeInput = {
  name?: string;
  description: string;
  color: string;
  image: string;
};

export enum NftTypeArgNames {
  name = "Name",
  description = "Description",
  color = "Color",
  image = "Image",
}

export enum NftTypeArgs {
  name = "name",
  description = "description",
  color = "color",
  image = "image",
}

export interface NftType extends BaseModel {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
  status?: string;
}

export const NftTypeInitialValues: CreateNftTypeInput = {
  name: "",
  description: "",
  color: "",
  image: "",
};
