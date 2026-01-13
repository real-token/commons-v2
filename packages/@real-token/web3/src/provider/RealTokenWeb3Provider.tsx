"use client";

import { AAClientConfig } from "@real-token/aa-core";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { merge } from "lodash";
import { Web3Provider } from "./Web3Provider";
import {
  RealTokenWeb3Config,
  NetworkSpenderMappings,
} from "../context/RealTokenWeb3ConfigContext";
import defaultSpenderMappings from "../config/defaultSpenderMappings";
import { CookiesProvider } from "react-cookie";

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

/**
 * Main providers for web3 connection.
 * @param param0
 * @returns
 */
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
      <CookiesProvider>
        <Web3Provider config={config} aaClientConfig={aaClientConfig}>
          {children}
        </Web3Provider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
