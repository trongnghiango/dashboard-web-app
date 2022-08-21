import { BaseModel } from "../../models/base-model.model";

export type CreateNftAirdropInput = {
  name?: string;
  price?: number;
  mediaUrl?: string;
  seedElementBonus?: number[];
  seedExp?: number[];
  seedHPBonus?: number[];
  seedLevel?: number[];
  seedSkillBonus?: number[];
  seedHp?: number[];
  seedMana?: number[];
  seedSummonCost?: number[];
  seedStamina?: number[];
  seedLucky?: number[];
};

export type UpdateNftAirdropInput = {
  name?: string;
  price?: number;
  mediaUrl?: string;
  seedElementBonus?: number[];
  seedExp?: number[];
  seedHPBonus?: number[];
  seedLevel?: number[];
  seedSkillBonus?: number[];
  seedHp?: number[];
  seedMana?: number[];
  seedSummonCost?: number[];
  seedStamina?: number[];
  seedLucky?: number[];
};

export enum NftAirdropArgNames {
  name = "Name",
  price = "Price",
  mediaUrl = "Media Url",
  seedElementBonus = "Seed Element Bonus",
  seedExp = "Seed Exp",
  seedHPBonus = "Seed HP Bonus",
  seedLevel = "Seed Level",
  seedSkillBonus = "Seed Skill Bonus",
  seedHp = "Seed Hp",
  seedMana = "Seed Mana",
  seedSummonCost = "Seed Summon Cost",
  seedStamina = "Seed Stamina",
  seedLucky = "Seed Lucky",
}

export enum NftAirdropArgs {
  name = "name",
  price = "price",
  mediaUrl = "mediaUrl",
  seedElementBonus = "seedElementBonus",
  seedExp = "seedExp",
  seedHPBonus = "seedHPBonus",
  seedLevel = "seedLevel",
  seedSkillBonus = "seedSkillBonus",
  seedHp = "seedHp",
  seedMana = "seedMana",
  seedSummonCost = "seedSummonCost",
  seedStamina = "seedStamina",
  seedLucky = "seedLucky",
}

export interface NftAirdrop extends BaseModel {
  name?: string;
  price?: number;
  mediaUrl?: string;
  seedElementBonus?: number[];
  seedExp?: number[];
  seedHPBonus?: number[];
  seedLevel?: number[];
  seedSkillBonus?: number[];
  seedHp?: number[];
  seedMana?: number[];
  seedSummonCost?: number[];
  seedStamina?: number[];
  seedLucky?: number[];
}

export const NftAirdropInitialValues: CreateNftAirdropInput = {
  name: "",
};
