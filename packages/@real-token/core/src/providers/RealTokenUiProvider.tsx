import { ReactNode, createContext, useContext } from "react";
import { RealTokenUiNetworkConfig, SHOW_NETWORKS } from "../types/networks";
import { NetworkId } from "../constants";
import { AaModalConfig, defaultAaModalConfig } from "@real-token/aa-modal";
import { Env } from "../types/env";
import { merge } from "lodash";

interface RealTokenUiContextProps<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig,
> {
  showNetworks: SHOW_NETWORKS;
  showWrongNetworkBanner: boolean;
  networksConfig: T[];
  defaultNetworkId: string;
  aaModalConfig: AaModalConfig;
  env: Env;
}

const DEFAULT_CONFIG: RealTokenUiContextProps = {
  showNetworks: SHOW_NETWORKS.ALL,
  showWrongNetworkBanner: true,
  networksConfig: [],
  defaultNetworkId: NetworkId.gnosis,
  aaModalConfig: defaultAaModalConfig,
  env: "development",
};

const RealTokenUiContext = createContext<RealTokenUiContextProps | undefined>(
  {} as RealTokenUiContextProps
);

export function useRealTokenUIConfig<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig,
>(): RealTokenUiContextProps<T> {
  const context = useContext(RealTokenUiContext) as
    | RealTokenUiContextProps<T>
    | undefined;
  if (context === undefined) {
    throw new Error(
      "useRealTokenUIConfig must be used within a RealTokenUiProvider"
    );
  }
  return context;
}

interface RealTokenUiProviderProps<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig,
> {
  children: ReactNode;
  values: Partial<RealTokenUiContextProps<T>>;
}

export function RealTokenUiProvider<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig,
>({ children, values }: RealTokenUiProviderProps<T>) {
  const mergedConfig = merge({}, DEFAULT_CONFIG, values);
  return (
    <RealTokenUiContext.Provider value={mergedConfig}>
      {children}
    </RealTokenUiContext.Provider>
  );
}
