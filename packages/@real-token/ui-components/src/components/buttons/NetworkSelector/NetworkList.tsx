import { useNetworksConfig, useRealTokenUIConfig } from "@real-token/core";
import { NetworkMenuItem } from "./NetworkMenuItem";

export const NetworkList = () => {
  const { showNetworks } = useRealTokenUIConfig();
  const networks = useNetworksConfig(showNetworks);

  return (
    <>
      {networks.map((network) => (
        <NetworkMenuItem network={network} key={`chain-${network.chainId}`} />
      ))}
    </>
  );
};
