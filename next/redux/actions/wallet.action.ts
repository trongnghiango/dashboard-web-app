import Web3 from "web3";
import { CustomerWalletType } from "../../lib/modules/wallet/wallet.model";

export enum WalletConstants {
  SET_BALANCE = "SET_BALANCE",
  CHECK_METAMASK_INSTALLED = "CHECK_METAMASK_INSTALLED",
  CHECK_MATH_INSTALLED = "CHECK_MATH_INSTALLED",
  CHECK_BINANCE_INSTALLED = "CHECK_BINANCE_INSTALLED",
  CHECK_C98_INSTALLED = "CHECK_C98_INSTALLED",
  SET_CURRENT_ACCOUNT = "SET_CURRENT_ACCOUNT",
  SET_CURRENT_WALLET_TYPE = "SET_CURRENT_WALLET_TYPE",
  SET_BUY_TOKEN_CONTRACT = "SET_BUY_TOKEN_CONTRACT",
  SET_CLAIM_TOKEN_CONTRACT = "SET_CLAIM_TOKEN_CONTRACT",
  SET_CREATE_NFT_CONTRACT = "SET_CREATE_NFT_CONTRACT",
  SET_WEB3 = "SET_WEB3",
}

export type WalletEvent =
  | { type: WalletConstants.SET_BALANCE; balance: number }
  | { type: WalletConstants.CHECK_METAMASK_INSTALLED; installed: boolean }
  | { type: WalletConstants.CHECK_MATH_INSTALLED; installed: boolean }
  | { type: WalletConstants.CHECK_BINANCE_INSTALLED; installed: boolean }
  | { type: WalletConstants.CHECK_C98_INSTALLED; installed: boolean }
  | { type: WalletConstants.SET_CURRENT_ACCOUNT; currentAccount: string }
  | { type: WalletConstants.SET_CURRENT_WALLET_TYPE; currentWalletType: CustomerWalletType }
  | { type: WalletConstants.SET_BUY_TOKEN_CONTRACT; contract: any }
  | { type: WalletConstants.SET_CLAIM_TOKEN_CONTRACT; contract: any }
  | { type: WalletConstants.SET_CREATE_NFT_CONTRACT; contract: any }
  | { type: WalletConstants.SET_WEB3; web3: Web3 };

export const setWeb3 =
  (web3: Web3) =>
  (dispatch: any): WalletEvent => {
    return dispatch({ type: WalletConstants.SET_WEB3, web3 });
  };

export const setBuyTokenContract =
  (contract: any) =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.SET_BUY_TOKEN_CONTRACT, contract });
  };

export const setClaimTokenContract =
  (contract: any) =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.SET_CLAIM_TOKEN_CONTRACT, contract });
  };

export const setCreateNftContract =
  (contract: any) =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.SET_CREATE_NFT_CONTRACT, contract });
  };

export const setCurrentWalletType =
  (currentWalletType: CustomerWalletType) =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.SET_CURRENT_WALLET_TYPE, currentWalletType });
  };

export const setCurrentAccount =
  (currentAccount: string) =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.SET_CURRENT_ACCOUNT, currentAccount });
  };

export const setBalance =
  (balance: number) =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.SET_BALANCE, balance });
  };

export const checkMetaInstalled =
  () =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.CHECK_METAMASK_INSTALLED, installed: true });
  };

export const checkBinanceInstalled =
  () =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.CHECK_BINANCE_INSTALLED, installed: true });
  };

export const checkMathInstalled =
  () =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.CHECK_MATH_INSTALLED, installed: true });
  };

export const checkC98Installed =
  () =>
  (dispatch: any): WalletEvent => {
    // console.log("balance", balance);
    return dispatch({ type: WalletConstants.CHECK_C98_INSTALLED, installed: true });
  };
