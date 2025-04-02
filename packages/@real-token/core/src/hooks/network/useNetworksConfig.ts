import { useMemo } from "react";
import { useRealTokenUIConfig } from "../../providers/RealTokenUiProvider";
import { SHOW_NETWORKS, RealTokenUiNetworkConfig } from "../../types/networks";

export const useNetworksConfig = <
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig
>(
  showNetworks?: SHOW_NETWORKS
) => {
  const { networksConfig, showNetworks: defaultShowNetworks } =
    useRealTokenUIConfig<T>();
  const networks = useMemo(() => {
    const config = showNetworks ?? defaultShowNetworks;
    return networksConfig.filter((network) => {
      if (config === SHOW_NETWORKS.ALL) return true;
      if (config === SHOW_NETWORKS.TESTNETS) return network.isTestnet;
      return !network.isTestnet;
    });
  }, [networksConfig, showNetworks, defaultShowNetworks]);
  return networks;
};
