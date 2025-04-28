import { Tx } from "@/types/transactions/Tx";
import { EIP155_SIGNING_METHODS, useAA } from "@real-token/aa-core";
import { WalletKitTypes } from "@reown/walletkit/dist/types";
import { useQuery } from "@tanstack/react-query";
import { decodeTransaction } from "@/utils/decode/decode";
import { useNetworksConfig } from "@real-token/core";

type UseDecodeTransactions = (
  tx: WalletKitTypes.SessionRequest,
  chainId: string | number | undefined
) => {
  decodeData: Tx;
  decodeLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const useDecodeTransactions: UseDecodeTransactions = (tx, chainId) => {
  const { walletAddress } = useAA();

  const networks = useNetworksConfig();

  const {
    data: decodeData,
    isLoading: decodeLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["decodeTransactions", tx.id],
    enabled: !!walletAddress && !!chainId,
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

      const txData = tx.params.request.params[0];
      const typedData = tx.params.request.params[1];

      const origin = tx.verifyContext.verified.origin;

      if (tx.params.request.method == EIP155_SIGNING_METHODS.PERSONAL_SIGN) {
        return undefined;
      }

      const decodeResult = await decodeTransaction(
        txData,
        chainConfig.serverChainId,
        Number(parsedChainId),
        walletAddress,
        origin,
        tx.params.request.method,
        typedData
      );
      if (decodeResult == undefined) {
        throw new Error("Failed to decode transaction");
      }
      return decodeResult;
    },
  });

  return { decodeData, decodeLoading, isError, refetch };
};
