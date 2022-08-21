import { BaseModel } from "../../models/base-model.model";

export type CreateNftHabitantInput = {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
};

export type UpdateNftHabitantInput = {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
};

export enum NftHabitantArgNames {
  name = "Name",
  description = "Description",
  color = "Color",
  image = "Image",
}

export enum NftHabitantArgs {
  name = "name",
  description = "description",
  color = "color",
  image = "image",
}

export interface NftHabitant extends BaseModel {
  name?: string;
  description?: string;
  color?: string;
  image?: string;
}

export const NftHabitantInitialValues: CreateNftHabitantInput = {
  name: "",
  description: "",
  color: "",
  image: "",
};
