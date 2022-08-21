import { BaseModel } from "../../models/base-model.model";
import { NftInfo } from "../nft-info/nft-info.model";

export enum NftMarketStatus {
  NO_LIST = "NO_LIST",
  LISTING = "LISTING",
  PENDING = "PENDING",
}

export enum NftMintedStatus {
  PENDING = "PENDING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
}

export type CreateNftInput = {
  name?: string;
  nftId?: number; //

  address?: string;
  transactionHash?: string;
  smartContract?: string;

  nickName?: string;

  statExp?: number;
  statLevel?: number;
  statSkillBonus?: number;
  statHPBonus?: number;
  statElementBonus?: number;
  statHp?: number;
  statMana?: number;
  statStamina?: number;
  statLucky?: number;
  statSummonCost?: number;
  rating?: number;
  logs?: string;

  nftInfoId?: string;
  nftAirdropId?: string;
  itemId?: string;
  customerId?: string;
};

export type UpdateNftInput = {
  name?: string;
};

export enum NftArgNames {
  name = "Name",
  nftId = "NftId",
  transactionHash = "Transaction Hash",
  smartContract = "Smart Contract",
  nickName = "NickName",
  customerId = "CustomerId",
  statExp = "Stat Exp",
  statLevel = "Stat Level",
  statSkillBonus = "Stat Skill Bonus",
  statHPBonus = "Stat HP Bonus",
  statElementBonus = "Stat Element Bonus",
  statHp = "Stat Hp",
  statMana = "Stat Mana",
  statStamina = "Stat Stamina",
  statLucky = "Stat Lucky",
  statSummonCost = "Stat Summon Cost",
  rating = "Rating",
  nftInfoId = "Nft Info Id",
  itemId = "Item Id", // change item Id
  logs = "logs",
  marketStatus = "Market Status",
  nftMintedStatus = "Nft Minted Status",
}

export enum NftArgs {
  name = "name",
  nftId = "nftId",
  transactionHash = "transactionHash",
  smartContract = "smartContract",
  nickName = "nickName",
  customerId = "customerId",
  statExp = "statExp",
  statLevel = "statLevel",
  statSkillBonus = "statSkillBonus",
  statHPBonus = "statHPBonus",
  statElementBonus = "statElementBonus",
  statHp = "statHp",
  statMana = "statMana",
  statStamina = "statStamina",
  statLucky = "statLucky",
  statSummonCost = "statSummonCost",
  rating = "rating",
  nftInfoId = "nftInfoId",
  itemId = "itemId",
  marketStatus = "marketStatus",
  nftMintedStatus = "nftMintedStatus",
}

export interface Nft extends BaseModel {
  name?: string;
  nftId?: number; //

  transactionHash?: string;
  smartContract?: string;
  address?: string;

  nickName?: string;
  customerId?: string;

  statExp?: number;
  statLevel?: number;
  statSkillBonus?: number;
  statHPBonus?: number;
  statElementBonus?: number;
  statHp?: number;
  statMana?: number;
  statStamina?: number;
  statLucky?: number;
  statSummonCost?: number;
  rating?: number;
  nftInfoId?: string;
  itemId?: string;
  logs?: string;

  marketStatus?: NftMarketStatus;
  nftMintedStatus?: NftMintedStatus;
  nftInfo?: NftInfo;
}

export const NftInitialValues: CreateNftInput = {
  name: "",
  nftId: 0,

  transactionHash: "",
  smartContract: "",

  nickName: "",
  customerId: "",
  statExp: 0,
  statLevel: 0,
  statSkillBonus: 0,
  statHPBonus: 0,
  statElementBonus: 0,
  statHp: 0,
  statMana: 0,
  statStamina: 0,
  statLucky: 0,
  statSummonCost: 0,
  rating: 0,

  nftInfoId: "",
  itemId: "",
  logs: "",
};
