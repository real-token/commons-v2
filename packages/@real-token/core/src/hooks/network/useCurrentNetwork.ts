import { useChainId } from "wagmi";
import { RealTokenUiNetworkConfig } from "../../types/networks";
import { useGetNetworkById } from "./useGetNetworkById";

export function useCurrentNetwork<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig,
>(): T | undefined {
  const chainId = useChainId();
  return useGetNetworkById<T>(chainId);
}
