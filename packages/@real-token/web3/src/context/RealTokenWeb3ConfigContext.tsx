import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from "react";
import { useCurrentNetwork } from "@real-token/core";
import {
  mergeSpenderMappings,
  getSpenderDisplayName,
} from "../utils/spenderMappingUtils";
import { TorusConfig } from "@real-token/aa-core";

export interface SpenderMapping {
  [address: string]: {
    name: string;
    description?: string;
  };
}

export interface NetworkSpenderMappings {
  [networkId: string]: SpenderMapping;
}

export interface RealTokenWeb3Config {
  listenNewWcTx: boolean;
  listenNewAaTx: boolean;
  spenderMapping: NetworkSpenderMappings;
}

interface RealTokenWeb3ConfigContextType {
  config: RealTokenWeb3Config;
  authProviderConfig: TorusConfig["loginConfig"];
  getSpenderName: (address: string, networkId?: string) => string;
}

const RealTokenWeb3ConfigContext =
  createContext<RealTokenWeb3ConfigContextType | null>(null);

export const RealTokenWeb3ConfigProvider = ({
  children,
  config,
  authProviderConfig,
}: PropsWithChildren<{
  config: RealTokenWeb3Config;
  authProviderConfig: TorusConfig["loginConfig"];
}>) => {
  const currentNetwork = useCurrentNetwork();

  // Fusionner les mappings par défaut avec ceux fournis par l'utilisateur pour chaque réseau
  const finalSpenderMapping = useMemo(() => {
    return mergeSpenderMappings(config.spenderMapping);
  }, [config.spenderMapping]);

  // Configuration finale avec les mappings fusionnés
  const finalConfig = useMemo(
    () => ({
      ...config,
      spenderMapping: finalSpenderMapping,
    }),
    [config, finalSpenderMapping]
  );

  const getSpenderName = (address: string, networkId?: string): string => {
    const targetNetworkId = networkId || currentNetwork?.chainId;
    if (!targetNetworkId) {
      // Fallback vers l'adresse raccourcie si pas de réseau
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    const networkMappings = finalSpenderMapping[targetNetworkId];
    return getSpenderDisplayName(address, networkMappings || {});
  };

  return (
    <RealTokenWeb3ConfigContext.Provider
      value={{ config: finalConfig, getSpenderName, authProviderConfig }}
    >
      {children}
    </RealTokenWeb3ConfigContext.Provider>
  );
};

export const useRealTokenWeb3Config = () => {
  const context = useContext(RealTokenWeb3ConfigContext);
  if (!context) {
    throw new Error(
      "useRealTokenWeb3Config must be used within RealTokenWeb3ConfigProvider"
    );
  }
  return context;
};
