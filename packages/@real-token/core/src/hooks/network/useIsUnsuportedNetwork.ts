import { useChainId } from "wagmi";
import { useAA } from "@real-token/aa-core";
import { useCurrentNetwork } from "./useCurrentNetwork";
import { useMemo } from "react";

export function useIsUnsuportedNetwork() {
  const { walletAddress } = useAA();
  const activeChain = useCurrentNetwork();
  const currentNetworkId = useChainId();

  return useMemo(() => {
    if (!currentNetworkId || !walletAddress) {
      return undefined;
    }
    return activeChain === undefined;
  }, [currentNetworkId, walletAddress, activeChain]);
}
