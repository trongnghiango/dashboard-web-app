import { useEffect, useState } from "react";
import Web3 from "web3";
import {
  BinanceNetworks,
  CustomerWalletType,
  walletObjects,
} from "../lib/modules/wallet/wallet.model";
import useEnv from "./use-env";
import { EnvKeys } from "../lib/helpers/env.helper";
import { useDispatch, useSelector } from "../redux/store";

const useWallet = () => {
  const [walletReducer] = useSelector(({ walletReducer }) => [walletReducer]);

  const checkWalletInstalled = (type: CustomerWalletType) => {
    let installed = null;
    switch (type) {
      case CustomerWalletType.METAMASK:
        installed = walletReducer.metaInstalled;
        break;
      case CustomerWalletType.BINANCE_CHAIN:
        installed = walletReducer.binanceInstalled;
        break;
      case CustomerWalletType.C98:
        installed = walletReducer.c98Installed;
        break;
      case CustomerWalletType.MATH:
        installed = walletReducer.mathInstalled;
        break;
    }
    return installed;
  };

  return { ...walletReducer, checkWalletInstalled };
};

export default useWallet;
