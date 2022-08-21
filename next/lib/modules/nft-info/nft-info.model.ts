import { BaseModel } from "../../models/base-model.model";
import { NftCategory } from "../nft-category/nft-category.model";
import { NftElement } from "../nft-element/nft-element.model";
import { NftHabitant } from "../nft-habitant/nft-habitant.model";
import { NftRarity } from "../nft-rarity/nft-rarity.model";
import { NftType } from "../nft-type/nft-type.model";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum NftInfoStatus {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE",
}

export type CreateNftInfoInput = {
  name?: string;
  description?: string;
  funfact?: string;
  birthDay?: Date;
  gender?: Genders;

  mediaUrl?: string;

  bodyEyes?: string;
  bodySkintone?: string;
  bodyEars?: string;
  bodyClaws?: string;
  bodyAura?: string;
  bodyTatoo?: string;

  nftCategoryId?: string; // danh mục
  nftElementId?: string; // thuộc tính
  nftHabitantId?: string; // môi trường sống
  nftRarityId?: string; // độ hiếm
  nftTypeId?: string; // loai nft
};

export type UpdateNftInfoInput = {
  name?: string;
  description?: string;
  funfact?: string;
  birthDay?: Date;
  gender?: Genders;

  mediaUrl?: string;

  bodyEyes?: string;
  bodySkintone?: string;
  bodyEars?: string;
  bodyClaws?: string;
  bodyAura?: string;
  bodyTatoo?: string;

  nftCategoryId?: string; // danh mục
  nftElementId?: string; // thuộc tính
  nftHabitantId?: string; // môi trường sống
  nftRarityId?: string; // độ hiếm
  nftTypeId?: string; // loai nft
};

export enum NftInfoArgNames {
  name = "Name",
  description = "Description",
  funfact = "Funfact",
  birthDay = "BirthDay",
  gender = "Gender",

  mediaUrl = "MediaUrl",

  bodyEyes = "BodyEyes",
  bodySkintone = "BodySkintone",
  bodyEars = "BodyEars",
  bodyClaws = "BodyClaws",
  bodyAura = "BodyAura",
  bodyTatoo = "BodyTatoo",
}

export enum NftInfoArgs {
  name = "name",
  description = "description",
  funfact = "funfact",
  birthDay = "birthDay",
  gender = "gender",

  mediaUrl = "mediaUrl",

  bodyEyes = "bodyEyes",
  bodySkintone = "bodySkintone",
  bodyEars = "bodyEars",
  bodyClaws = "bodyClaws",
  bodyAura = "bodyAura",
  bodyTatoo = "bodyTatoo",
}

export interface NftInfo extends BaseModel {
  name?: string;
  description?: string;
  funfact?: string;
  birthDay?: Date;
  gender?: Genders;

  mediaUrl?: string;

  bodyEyes?: string;
  bodySkintone?: string;
  bodyEars?: string;
  bodyClaws?: string;
  bodyAura?: string;
  bodyTatoo?: string;

  nftCategoryId?: string; // danh mục
  nftElementId?: string; // thuộc tính
  nftHabitantId?: string; // môi trường sống
  nftRarityId?: string; // độ hiếm
  nftTypeId?: string; // loai nft

  nftCategory?: NftCategory; // danh mục
  nftElement?: NftElement; // thuộc tính
  nftHabitant?: NftHabitant; // môi trường sống
  nftRarity?: NftRarity; // độ hiếm
  nftType?: NftType; // loai nft

  star?: string;

  status?: NftInfoStatus;
}

export const NftInfoInitialValues: CreateNftInfoInput = {
  name: "",
  description: "",
  funfact: "",
  birthDay: new Date(),
  gender: Genders.MALE,

  mediaUrl: "",

  bodyEyes: "",
  bodySkintone: "",
  bodyEars: "",
  bodyClaws: "",
  bodyAura: "",
  bodyTatoo: "",

  nftCategoryId: "",
  nftElementId: "",
  nftHabitantId: "",
  nftRarityId: "",
  nftTypeId: "",
};
