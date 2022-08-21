import { BaseModel } from "../../models/base-model.model";

export type CreateNftCategoryInput = {
  name?: string;
  description: string;
  color: string;
  image: string;
};

export type UpdateNftCategoryInput = {
  name?: string;
  description: string;
  color: string;
  image: string;
};

export enum NftCategoryArgNames {
  name = "Name",
  description = "Description",
  color = "Color",
  image = "Image",
}

export enum NftCategoryArgs {
  name = "name",
  description = "description",
  color = "color",
  image = "image",
}

export interface NftCategory extends BaseModel {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
}

export const NftCategoryInitialValues: CreateNftCategoryInput = {
  name: "",
  description: "",
  color: "",
  image: "",
};
