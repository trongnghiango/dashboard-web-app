import { useSelector } from "../redux/store";

const useBalance = (): number => {
  const [walletReducer] = useSelector(({ walletReducer }) => [walletReducer]);
  // console.log("walletReducer.balance", walletReducer.balance);
  return walletReducer.balance;
};

export default useBalance;
