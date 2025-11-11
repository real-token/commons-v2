import { useWeb3Auth } from "@web3auth/modal/react";
import { getWeb3AuthPrivateAccess, Web3AuthPrivateAccess } from "../utils";

export const useWeb3AuthPrivate = (): Web3AuthPrivateAccess => {
  const web3auth = useWeb3Auth();
  return getWeb3AuthPrivateAccess(web3auth.web3Auth);
};
