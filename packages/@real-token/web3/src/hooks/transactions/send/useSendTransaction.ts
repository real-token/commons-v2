import { useMutation } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { useTxManager } from "../../../context/TxManagerContext";
import { useIsAA } from "../../useIsAA";
import { useCurrentNetwork } from "@real-token/core";
import {
  TransactionProcessorDependencies,
  Transaction,
  BaseTransactionContext,
  BaseTransaction,
} from "../../../utils/transactions";
import { executeTransactionWithNotifications } from "../../../utils/transactions/transactionExecutor";
import { shouldSkipTransaction } from "../../../utils/transactions/skipConditionHelpers";
import {
  BaseTransactionHookParameters,
  SingleTransactionHookReturnType,
} from "../shared/singleTransactionHookTypes";

export function useSendTransaction<T = BaseTransactionContext>({
  initialContext,
  onSent,
  onSuccess,
  onError,
}: BaseTransactionHookParameters<T> = {}): SingleTransactionHookReturnType<T> {
  const txManager = useTxManager();
  const publicClient = usePublicClient();
  const isAA = useIsAA();
  const currentNetwork = useCurrentNetwork();

  const transactionDependencies: TransactionProcessorDependencies = {
    txManager,
    publicClient,
    isAA,
    blockExplorerUrl: currentNetwork?.blockExplorerUrl,
  };

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (
      transactionInput: Transaction<T> | Promise<Transaction<T>>
    ) => {
      onSent?.();

      // Resolve transaction if it's a promise
      const transaction = await Promise.resolve(transactionInput);

      // Initialize context for skip condition evaluation
      const context = { ...initialContext } as T;

      // Check if transaction should be skipped (for dynamic transactions)
      if (await shouldSkipTransaction(transaction, context)) {
        // Return success without executing
        return {
          success: true,
          txHash: undefined,
          contextData: {},
        };
      }

      let baseTransaction: BaseTransaction;
      let notifications: any;

      // Check if it's a dynamic transaction with prepareTransaction
      if ("prepareTransaction" in transaction) {
        // Dynamic transaction - prepare with initial context
        const context = { ...initialContext } as T;
        baseTransaction = await transaction.prepareTransaction(context);
        notifications = transaction.notifications;
      } else {
        // Static transaction - extract notifications
        const { notifications: txNotifications, ...txData } = transaction;
        baseTransaction = txData as BaseTransaction;
        notifications = txNotifications;
      }

      return await executeTransactionWithNotifications(
        baseTransaction,
        transactionDependencies,
        notifications
      );
    },
    onSuccess: (result) => {
      onSuccess?.(result);
    },
    onError: (error: Error) => {
      console.error("Transaction error:", error);
      onError?.(error);
    },
  });

  const sendTransaction: SingleTransactionHookReturnType<T>["sendTransaction"] =
    (transaction) => {
      mutate(transaction);
    };

  const sendTransactionAsync: SingleTransactionHookReturnType<T>["sendTransactionAsync"] =
    (transaction) => {
      return mutateAsync(transaction);
    };

  return {
    isPending,
    isError,
    isSuccess,
    sendTransaction,
    sendTransactionAsync,
  };
}
