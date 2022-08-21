import { useSelector } from "../redux/store";
import Web3 from "web3";

const useContract = () => {
  const [walletReducer] = useSelector(({ walletReducer }) => [walletReducer]);

  const { claimTokenContract, buyTokenContract, createNftContract, web3 } = walletReducer;

  const buyAther = (account, amount) => {
    const newMoney = parseFloat(amount || 0).toString();
    const data = {
      from: account,
      value: Web3.utils.toWei(newMoney, "ether"),
    };
    return buyTokenContract.methods.tokenSale(account).send(data);
  };

  const claimAther = (account, amount) => {
    const newMoney = parseFloat(amount || 0).toString();
    const data = {
      from: account,
      value: Web3.utils.toWei(newMoney, "ether"),
    };
    return claimTokenContract.methods.claim_Token().send(data);
  };

  const createNFT = (account, amount, nftId) => {
    const newMoney = parseFloat(amount || 0).toString();
    // console.log("amount", amount);
    // console.log("account", account);
    const data = {
      from: account,
      value: Web3.utils.toWei(newMoney, "ether"),
    };
    // console.log("data", data);
    // console.log("nftId", nftId);
    // console.log("createNftContract", createNftContract);
    return createNftContract.methods.create_animal(nftId).send(data);
  };

  const getRevertReason = async (txHash) => {
    console.log("getRevertReason txHash", txHash);
    const tx = await web3.eth.getTransaction(txHash);

    console.log("tx", tx);
    await web3.eth.call(tx, tx.blockNumber);
  };

  const balanceOf = (account) => {
    return buyTokenContract.methods.balanceOf(account).call();
  };

  return {
    buyAther,
    claimAther,
    createNFT,
    getRevertReason,
    balanceOf,
  };
};

export default useContract;
