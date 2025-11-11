import { useWeb3Auth } from "@web3auth/modal/react";
import { getWeb3AuthPrivateAccess } from "@real-token/web3";

export const useModalStatus = () => {
  const { web3Auth } = useWeb3Auth();
  const web3AuthPrivate = getWeb3AuthPrivateAccess(web3Auth);
  return {
    isLoading: web3AuthPrivate.status === "connecting",
    isConnected: web3AuthPrivate.status === "connected",
  };
};
