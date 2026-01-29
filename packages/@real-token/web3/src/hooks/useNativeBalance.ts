import { useBalance, useChainId } from "wagmi";
import { useAA } from "@real-token/aa-core";
import { formatUnits } from "viem";

export interface NativeBalanceResult {
  balance: bigint;
  formatted: string;
  symbol: string;
  decimals: number;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useNativeBalance(): NativeBalanceResult {
  const { walletAddress } = useAA();
  const chainId = useChainId();

  const { data, isLoading, isError, refetch } = useBalance({
    address: walletAddress as `0x${string}` | undefined,
    chainId,
    query: {
      enabled: !!walletAddress,
      refetchInterval: 30000,
    },
  });

  return {
    balance: data?.value ?? BigInt(0),
    formatted: data ? formatUnits(data.value, data.decimals) : "0",
    symbol: data?.symbol ?? "ETH",
    decimals: data?.decimals ?? 18,
    isLoading,
    isError,
    refetch,
  };
}
