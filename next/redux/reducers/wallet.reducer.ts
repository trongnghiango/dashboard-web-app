import Web3 from "web3";
import { CustomerWalletType } from "../../lib/modules/wallet/wallet.model";
import { WalletConstants, WalletEvent } from "../actions/wallet.action";

export interface WalletStore {
  balance: number;
  metaInstalled: boolean;
  mathInstalled: boolean;
  binanceInstalled: boolean;
  c98Installed: boolean;
  currentAccount: string;
  currentWalletType: CustomerWalletType;
  buyTokenContract: any;
  claimTokenContract: any;
  createNftContract: any;
  web3: Web3;
}

const init: WalletStore = {
  balance: 0,
  metaInstalled: false,
  mathInstalled: false,
  binanceInstalled: false,
  c98Installed: false,
  currentAccount: null,
  currentWalletType: null,
  buyTokenContract: null,
  claimTokenContract: null,
  createNftContract: null,
  web3: null,
};

export const walletReducer = (state: WalletStore = init, event: WalletEvent) => {
  switch (event.type) {
    case WalletConstants.SET_BALANCE:
      return {
        ...state,
        balance: event.balance,
      };
    case WalletConstants.CHECK_METAMASK_INSTALLED:
      return {
        ...state,
        metaInstalled: event.installed,
      };
    case WalletConstants.CHECK_MATH_INSTALLED:
      return {
        ...state,
        mathInstalled: event.installed,
      };
    case WalletConstants.CHECK_BINANCE_INSTALLED:
      return {
        ...state,
        binanceInstalled: event.installed,
      };
    case WalletConstants.CHECK_C98_INSTALLED:
      return {
        ...state,
        c98Installed: event.installed,
      };
    case WalletConstants.SET_CURRENT_ACCOUNT:
      return {
        ...state,
        currentAccount: event.currentAccount,
      };
    case WalletConstants.SET_CURRENT_WALLET_TYPE:
      return {
        ...state,
        currentWalletType: event.currentWalletType,
      };
    case WalletConstants.SET_BUY_TOKEN_CONTRACT:
      return {
        ...state,
        buyTokenContract: event.contract,
      };
    case WalletConstants.SET_CLAIM_TOKEN_CONTRACT:
      return {
        ...state,
        claimTokenContract: event.contract,
      };
    case WalletConstants.SET_CREATE_NFT_CONTRACT:
      return {
        ...state,
        createNftContract: event.contract,
      };
    case WalletConstants.SET_WEB3:
      return {
        ...state,
        web3: event.web3,
      };

    default:
      return state;
  }
};
