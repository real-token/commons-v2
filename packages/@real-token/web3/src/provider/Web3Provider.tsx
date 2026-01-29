import { useListenNewTx } from "../hooks/useListenWcTx";
import { useListenAaTx } from "../hooks/useListenAaTx";
import { PropsWithChildren, useMemo } from "react";
import { useCheckSdkIsLastVersion } from "../hooks/useCheckSdkIsLastVersion";
import { TxManagerProvider } from "../context/TxManagerContext";
import { TransactionCartProvider } from "../context/TransactionCartContext";
import {
  RealTokenWeb3Config,
  RealTokenWeb3ConfigProvider,
} from "../context/RealTokenWeb3ConfigContext";

import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { useCookies } from "react-cookie";
import { cookieToWeb3AuthState } from "@web3auth/modal";
import {
  AAClientConfig,
  AAProvider,
  getInitialState,
} from "@real-token/aa-core";

// Extract only the properties expected by Web3Auth's ProviderConfig type
// This ensures we only pass serializable data via postMessage to the Web3Auth iframe
// ProviderConfig expects: chainNamespace, blockExplorerUrl, logo, tickerName, ticker,
// rpcTarget, wsTarget, chainId, displayName, isTestnet, decimals
const sanitizeConfigForWeb3Auth = (config: AAClientConfig): AAClientConfig => {
  if (!config.torusConfig?.networks) return config;

  const sanitizedNetworks = config.torusConfig.networks.map((network) => ({
    chainNamespace: network.chainNamespace,
    blockExplorerUrl: network.blockExplorerUrl,
    logo: network.logo,
    tickerName: network.tickerName,
    ticker: network.ticker,
    rpcTarget: network.rpcTarget,
    wsTarget: network.wsTarget,
    chainId: network.chainId,
    displayName: network.displayName,
    isTestnet: network.isTestnet,
    decimals: network.decimals,
  }));

  return {
    ...config,
    torusConfig: {
      ...config.torusConfig,
      networks: sanitizedNetworks,
    },
  } as AAClientConfig;
};

export const Web3Provider = ({
  children,
  config,
  aaClientConfig,
}: PropsWithChildren & {
  config: RealTokenWeb3Config;
  aaClientConfig: AAClientConfig;
}) => {
  // Sanitize config to remove non-serializable properties before passing to Web3Auth
  const sanitizedAaClientConfig = useMemo(
    () => sanitizeConfigForWeb3Auth(aaClientConfig),
    [aaClientConfig]
  );

  const { web3authConfig } = useMemo(
    () => getInitialState(sanitizedAaClientConfig),
    [sanitizedAaClientConfig]
  );

  const [cookies] = useCookies(["cookie"]);

  const initialState = useMemo(() => {
    return cookieToWeb3AuthState(cookies.cookie);
  }, [cookies]);

  return (
    <Web3AuthProvider config={web3authConfig} initialState={initialState}>
      <WagmiProvider>
        <AAProvider config={sanitizedAaClientConfig}>
          <RealTokenWeb3ConfigProvider
            config={config}
            authProviderConfig={sanitizedAaClientConfig.torusConfig?.loginConfig}
          >
            <TxManagerProvider>
              <TransactionCartProvider>
                <Web3ProviderInner config={config}>{children}</Web3ProviderInner>
              </TransactionCartProvider>
            </TxManagerProvider>
          </RealTokenWeb3ConfigProvider>
        </AAProvider>
      </WagmiProvider>
    </Web3AuthProvider>
  );
};

const Web3ProviderInner = ({
  children,
  config,
}: PropsWithChildren & {
  config: RealTokenWeb3Config;
}) => {
  useListenNewTx(config.listenNewWcTx);
  useListenAaTx(config.listenNewAaTx);
  useCheckSdkIsLastVersion();
  return <>{children}</>;
};
