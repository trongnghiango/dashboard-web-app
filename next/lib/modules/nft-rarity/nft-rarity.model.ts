import { BaseModel } from "../../models/base-model.model";

export type CreateNftRarityInput = {
  name?: string;
  description: string;
  color: string;
  image: string;
};

export type UpdateNftRarityInput = {
  name?: string;
  description: string;
  color: string;
  image: string;
};

export enum NftRarityArgNames {
  name = "Name",
  description = "Description",
  color = "Color",
  image = "Image",
}

export enum NftRarityArgs {
  name = "name",
  description = "description",
  color = "color",
  image = "image",
}

export interface NftRarity extends BaseModel {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
}

export const NftRarityInitialValues: CreateNftRarityInput = {
  name: "",
  description: "",
  color: "",
  image: "",
};
