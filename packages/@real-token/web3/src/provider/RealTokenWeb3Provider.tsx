"use client";

import {
  AAProvider,
  AAClientConfig,
  getInitialState,
} from "@real-token/aa-core";

import { WagmiProvider } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";

export function RealTokenWeb3Provider({
  children,
  queryClient,
  aaClientConfig,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
  aaClientConfig: AAClientConfig;
}) {
  const { wagmiConfig, authAdapter, web3auth } = useMemo(
    () => getInitialState(aaClientConfig),
    [aaClientConfig]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>
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
