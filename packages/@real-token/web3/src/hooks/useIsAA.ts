import { useAA } from "@real-token/aa-core";

export const useIsAA = () => {
  const { ownerWalletAddress } = useAA();
  return ownerWalletAddress != null || ownerWalletAddress != undefined;
};
