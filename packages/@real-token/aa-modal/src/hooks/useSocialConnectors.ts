import { useWeb3AuthPrivate, useRealTokenWeb3Config } from "@real-token/web3";
import { useMemo } from "react";

export const useSocialConnectors = () => {
  const privateWeb3auth = useWeb3AuthPrivate();
  const { authProviderConfig } = useRealTokenWeb3Config();

  const allConnectors =
    privateWeb3auth.loginModal.uiConfig.loginMethodsOrder;

  return useMemo(() => {
    const configuredProviders = Object.keys(authProviderConfig ?? {});

    if (configuredProviders.length === 0) {
      return allConnectors;
    }

    return allConnectors.filter((connector) =>
      configuredProviders.includes(connector)
    );
  }, [allConnectors, authProviderConfig]);
};
