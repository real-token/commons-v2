import { Tx } from "@/types/Tx";
import { AddTransactionParams, useAA } from "@real-token/aa-core";
import { useQuery } from "@tanstack/react-query";
import { handleSendTransaction } from "@/utils/decode/decode";
import { useNetworksConfig } from "@real-token/core";
import { useChainId } from "wagmi";
import { BigNumber } from "bignumber.js";

type UseDecodeTransactions = (
  tx: AddTransactionParams,
  chainId: string | number | undefined
) => {
  decodeData: Tx;
  decodeLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const useDecodeTransactions: UseDecodeTransactions = (tx) => {
  const { walletAddress } = useAA();

  const networks = useNetworksConfig();
  const chainId = useChainId();

  const {
    data: decodeData,
    isLoading: decodeLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["decodeAaTransaction", tx?.data],
    enabled: !!walletAddress && !!chainId && !!tx,
    retry: 1,
    queryFn: async () => {
      if (!walletAddress) throw new Error("Wallet address is required");
      if (!chainId) throw new Error("Chain id is required");

      const parsedChainId = chainId.toString().includes(":")
        ? chainId.toString().split(":")[1]
        : chainId.toString().includes("0x")
          ? chainId.toString().split("0x")[1]
          : chainId;

      const chainConfig = networks.find(
        (network) =>
          parseInt(network.chainId) === parseInt(parsedChainId.toString())
      );

      if (!chainConfig) throw new Error("Chain config is required");

      const origin = window.location.origin;

      const txParsed = {
        ...tx,
        from: walletAddress,
        value: tx.value ? BigNumber(tx.value).toString(10) : "0x0",
      };

      console.log(txParsed);

      const decodeResult = await handleSendTransaction(
        txParsed,
        chainConfig.serverChainId,
        chainId,
        walletAddress,
        origin
      );

      if (decodeResult == undefined) {
        throw new Error("Failed to decode transaction");
      }
      return decodeResult as any;
    },
  });

  return { decodeData, decodeLoading, isError, refetch };
};
