import type { ChainConfig } from "@real-token/aa-core";
import type { Logo } from "@real-token/types";

export enum SHOW_NETWORKS {
  ALL = "all",
  TESTNETS = "testnets",
  MAINNETS = "mainnets",
}

export type RealTokenUiNetworkConfig = Omit<ChainConfig, "logo"> & {
  isTestnet: boolean;
  graphPrefix?: {
    // TODO: add all graph prefixes
  };
  // nativeToken: NetworkToken;
  logo?: Logo;
  color?: string;
  serverChainId: string;
};
