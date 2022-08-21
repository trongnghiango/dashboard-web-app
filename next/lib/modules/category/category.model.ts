import { BaseModel } from "../../models/base-model.model";

export type CreateCategoryInput = {
  name?: string;
  slug?: string;
  description?: string;
};

export type UpdateCategoryInput = {
  name?: string;
  slug?: string;
  description?: string;
};

export enum CategoryArgNames {
  name = "Name",
  slug = "Slug",
  description = "Description",
}

export enum CategoryArgs {
  name = "name",
  slug = "slug",
  description = "description",
}

export interface Category extends BaseModel {
  name?: string;
  slug?: string;
  description?: string;
}

export const CategoryInitialValues: CreateCategoryInput = {
  name: "",
  slug: "",
  description: "",
};
