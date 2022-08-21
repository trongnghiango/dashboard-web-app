import { BaseModel } from "../../models/base-model.model";

export enum CustomerStatus {
  ACTIVE = "ACTIVE",
  DEACTIVED = "DEACTIVED",
}

export const customerStatusData = [
  {
    value: CustomerStatus.ACTIVE,
    name: "ACTIVE",
  },
  {
    value: CustomerStatus.DEACTIVED,
    name: "DEACTIVED",
  },
];

export enum CustomerWalletType {
  METAMASK = "METAMASK",
  TRUST = "TRUST",
  MATH = "MATH",
  TOKEN_POCKET = "TOKEN_POCKET",
  WALLET_CONNECT = "WALLET_CONNECT",
  BINANCE_CHAIN = "BINANCE_CHAIN",
}

export const customerWalletTypeData = [
  "METAMASK",
  "TRUST",
  "MATH",
  "TOKEN_POCKET",
  "WALLET_CONNECT",
  "BINANCE_CHAIN",
];

export type UpdateCustomerInput = {
  status?: string;
  customerTypeId?: string;
};

export enum CustomerArgNames {
  username = "Username",
  address = "Address",
  balanceBNB = "Balance BNB",
  balanceATHER = "Balance ATHER",
  walletType = "Wallet Type",
  email = "Email",
  referral = "Referral",
  shortUrl = "Short Url",
  role = "Role",
  addressIp = "Ip",
  status = "Status",
  introducedPeople = "Introduced"
}

export enum CustomerArgs {
  username = "username",
  address = "address",
  balanceBNB = "balanceBNB",
  balanceATHER = "balanceATHER",
  walletType = "walletType",
  email = "email",
  referral = "referral",
  shortUrl = "shortUrl",
  role = "role",
  addressIp = "addressIp",
  status = "status",
  introducedPeople = "introducedPeople"
}

export interface Customer extends BaseModel {
  username?: string;
  address?: string;
  balanceBNB?: number;
  balanceATHER?: number;
  walletType?: CustomerWalletType;
  email?: string;
  verifyCode?: string;
  referral?: string;
  shortUrl?: string;
  activedAt?: Date;
  role?: string;
  nonce?: number;
  addressIp?: string; // address
  status?: string;
  referralCustomerId?: string;
  referralCustomer: Customer;
  introducedCustomers: Customer[];}
