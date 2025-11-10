import { 
  Transaction, 
  TransactionResult, 
  BaseTransactionContext 
} from "../../../utils/transactions";

export interface MultipleTransactionHookParameters<T = BaseTransactionContext> {
  initialContext?: Partial<T>;
  onSent?: () => void;
  onSuccess?: (results: TransactionResult[]) => void;
  onAllComplete?: (results: TransactionResult[]) => void; // Alias for onSuccess for backward compatibility
  onError?: (error: Error) => void;
}

export interface MultipleTransactionsHookReturnType<T = BaseTransactionContext> {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  currentTransactionIndex: number;
  totalTransactions: number;
  sendTransactions: (transactions: Transaction<T>[] | Promise<Transaction<T>[]>) => void;
  sendTransactionsAsync: (transactions: Transaction<T>[] | Promise<Transaction<T>[]>) => Promise<TransactionResult[]>;
}
