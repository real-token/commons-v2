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

export type RealTokenWeb3ProviderProps = {
  listenNewWcTx?: boolean;
  listenNewAaTx?: boolean;
};
export const defaultProviderConfig: RealTokenWeb3ProviderProps = {
  listenNewWcTx: true,
  listenNewAaTx: true,
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
    if (!providerConfig) return defaultProviderConfig;
    return merge(
      {},
      defaultProviderConfig,
      providerConfig
    ) as RealTokenWeb3ProviderProps;
  }, [providerConfig]);

  return (
    <QueryClientProvider client={queryClient}>
      <Web3AuthProvider config={web3authConfig}>
        <WagmiProvider>
          <AAProvider config={aaClientConfig}>
            <Web3Provider config={config}>{children}</Web3Provider>
          </AAProvider>
        </WagmiProvider>
      </Web3AuthProvider>
    </QueryClientProvider>
  );
}
