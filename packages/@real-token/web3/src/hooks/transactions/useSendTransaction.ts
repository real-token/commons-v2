import { useAA } from "@real-token/aa-core";
import { useMutation } from "@tanstack/react-query";
import {
  Abi,
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from "abitype";
import { encodeFunctionData } from "viem";

type UseSendTransactionReturnType = {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  sendTransaction: <
    abi extends Abi,
    functionName extends ExtractAbiFunctionNames<abi, "nonpayable" | "payable">,
    abiFunction extends AbiFunction = ExtractAbiFunction<abi, functionName>,
  >(params: {
    abi: abi;
    functionName:
      | functionName
      | ExtractAbiFunctionNames<abi, "nonpayable" | "payable">;
    args: AbiParametersToPrimitiveTypes<abiFunction["inputs"], "inputs">;
    to: `0x${string}`;
    value?: bigint;
  }) => void;
  // sendTransactionAsync: <
  //   abi extends Abi,
  //   functionName extends ExtractAbiFunctionNames<abi, "nonpayable" | "payable">,
  //   abiFunction extends AbiFunction = ExtractAbiFunction<abi, functionName>,
  // >(params: {
  //   abi: abi;
  //   functionName:
  //     | functionName
  //     | ExtractAbiFunctionNames<abi, "nonpayable" | "payable">;
  //   args: AbiParametersToPrimitiveTypes<abiFunction["inputs"], "inputs">;
  //   to: `0x${string}`;
  //   value?: bigint;
  // }) => Promise<GetTransactionReceiptReturnType>;
};

interface UseSendTransactionParameters {
  onSent?: () => void;
  onSuccess?: (data: {
    txHash: string;
    sigs: string;
    aaSignatures: string[];
  }) => void;
  onError?: (error: Error) => void;
}
export function useSendTransaction({
  onSent,
  onSuccess,
  onError,
}: UseSendTransactionParameters): UseSendTransactionReturnType {
  const { addTransaction, confirmAllTxs } = useAA();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: async ({
      to,
      data,
      value,
    }: {
      to: `0x${string}`;
      data: `0x${string}`;
      value: bigint | undefined;
    }) => {
      onSent?.();
      await addTransaction({
        to,
        data,
        value,
      });
      const { txHash, sigs, aaSignatures } = await confirmAllTxs();
      if (!txHash || txHash.length == 0) {
        throw new Error("Missing txHash");
      }
      return {
        txHash: txHash[0],
        sigs: sigs[0],
        aaSignatures: aaSignatures,
      };
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  const sendTransaction: UseSendTransactionReturnType["sendTransaction"] = ({
    to,
    value,
    abi,
    functionName,
    args,
  }) => {
    const data = encodeFunctionData({
      abi: abi as Abi,
      functionName: functionName as string,
      args: args as any,
    });
    mutate({ to, data, value });
  };

  // const sendTransactionAsync: UseSendTransactionReturnType["sendTransaction"] =
  //   ({ to, value, abi, functionName, args }) => {
  //     const data = encodeFunctionData({
  //       abi: abi as Abi,
  //       functionName: functionName as string,
  //       args: args as any,
  //     });
  //     return mutateAsync({ to, data, value });
  //   };

  return {
    isPending,
    isError,
    isSuccess,
    sendTransaction,
    // sendTransactionAsync,
  };
}
