import { useListenNewTx } from "../hooks/useListenWcTx";
import { useListenAaTx } from "../hooks/useListenAaTx";
import { PropsWithChildren, useMemo } from "react";
import { useCheckSdkIsLastVersion } from "../hooks/useCheckSdkIsLastVersion";
import { TxManagerProvider } from "../context/TxManagerContext";
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

// Remove non-serializable properties (React components) from networks
// These cannot be passed via postMessage to Web3Auth iframe
const sanitizeConfigForWeb3Auth = (config: AAClientConfig): AAClientConfig => {
  if (!config.torusConfig?.networks) return config;

  const sanitizedNetworks = config.torusConfig.networks.map((network) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { chainLogo, v2Logo, ...serializableNetwork } = network as Record<
      string,
      unknown
    >;
    return serializableNetwork;
  });

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
              <Web3ProviderInner config={config}>{children}</Web3ProviderInner>
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
