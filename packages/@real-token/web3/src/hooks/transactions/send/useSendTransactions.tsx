import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { useTxManager } from "../../../context/TxManagerContext";
import { useIsAA } from "../..";
import { useCurrentNetwork } from "@real-token/core";
import {
  TransactionProcessorDependencies,
  Transaction,
  TransactionResult,
  BaseTransactionContext,
  BaseTransaction,
} from "../../../utils/transactions";
import { executeTransactionWithNotifications } from "../../../utils/transactions/transactionExecutor";
import { shouldSkipTransaction } from "../../../utils/transactions/skipConditionHelpers";
import {
  MultipleTransactionHookParameters,
  MultipleTransactionsHookReturnType,
} from "../shared/multipleTransactionsHookTypes";

export function useSendTransactions<T = BaseTransactionContext>({
  initialContext,
  onSent,
  onSuccess,
  onAllComplete,
  onError,
}: MultipleTransactionHookParameters<T> = {}): MultipleTransactionsHookReturnType<T> {
  const txManager = useTxManager();
  const publicClient = usePublicClient();
  const isAA = useIsAA();
  const currentNetwork = useCurrentNetwork();

  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  const transactionDependencies: TransactionProcessorDependencies = {
    txManager,
    publicClient,
    isAA,
    blockExplorerUrl: currentNetwork?.blockExplorerUrl,
  };

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (
      transactionsInput: Transaction<T>[] | Promise<Transaction<T>[]>
    ) => {
      onSent?.();

      // Resolve transactions if it's a promise
      const transactions = await Promise.resolve(transactionsInput);

      setCurrentTransactionIndex(0);
      setTotalTransactions(transactions.length);

      const results: TransactionResult[] = [];
      const context = { ...initialContext } as T; // Initialize context with provided initial values

      for (let i = 0; i < transactions.length; i++) {
        setCurrentTransactionIndex(i + 1);

        const transaction = transactions[i];

        // Check if transaction should be skipped (for dynamic transactions)
        if (await shouldSkipTransaction(transaction, context)) {
          // Skip this transaction, continue to next
          continue;
        }

        let baseTransaction: BaseTransaction;
        let notifications: any;

        // Check if it's a dynamic transaction with prepareTransaction
        if ("prepareTransaction" in transaction) {
          // Dynamic transaction - prepare with context
          baseTransaction = await transaction.prepareTransaction(context);
          notifications = transaction.notifications;
        } else {
          // Static transaction - extract notifications
          const { notifications: txNotifications, ...txData } = transaction;
          baseTransaction = txData as BaseTransaction;
          notifications = txNotifications;
        }

        // Use the shared executor for each transaction
        const result = await executeTransactionWithNotifications(
          baseTransaction,
          transactionDependencies,
          notifications
        );

        if (!result.success) {
          throw result.error || new Error(`Transaction ${i + 1} failed`);
        }

        // Update context with result data for next transactions
        if (result.contextData) {
          Object.assign(context as any, result.contextData);
        }

        results.push(result);
      }

      return results;
    },
    onSuccess: (results) => {
      onSuccess?.(results);
      onAllComplete?.(results); // Support both onSuccess and onAllComplete
    },
    onError: (error: Error) => {
      console.error("Batch transaction process failed:", error);
      onError?.(error);
    },
  });

  const sendTransactions = (
    transactions: Transaction<T>[] | Promise<Transaction<T>[]>
  ) => {
    mutate(transactions);
  };

  const sendTransactionsAsync = (
    transactions: Transaction<T>[] | Promise<Transaction<T>[]>
  ) => {
    return mutateAsync(transactions);
  };

  return {
    isPending,
    isError,
    isSuccess,
    currentTransactionIndex,
    totalTransactions,
    sendTransactions,
    sendTransactionsAsync,
  };
}
