import { useWeb3Auth } from "@web3auth/modal/react";
import { getWeb3AuthPrivateAccess } from "../types/web3auth";

export const useSocialConnectors = () => {
  const web3auth = useWeb3Auth();
  const privateWeb3auth = getWeb3AuthPrivateAccess(web3auth.web3Auth);
  return privateWeb3auth.loginModal.uiConfig.loginMethodsOrder;
};
