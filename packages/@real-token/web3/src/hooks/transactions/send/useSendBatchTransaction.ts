import { useAA } from "@real-token/aa-core";
import { useMutation } from "@tanstack/react-query";
import {
  Abi,
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  AbiStateMutability,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from "abitype";
import {
  ContractFunctionArgs,
  ContractFunctionName,
  encodeFunctionData,
  GetTransactionReceiptReturnType,
  UnionWiden,
  Widen,
} from "viem";

type Hex = `0x${string}`;

// types extracted from @wagmi/core/actions/readContracts
type SendTransactionBatchParameters<
  abi extends Abi | readonly unknown[] = Abi,
  mutability extends AbiStateMutability = AbiStateMutability,
  functionName extends ContractFunctionName<
    abi,
    mutability
  > = ContractFunctionName<abi, mutability>,
  args extends ContractFunctionArgs<
    abi,
    mutability,
    functionName
  > = ContractFunctionArgs<abi, mutability, functionName>,
  deployless extends boolean = false,
  allFunctionNames = ContractFunctionName<abi, mutability>,
  allArgs = ContractFunctionArgs<abi, mutability, functionName>,
> = {
  abi: abi;
  functionName:
    | allFunctionNames
    | (functionName extends allFunctionNames ? functionName : never);
  args?: (abi extends Abi ? UnionWiden<args> : never) | allArgs | undefined;
} & (readonly [] extends allArgs ? {} : { args: Widen<args> }) &
  (deployless extends true
    ? { address?: undefined; code: Hex }
    : { address: Address });

type UseSendBatchTransactionParameters = {
  onTxSent?: () => void;
  onSuccess?: (data: GetTransactionReceiptReturnType) => void;
  onError?: (error: Error) => void;
};

type UseSendBatchTransactionReturnType<
  transactions extends
    readonly unknown[] = readonly SendTransactionBatchParameters[],
> = {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  sendBatchTransactions: (transactions: transactions) => void;
  sendBatchTransactionsAsync: (
    transactions: transactions
  ) => Promise<GetTransactionReceiptReturnType>;
};

export function useSendBatchTransaction<
  const transactions extends readonly SendTransactionBatchParameters[],
>({
  onTxSent,
  onSuccess,
  onError,
}: UseSendBatchTransactionParameters): UseSendBatchTransactionReturnType<transactions> {
  const { addTransaction, sendBundles } = useAA();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (transactions: transactions) => {
      onTxSent?.();

      const batchTransactions = transactions.map(
        ({ to, value, abi, functionName, args }: any) => {
          const data = encodeFunctionData({
            abi: abi as Abi,
            functionName: functionName as string,
            args: args as any,
          });

          return {
            to,
            data,
            value,
          };
        }
      );

      for (const transaction of batchTransactions) {
        await addTransaction(transaction);
      }
      const bundle = await sendBundles();
      if (bundle.status === "success") {
        return bundle;
      } else {
        throw new Error(
          `Failed to send batch transactions: ${bundle.transactionHash}`
        );
      }
    },
    onSuccess: (data) => {
      onSuccess?.(data as any);
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  const sendBatchTransactions = (transactions: transactions) => {
    mutate(transactions);
  };

  const sendBatchTransactionsAsync = (transactions: transactions) => {
    return mutateAsync(transactions);
  };

  return {
    isPending,
    isError,
    isSuccess,
    sendBatchTransactions,
    sendBatchTransactionsAsync,
  };
}
