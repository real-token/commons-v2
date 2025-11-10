import { 
  Transaction, 
  TransactionResult, 
  BaseTransactionContext 
} from "../../../utils/transactions";

export interface BaseTransactionHookParameters<T = BaseTransactionContext> {
  initialContext?: Partial<T>;
  onSent?: () => void;
  onSuccess?: (result: TransactionResult) => void;
  onError?: (error: Error) => void;
}

export interface SingleTransactionHookReturnType<T = BaseTransactionContext> {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  sendTransaction: (transaction: Transaction<T> | Promise<Transaction<T>>) => void;
  sendTransactionAsync: (transaction: Transaction<T> | Promise<Transaction<T>>) => Promise<TransactionResult>;
}
