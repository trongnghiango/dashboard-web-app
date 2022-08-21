import { BaseModel } from "../../models/base-model.model";

export enum SmartContracts {
  payather = "payather",
  claimtoken = "claimtoken",
  createnft = "createnft",
}

export enum ProviderCodes {
  INFURA = "INFURA",
  MORALIS = "MORALIS",
  ANKR = "ANKR",
  GETBLOCK = "GETBLOCK",
}

export const ProviderCodeData = [
  {
    name: ProviderCodes.GETBLOCK,
    value: ProviderCodes.GETBLOCK,
  },
  {
    name: ProviderCodes.ANKR,
    value: ProviderCodes.ANKR,
  },
  {
    name: ProviderCodes.INFURA,
    value: ProviderCodes.INFURA,
  },
  {
    name: ProviderCodes.MORALIS,
    value: ProviderCodes.MORALIS,
  },
];
export const SmartContractData = [
  {
    name: SmartContracts.payather,
    value: SmartContracts.payather,
  },
  {
    name: SmartContracts.claimtoken,
    value: SmartContracts.claimtoken,
  },
  {
    name: SmartContracts.createnft,
    value: SmartContracts.createnft,
  },
];

export type CreateProviderInput = {
  name?: string;
  code?: string;
  appId?: string;
  contract?: string;
  serverUrl?: string;
};

export type UpdateProviderInput = {
  name?: string;
  code?: string;
  contract?: string;
  appId?: string;
  serverUrl?: string;
};

export enum ProviderArgNames {
  name = "Name",
  code = "Code",
  appId = "AppId",
  contract = "Contract",
  serverUrl = "ServerUrl",
  isRunning = "isRunning",
  restartTime = "Restart time",
  restartCount = "Restart count",
}

export enum ProviderArgs {
  name = "name",
  code = "code",
  appId = "appId",
  contract = "contract",
  serverUrl = "serverUrl",
  isRunning = "isRunning",
  restartTime = "restartTime",
  restartCount = "restartCount",
}

export interface Provider extends BaseModel {
  name?: string;
  code?: string;
  appId?: string;
  contract: string;
  serverUrl?: string;
  isRunning?: boolean;
  restartTime?: Date;
  restartCount?: number;
}

export const ProviderInitialValues: CreateProviderInput = {
  name: "",
  code: "",
  appId: "",
  contract: "",
  serverUrl: "",
};
