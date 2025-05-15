"use client";

import {
  AAProvider,
  AAClientConfig,
  getInitialState,
} from "@real-token/aa-core";

import { WagmiProvider } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useMemo } from "react";
import { RainbowKitProviderProps } from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider";
import { useListenNewTx } from "../hooks/useListenWcTx";
import { merge } from "lodash";
import { useListenAaTx } from "../hooks/useListenAaTx";

type RealTokenWeb3ProviderProps = {
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
  rainbowKitConfig,
  providerConfig = defaultProviderConfig,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
  aaClientConfig: AAClientConfig;
  rainbowKitConfig?: RainbowKitProviderProps;
  providerConfig?: RealTokenWeb3ProviderProps;
}) {
  const { wagmiConfig, authAdapter, web3auth } = useMemo(
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

  useListenNewTx(config.listenNewWcTx);
  useListenAaTx(config.listenNewAaTx);
  // TODO: add listen to aa sign message

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider {...rainbowKitConfig}>
          <AAProvider
            config={aaClientConfig}
            authAdapter={authAdapter}
            web3auth={web3auth}
          >
            {children}
          </AAProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
