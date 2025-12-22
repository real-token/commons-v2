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

export const Web3Provider = ({
  children,
  config,
  aaClientConfig,
}: PropsWithChildren & {
  config: RealTokenWeb3Config;
  aaClientConfig: AAClientConfig;
}) => {
  const { web3authConfig } = useMemo(
    () => getInitialState(aaClientConfig),
    [aaClientConfig]
  );

  const [cookies] = useCookies(["cookie"]);

  const initialState = useMemo(() => {
    return cookieToWeb3AuthState(cookies.cookie);
  }, [cookies]);

  return (
    <Web3AuthProvider config={web3authConfig} initialState={initialState}>
      <WagmiProvider>
        <AAProvider config={aaClientConfig}>
          <RealTokenWeb3ConfigProvider
            config={config}
            authProviderConfig={aaClientConfig.torusConfig.loginConfig}
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
