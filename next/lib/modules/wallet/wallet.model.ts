export enum walletObjects {
  BinanceChain = "BinanceChain", // bsc
  ethereum = "ethereum", //metamask
  coin98 = "coin98",
}

export enum CustomerWalletType {
  METAMASK = "METAMASK",
  C98 = "C98",
  MATH = "MATH",
  BINANCE_CHAIN = "BINANCE_CHAIN",
}

export const customerWalletTypeData = [
  {
    name: "Metamask",
    code: CustomerWalletType.METAMASK,
    icon: "/images/wallet/metamask.svg",
    downloadUrl:
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=chrome-ntp-icon",
  },
  {
    name: "Binance Chain Wallet",
    code: CustomerWalletType.BINANCE_CHAIN,
    icon: "/images/wallet/binance-chain.svg",
    downloadUrl:
      "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp?utm_source=chrome-ntp-icon",
  },
  //   {
  //     name: "Coin98",
  //     code: CustomerWalletType.C98,
  //     icon: "/images/wallet/c98.png",
  //     downloadUrl:
  //       "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg?utm_source=chrome-ntp-icon",
  //   },
  //   {
  //     name: "MathWallet",
  //     code: CustomerWalletType.MATH,
  //     icon: "/images/wallet/math.svg",
  //     downloadUrl:
  //       "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc?utm_source=chrome-ntp-icon",
  //   },
];

export enum BinanceNetworks {
  TESTNET = "bbc-testnet",
  MAINNET = "bbc-mainnet",
}
