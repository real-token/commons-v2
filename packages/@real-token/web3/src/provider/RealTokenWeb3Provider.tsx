"use client";

import {
  AAProvider,
  AAClientConfig,
  getInitialState,
} from "@real-token/aa-core";

import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { merge } from "lodash";
import { Web3Provider } from "./Web3Provider";
import {
  RealTokenWeb3ConfigProvider,
  RealTokenWeb3Config,
  NetworkSpenderMappings,
} from "../context/RealTokenWeb3ConfigContext";
import defaultSpenderMappings from "../config/defaultSpenderMappings";

export type RealTokenWeb3ProviderProps = {
  listenNewWcTx?: boolean;
  listenNewAaTx?: boolean;
  spenderMapping?: NetworkSpenderMappings;
};
export const defaultProviderConfig: RealTokenWeb3ProviderProps = {
  listenNewWcTx: true,
  listenNewAaTx: true,
  spenderMapping: defaultSpenderMappings,
};

export function RealTokenWeb3Provider({
  children,
  queryClient,
  aaClientConfig,
  providerConfig = defaultProviderConfig,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
  aaClientConfig: AAClientConfig;
  providerConfig?: RealTokenWeb3ProviderProps;
}) {
  const { web3authConfig } = useMemo(
    () => getInitialState(aaClientConfig),
    [aaClientConfig]
  );

  const config = useMemo(() => {
    const mergedConfig = merge(
      {},
      defaultProviderConfig,
      providerConfig
    ) as RealTokenWeb3ProviderProps;

    // Conversion vers RealTokenWeb3Config
    return {
      listenNewWcTx: mergedConfig.listenNewWcTx!,
      listenNewAaTx: mergedConfig.listenNewAaTx!,
      spenderMapping: mergedConfig.spenderMapping!,
    } as RealTokenWeb3Config;
  }, [providerConfig]);

  return (
    <QueryClientProvider client={queryClient}>
      <Web3AuthProvider config={web3authConfig}>
        <WagmiProvider>
          <AAProvider config={aaClientConfig}>
            <RealTokenWeb3ConfigProvider config={config}>
              <Web3Provider config={config}>{children}</Web3Provider>
            </RealTokenWeb3ConfigProvider>
          </AAProvider>
        </WagmiProvider>
      </Web3AuthProvider>
    </QueryClientProvider>
  );
}
