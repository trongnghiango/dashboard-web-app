import { useEffect, useState } from "react";
import Web3 from "web3";
import { EnvKeys } from "../lib/helpers/env.helper";
import { SM_ABI_AIR_DROP, SM_ADDRESS_AIR_DROP } from "../lib/helpers/key.helper";
import {
  BinanceNetworks,
  CustomerWalletType,
  walletObjects,
} from "../lib/modules/wallet/wallet.model";
import {
  checkBinanceInstalled,
  checkMetaInstalled,
  setBalance,
  setBuyTokenContract,
  setClaimTokenContract,
  setCreateNftContract,
  setCurrentAccount,
  setCurrentWalletType,
  setWeb3,
} from "../redux/actions/wallet.action";
import { useDispatch } from "../redux/store";
import useEnv from "./use-env";

let web3 = null;

const useWeb3 = () => {
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();

  const env = useEnv(EnvKeys.nodeENV);
  const nonceCode = useEnv(EnvKeys.nonceCode);

  // const CONTRACT_TEST = JSON.stringify([]);
  // console.log("CONTRACT_TEST", CONTRACT_TEST);

  const SM_ABI_BUY_TOKEN = JSON.parse(useEnv(EnvKeys.SM_ABI_BUY_TOKEN)),
    SM_ADDRESS_BUY_TOKEN = useEnv(EnvKeys.SM_ADDRESS_BUY_TOKEN),
    SM_ABI_CLAIM_TOKEN = JSON.parse(useEnv(EnvKeys.SM_ABI_CLAIM_TOKEN)),
    SM_ADDRESS_CLAIM_TOKEN = useEnv(EnvKeys.SM_ADDRESS_CLAIM_TOKEN);

  useEffect(() => {
    if (window) {
      loadMetamaskWallet(window[walletObjects.ethereum]);
      loadBinanceWallet(window[walletObjects.BinanceChain]);
    }
  }, [typeof window]);

  const loadMetamaskWallet = (wallet) => {
    // console.log("wallet", wallet);
    if (!wallet) {
      return;
    }
    if (!wallet.isMetaMask) {
      return;
    }

    web3 = new Web3(wallet);
    setWeb3(web3)(dispatch);

    console.log("Metamask is installed");
    checkMetaInstalled()(dispatch);

    wallet.on("chainChanged", () => {
      // logoutCustomer()(dispatch);
    });

    wallet.on("networkChanged", (networkId) => {
      // if (networkId !== "0x61" || networkId !== "97") {
      // }
      // logoutCustomer()(dispatch);
    });

    wallet.on("accountsChanged", (accounts) => {
      // logoutCustomer()(dispatch);
    });
  };

  const loadBinanceWallet = (wallet) => {
    // console.log("wallet", wallet);
    if (!wallet) {
      return;
    }
    if (!wallet.isConnected()) {
      return;
    }
    console.log("Binance is installed");
    checkBinanceInstalled()(dispatch);

    web3 = new Web3(wallet);
    setWeb3(web3)(dispatch);

    wallet.on("chainChanged", () => {
      // logoutCustomer()(dispatch);
    });

    wallet.on("networkChanged", () => {
      // logoutCustomer()(dispatch);
    });

    wallet.on("accountsChanged", (accounts) => {
      // logoutCustomer()(dispatch);
    });
  };

  const checkBSCNetwork = () => {
    const wallet = window[walletObjects.ethereum];
    return wallet.chainId === `0x${Number(97).toString(16)}`;
  };

  const checkPolygonNetwork = () => {
    const wallet = window[walletObjects.ethereum];
    return wallet.chainId === `0x${Number(80001).toString(16)}`;
  };

  const connectMetamask = (toast?: any) => {
    const wallet = window[walletObjects.ethereum];
    // console.log("connectMetamask", wallet);
    // console.log("networkVersion", wallet.networkVersion);
    // console.log("networkId", wallet.chainId);
    changeNetwork({
      networkName: ChainNetworks.polygonTestnet,
    })
      ?.then((data) => {
        wallet
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => {
            console.log("connected Metamask", accounts);
            setCurrentAccount(accounts[0])(dispatch);
            setCurrentWalletType(CustomerWalletType.METAMASK)(dispatch);
            loadContractMetamask();
            console.log("web3.eth", web3.eth);
            web3.eth.getBalance(accounts[0], function (err, balance) {
              console.log("balance", balance);
              const read = parseInt(balance) / 10 ** 18;
              console.log("read", read);
              setBalance(read)(dispatch);
            });
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      ?.catch((error) => {
        console.log("error", error);
      });

    // if (wallet.chainId !== "0x61" || wallet.networkVersion !== "97") {
    //   toast && toast.error("Please switch bsc test Network");
    //   return;
    // }
  };

  const connectMetamaskPolygon = ({
    toast,
    handleSuccess,
    handleError,
  }: {
    toast?: any;
    handleSuccess?: any;
    handleError?: any;
  }) => {
    const wallet = window[walletObjects.ethereum];
    // console.log("connectMetamask", wallet);
    // console.log("networkVersion", wallet.networkVersion);
    // console.log("networkId", wallet.chainId);
    // if (wallet.chainId !== "0x5e" || wallet.networkVersion !== "97") {
    //   toast && toast.error("Please switch bsc test Network");
    //   return;
    // }

    wallet
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        console.log("connected Metamask", accounts);
        setCurrentWalletType(CustomerWalletType.METAMASK)(dispatch);
        loadContractMetamask();
        handleSuccess && handleSuccess();
      })
      .catch((error) => {
        console.log("error", error);
        handleError && handleError();
      });
  };

  const connectBinanceWallet = (toast?: any) => {
    const wallet = window[walletObjects.BinanceChain];
    // console.log("wallet", wallet);

    //Testnet(ChainID 0x61, 97 in decimal)
    if (wallet.chainId !== "0x61" || wallet.networkVersion !== "97") {
      toast && toast.error("Please switch bsc test Network");
      return;
    }

    wallet
      .requestAccounts()
      .then((res) => {
        console.log("connected Binance");
        const [data] = res;
        let currentAddress = null;
        if (env === "development") {
          currentAddress = data.addresses?.find((addr) => addr.type === BinanceNetworks.TESTNET);
        } else {
          currentAddress = data.addresses?.find((addr) => addr.type === BinanceNetworks.MAINNET);
        }

        // console.log("currentAddress", currentAddress);

        setCurrentAccount(currentAddress.address);
        setCurrentWalletType(CustomerWalletType.BINANCE_CHAIN);
        loadContractBinance();
        web3.eth.getBalance(currentAddress.address, function (err, balance) {
          const read = parseInt(balance) / 10 ** 18;
          setBalance(read)(dispatch);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const loadContractMetamask = () => {
    setError(null);
    web3 = new Web3(window[walletObjects.ethereum]);
    const buyTokenContract = new web3.eth.Contract(SM_ABI_BUY_TOKEN, SM_ADDRESS_BUY_TOKEN);
    setBuyTokenContract(buyTokenContract)(dispatch);

    const claimTokenContract = new web3.eth.Contract(SM_ABI_CLAIM_TOKEN, SM_ADDRESS_CLAIM_TOKEN);
    setClaimTokenContract(claimTokenContract)(dispatch);

    const createNftContract = new web3.eth.Contract(SM_ABI_AIR_DROP, SM_ADDRESS_AIR_DROP);
    setCreateNftContract(createNftContract)(dispatch);
  };

  const loadContractBinance = () => {
    setError(null);
    web3 = new Web3(window[walletObjects.BinanceChain]);

    const buyTokenContract = new web3.eth.Contract(SM_ABI_BUY_TOKEN, SM_ADDRESS_BUY_TOKEN);
    setBuyTokenContract(buyTokenContract)(dispatch);

    const claimTokenContract = new web3.eth.Contract(SM_ABI_CLAIM_TOKEN, SM_ADDRESS_CLAIM_TOKEN);
    setClaimTokenContract(claimTokenContract)(dispatch);

    const createNftContract = new web3.eth.Contract(SM_ABI_AIR_DROP, SM_ADDRESS_AIR_DROP);
    setCreateNftContract(createNftContract)(dispatch);
  };

  const signNonce = ({ publicAddress, nonce }: { publicAddress: string; nonce: string }) => {
    return web3.eth.personal.sign(
      `${nonceCode} ${nonce}`,
      publicAddress,
      "" // MetaMask will ignore the password argument here
    );
  };

  const changeNetwork = ({ networkName }: { networkName: ChainNetworks }) => {
    const wallet = window[walletObjects?.ethereum];
    return (
      wallet &&
      wallet.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      })
    );
  };

  return {
    connectMetamask,
    connectBinanceWallet,
    connectMetamaskPolygon,
    signNonce,
    changeNetwork,
    checkBSCNetwork,
    checkPolygonNetwork,
    web3,
  };
};

export default useWeb3;

export enum ChainNetworks {
  polygon = "polygon",
  polygonTestnet = "polygonTestnet",
  bsc = "bsc",
  bscTestNet = "bscTestnet",
}

// if (wallet.chainId !== "0x61" || wallet.networkVersion !== "97") {
const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  polygonTestnet: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://matic-mumbai.chainstacklabs.com",
      "wss://ws-matic-mumbai.chainstacklabs.com",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  bscTestnet: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
};
