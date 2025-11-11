import { useWeb3AuthPrivate } from "@real-token/web3";

export const useSocialConnectors = () => {
  const privateWeb3auth = useWeb3AuthPrivate();
  return privateWeb3auth.loginModal.uiConfig.loginMethodsOrder;
};
