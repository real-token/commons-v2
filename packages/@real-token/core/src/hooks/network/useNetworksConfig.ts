import { useMemo } from "react";
import { useRealTokenUIConfig } from "../../providers/RealTokenUiProvider";
import { SHOW_NETWORKS, RealTokenUiNetworkConfig } from "../../types/networks";

/**
 * Hook to get filtered network configurations based on show networks preference
 *
 * @template T - Type extending RealTokenUiNetworkConfig, defaults to RealTokenUiNetworkConfig
 * @param {SHOW_NETWORKS} [showNetworks] - Optional parameter to override default show networks preference
 * @returns {T[]} Array of filtered network configurations based on show networks preference
 *
 * @example
 * ```tsx
 * const networks = useNetworksConfig();
 * // Get only testnet networks
 * const testnetNetworks = useNetworksConfig(SHOW_NETWORKS.TESTNETS);
 * ```
 */
export const useNetworksConfig = <
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig
>(
  showNetworks?: SHOW_NETWORKS
) => {
  const { networksConfig, showNetworks: defaultShowNetworks } =
    useRealTokenUIConfig<T>();

  const networks = useMemo(() => {
    if (networksConfig.length === 0 || !networksConfig) return [];
    const config = showNetworks ?? defaultShowNetworks;
    return networksConfig.filter((network) => {
      if (config === SHOW_NETWORKS.ALL) return true;
      if (config === SHOW_NETWORKS.TESTNETS) return network.isTestnet;
      return !network.isTestnet;
    });
  }, [networksConfig, showNetworks, defaultShowNetworks]);
  return networks;
};
