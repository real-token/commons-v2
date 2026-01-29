import type { AddTransactionParams, TxType } from "@real-token/aa-core";
import type {
  BalanceChange,
  ExplainTxResponse,
  TokenItem,
} from "./TxResponse";
import type { BaseTransaction } from "../utils/transactions/types";

// ============ GROUP STATUS ============

export type GroupStatus =
  | "pending" // En attente de simulation
  | "simulating" // Simulation en cours
  | "ready" // Toutes les txs simulées OK
  | "has_failures" // Au moins une tx va échouer
  | "confirmed" // Confirmé par l'utilisateur
  | "rejected"; // Rejeté par l'utilisateur

// ============ SIMULATION TYPES ============

export type SimulationStatus =
  | "pending"
  | "simulating"
  | "success"
  | "will_revert"
  | "error"
  | "depends_on_failed";

export interface SimulationResult {
  status: SimulationStatus;
  preExecSuccess: boolean;
  errorMessage?: string;
  errorCode?: number;
  gasUsed?: number;
  balanceChange?: BalanceChange;
  // Dependency analysis
  willFailBecauseOf?: string[]; // IDs of transactions that must succeed first
}

// ============ GAS ESTIMATION TYPES ============

export interface GasEstimate {
  gasUsed: number;
  gasLimit: number;
  gasCostWei: bigint;
  gasCostUsd: number;
  estimatedSeconds: number;
  nativeToken: {
    symbol: string;
    decimals: number;
    price: number;
  };
}

export interface TotalGasEstimate extends GasEstimate {
  itemCount: number;
  breakdown: Map<string, GasEstimate>; // Per-transaction breakdown by txId
}

// ============ CART TRANSACTION ============

export interface CartTransaction {
  id: string;
  groupId: string;
  index: number; // Position dans le groupe
  aaIndex?: number; // Index in aa-core's txs array
  txParams: AddTransactionParams;
  txType: TxType;
  // Decoded data
  decoded?: ExplainTxResponse;
  isDecoding: boolean;
  decodeError?: string;
  // Simulation
  simulation?: SimulationResult;
  // Gas
  gasEstimate?: GasEstimate;
}

// ============ TRANSACTION GROUP ============

export interface TransactionGroup {
  id: string;
  label: string;
  description?: string;
  transactions: CartTransaction[];
  status: GroupStatus;
  totalGasEstimate?: GasEstimate;
  addedAt: number;
  // Optional metadata
  source?: string; // e.g., 'walletconnect', 'dapp', 'yam'
  metadata?: Record<string, unknown>;
}

// ============ CART STATE ============

export interface TransactionCartState {
  groups: TransactionGroup[];
  isSimulating: boolean;
  isEstimating: boolean;
  totalGasEstimate?: TotalGasEstimate;
  error?: string;
}

// ============ CART CONFIG ============

export interface AddGroupConfig {
  label: string;
  description?: string;
  transactions: AddTransactionParams[];
  source?: string;
  metadata?: Record<string, unknown>;
}

// ============ CART ACTIONS ============

export interface CartActions {
  // Group operations
  addGroup: (config: AddGroupConfig) => Promise<TransactionGroup>;
  removeGroup: (groupId: string) => Promise<void>;
  clearCart: () => Promise<void>;

  // Simulation
  retrySimulation: (groupId?: string) => Promise<void>;

  // Execution
  confirmAll: () => Promise<void>;
  rejectAll: () => Promise<void>;
}

// ============ CONTEXT VALUE ============

export interface TransactionCartContextValue
  extends TransactionCartState,
    CartActions {
  // Computed values
  totalCount: number;
  groupCount: number;
  hasFailures: boolean;
  isReady: boolean;
}

// ============ UTILITY TYPES ============

export interface SimulateBatchResult {
  results: Map<string, SimulationResult>;
  allSuccess: boolean;
  failedCount: number;
}

export interface EstimateBatchResult {
  estimates: Map<string, GasEstimate>;
  total: TotalGasEstimate;
}
