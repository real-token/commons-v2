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

export function RealTokenWeb3Provider({
  children,
  queryClient,
  aaClientConfig,
  rainbowKitConfig,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
  aaClientConfig: AAClientConfig;
  rainbowKitConfig?: RainbowKitProviderProps;
}) {
  const { wagmiConfig, authAdapter, web3auth } = useMemo(
    () => getInitialState(aaClientConfig),
    [aaClientConfig]
  );
  console.log("wagmiConfig", wagmiConfig);
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
