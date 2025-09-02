import { RealTokenUiNetworkConfig } from "../types";

export function readCurrentNetworkConfig<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig,
>(networksConfig: T[], networkId: number): T | undefined {
  const currentNetworkConfig = networksConfig.find(
    (network) => Number(network.chainId) === Number(networkId)
  );
  if (!currentNetworkConfig) {
    throw new Error(`Network config not found for network id: ${networkId}`);
  }
  return currentNetworkConfig;
}
