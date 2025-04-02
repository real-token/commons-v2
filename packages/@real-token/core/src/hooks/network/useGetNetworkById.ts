import { useNetworksConfig } from "./useNetworksConfig";
import { useChainId } from "wagmi";
import { useMemo } from "react";
import { RealTokenUiNetworkConfig } from "../../types/networks";

/**
 * Get a network by its chainId
 * @param chainId - The chainId of the network in number format (e.g. 1 for eth mainnet, 100 for gnosis chain)
 * @returns The network or undefined if not found
 */
export function useGetNetworkById<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig
>(chainId: number): T | undefined {
  const networks = useNetworksConfig<T>();
  return useMemo(
    () => networks.find((network) => Number(network.chainId) === chainId),
    [networks, chainId]
  );
}
