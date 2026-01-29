import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { useAA } from "@real-token/aa-core";
import { useChainId } from "wagmi";
import { useCurrentNetwork } from "@real-token/core";
import { handleSendTransaction } from "../utils/decode/decode";
import { generateId } from "../utils/generateId";
import type {
  TransactionCartState,
  TransactionCartContextValue,
  TransactionGroup,
  CartTransaction,
  AddGroupConfig,
  GroupStatus,
  SimulationResult,
  GasEstimate,
  TotalGasEstimate,
} from "../types/cart";

// ============ REDUCER ACTIONS ============

type CartAction =
  | { type: "ADD_GROUP"; payload: TransactionGroup }
  | { type: "REMOVE_GROUP"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_GROUP"; payload: { id: string; updates: Partial<TransactionGroup> } }
  | { type: "UPDATE_TRANSACTION"; payload: { groupId: string; txId: string; updates: Partial<CartTransaction> } }
  | { type: "SET_SIMULATING"; payload: boolean }
  | { type: "SET_ESTIMATING"; payload: boolean }
  | { type: "SET_TOTAL_GAS"; payload: TotalGasEstimate | undefined }
  | { type: "SET_ERROR"; payload: string | undefined };

// ============ INITIAL STATE ============

const initialState: TransactionCartState = {
  groups: [],
  isSimulating: false,
  isEstimating: false,
  totalGasEstimate: undefined,
  error: undefined,
};

// ============ REDUCER ============

function cartReducer(state: TransactionCartState, action: CartAction): TransactionCartState {
  switch (action.type) {
    case "ADD_GROUP":
      return { ...state, groups: [...state.groups, action.payload] };

    case "REMOVE_GROUP":
      return {
        ...state,
        groups: state.groups.filter((g) => g.id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...initialState,
      };

    case "UPDATE_GROUP":
      return {
        ...state,
        groups: state.groups.map((g) =>
          g.id === action.payload.id ? { ...g, ...action.payload.updates } : g
        ),
      };

    case "UPDATE_TRANSACTION":
      return {
        ...state,
        groups: state.groups.map((g) => {
          if (g.id !== action.payload.groupId) return g;
          return {
            ...g,
            transactions: g.transactions.map((tx) =>
              tx.id === action.payload.txId
                ? { ...tx, ...action.payload.updates }
                : tx
            ),
          };
        }),
      };

    case "SET_SIMULATING":
      return { ...state, isSimulating: action.payload };

    case "SET_ESTIMATING":
      return { ...state, isEstimating: action.payload };

    case "SET_TOTAL_GAS":
      return { ...state, totalGasEstimate: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// ============ CONTEXT ============

const TransactionCartContext = createContext<TransactionCartContextValue | null>(null);

// ============ HOOK ============

export const useTransactionCart = (): TransactionCartContextValue => {
  const context = useContext(TransactionCartContext);
  if (!context) {
    throw new Error("useTransactionCart must be used within TransactionCartProvider");
  }
  return context;
};

// ============ PROVIDER ============

interface TransactionCartProviderProps {
  children: React.ReactNode;
}

export const TransactionCartProvider: React.FC<TransactionCartProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { addTransaction, refuseTx, confirmAllTxs, refuseAllTxs, walletAddress } = useAA();
  const chainId = useChainId();
  const networkConfig = useCurrentNetwork();

  // ============ SIMULATION ============

  const simulateTransaction = useCallback(
    async (tx: CartTransaction): Promise<SimulationResult> => {
      if (!walletAddress || !networkConfig?.serverChainId) {
        return {
          status: "error",
          preExecSuccess: false,
          errorMessage: "Missing wallet address or network config",
        };
      }

      try {
        const result = await handleSendTransaction(
          {
            ...tx.txParams,
            from: walletAddress,
            value: tx.txParams.value?.toString() || "0x0",
          },
          networkConfig.serverChainId,
          chainId,
          walletAddress,
          window.location.origin
        );

        const preExecSuccess = result.preExecutedTx?.pre_exec?.success ?? true;

        return {
          status: preExecSuccess ? "success" : "will_revert",
          preExecSuccess,
          errorMessage: result.preExecutedTx?.pre_exec?.error?.msg,
          errorCode: result.preExecutedTx?.pre_exec?.error?.code,
          gasUsed: result.preExecutedTx?.gas?.gas_used,
          balanceChange: result.preExecutedTx?.balance_change,
        };
      } catch (error) {
        return {
          status: "error",
          preExecSuccess: false,
          errorMessage: error instanceof Error ? error.message : "Simulation failed",
        };
      }
    },
    [walletAddress, networkConfig?.serverChainId, chainId]
  );

  const estimateGasForTransaction = useCallback(
    async (tx: CartTransaction): Promise<GasEstimate | undefined> => {
      if (!walletAddress || !networkConfig?.serverChainId) {
        return undefined;
      }

      try {
        const result = await handleSendTransaction(
          {
            ...tx.txParams,
            from: walletAddress,
            value: tx.txParams.value?.toString() || "0x0",
          },
          networkConfig.serverChainId,
          chainId,
          walletAddress,
          window.location.origin
        );

        const gas = result.preExecutedTx?.gas;
        const nativeToken = result.preExecutedTx?.native_token;

        if (!gas) return undefined;

        return {
          gasUsed: gas.gas_used || 0,
          gasLimit: gas.gas_limit || 0,
          gasCostWei: BigInt(gas.estimated_gas_cost_value || 0),
          gasCostUsd: gas.estimated_gas_cost_usd_value || 0,
          estimatedSeconds: gas.estimated_seconds || 0,
          nativeToken: {
            symbol: nativeToken?.symbol || "ETH",
            decimals: nativeToken?.decimals || 18,
            price: nativeToken?.price || 0,
          },
        };
      } catch {
        return undefined;
      }
    },
    [walletAddress, networkConfig?.serverChainId, chainId]
  );

  // ============ SIMULATE AND ESTIMATE GROUP ============

  const simulateAndEstimateGroup = useCallback(
    async (group: TransactionGroup) => {
      dispatch({ type: "SET_SIMULATING", payload: true });
      dispatch({ type: "SET_ESTIMATING", payload: true });

      let hasFailures = false;
      let totalGasUsd = 0;
      let totalGasUsed = 0;
      let nativeTokenInfo: GasEstimate["nativeToken"] | undefined;

      for (const tx of group.transactions) {
        // Update transaction to simulating state
        dispatch({
          type: "UPDATE_TRANSACTION",
          payload: {
            groupId: group.id,
            txId: tx.id,
            updates: { simulation: { status: "simulating", preExecSuccess: false } },
          },
        });

        // Simulate and estimate in one call (handleSendTransaction does both)
        const simulation = await simulateTransaction(tx);
        const gasEstimate = await estimateGasForTransaction(tx);

        if (simulation.status !== "success") {
          hasFailures = true;
        }

        if (gasEstimate) {
          totalGasUsd += gasEstimate.gasCostUsd;
          totalGasUsed += gasEstimate.gasUsed;
          if (!nativeTokenInfo) {
            nativeTokenInfo = gasEstimate.nativeToken;
          }
        }

        // Update transaction with results
        dispatch({
          type: "UPDATE_TRANSACTION",
          payload: {
            groupId: group.id,
            txId: tx.id,
            updates: { simulation, gasEstimate },
          },
        });
      }

      // Update group status and total gas
      const groupGasEstimate: GasEstimate | undefined = nativeTokenInfo
        ? {
            gasUsed: totalGasUsed,
            gasLimit: Math.ceil(totalGasUsed * 1.2),
            gasCostWei: BigInt(0), // Would need to sum properly
            gasCostUsd: totalGasUsd,
            estimatedSeconds: group.transactions.length * 15,
            nativeToken: nativeTokenInfo,
          }
        : undefined;

      const newStatus: GroupStatus = hasFailures ? "has_failures" : "ready";

      dispatch({
        type: "UPDATE_GROUP",
        payload: {
          id: group.id,
          updates: { status: newStatus, totalGasEstimate: groupGasEstimate },
        },
      });

      dispatch({ type: "SET_SIMULATING", payload: false });
      dispatch({ type: "SET_ESTIMATING", payload: false });
    },
    [simulateTransaction, estimateGasForTransaction]
  );

  // ============ ACTIONS ============

  const addGroup = useCallback(
    async (config: AddGroupConfig): Promise<TransactionGroup> => {
      const groupId = generateId();
      const transactions: CartTransaction[] = [];

      // Add each transaction to aa-core and track indices
      for (let i = 0; i < config.transactions.length; i++) {
        const txParams = config.transactions[i];
        const result = addTransaction(txParams);

        transactions.push({
          id: generateId(),
          groupId,
          index: i,
          aaIndex: result.index,
          txParams,
          txType: result.type,
          isDecoding: false,
        });
      }

      const group: TransactionGroup = {
        id: groupId,
        label: config.label,
        description: config.description,
        transactions,
        status: "pending",
        addedAt: Date.now(),
        source: config.source,
        metadata: config.metadata,
      };

      dispatch({ type: "ADD_GROUP", payload: group });

      // Start simulation and estimation asynchronously
      simulateAndEstimateGroup(group);

      return group;
    },
    [addTransaction, simulateAndEstimateGroup]
  );

  const removeGroup = useCallback(
    async (groupId: string) => {
      const group = state.groups.find((g) => g.id === groupId);
      if (!group) return;

      // Refuse all transactions in the group from aa-core
      for (const tx of group.transactions) {
        if (tx.aaIndex !== undefined) {
          await refuseTx(tx.aaIndex, tx.txType);
        }
      }

      dispatch({ type: "REMOVE_GROUP", payload: groupId });
    },
    [state.groups, refuseTx]
  );

  const clearCart = useCallback(async () => {
    await refuseAllTxs();
    dispatch({ type: "CLEAR_CART" });
  }, [refuseAllTxs]);

  const retrySimulation = useCallback(
    async (groupId?: string) => {
      if (groupId) {
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
          dispatch({
            type: "UPDATE_GROUP",
            payload: { id: groupId, updates: { status: "pending" } },
          });
          await simulateAndEstimateGroup(group);
        }
      } else {
        // Retry all groups
        for (const group of state.groups) {
          dispatch({
            type: "UPDATE_GROUP",
            payload: { id: group.id, updates: { status: "pending" } },
          });
          await simulateAndEstimateGroup(group);
        }
      }
    },
    [state.groups, simulateAndEstimateGroup]
  );

  const confirmAll = useCallback(async () => {
    await confirmAllTxs();
    dispatch({ type: "CLEAR_CART" });
  }, [confirmAllTxs]);

  const rejectAll = useCallback(async () => {
    await refuseAllTxs();
    dispatch({ type: "CLEAR_CART" });
  }, [refuseAllTxs]);

  // ============ COMPUTED VALUES ============

  const totalCount = useMemo(
    () => state.groups.reduce((acc, g) => acc + g.transactions.length, 0),
    [state.groups]
  );

  const groupCount = useMemo(() => state.groups.length, [state.groups]);

  const hasFailures = useMemo(
    () => state.groups.some((g) => g.status === "has_failures"),
    [state.groups]
  );

  const isReady = useMemo(
    () =>
      state.groups.length > 0 &&
      state.groups.every((g) => g.status === "ready") &&
      !state.isSimulating,
    [state.groups, state.isSimulating]
  );

  // ============ TOTAL GAS CALCULATION ============

  const totalGasEstimate = useMemo((): TotalGasEstimate | undefined => {
    if (state.groups.length === 0) return undefined;

    let totalGasUsed = 0;
    let totalGasCostUsd = 0;
    let nativeTokenInfo: GasEstimate["nativeToken"] | undefined;
    const breakdown = new Map<string, GasEstimate>();

    for (const group of state.groups) {
      for (const tx of group.transactions) {
        if (tx.gasEstimate) {
          totalGasUsed += tx.gasEstimate.gasUsed;
          totalGasCostUsd += tx.gasEstimate.gasCostUsd;
          breakdown.set(tx.id, tx.gasEstimate);
          if (!nativeTokenInfo) {
            nativeTokenInfo = tx.gasEstimate.nativeToken;
          }
        }
      }
    }

    if (!nativeTokenInfo) return undefined;

    return {
      gasUsed: totalGasUsed,
      gasLimit: Math.ceil(totalGasUsed * 1.2),
      gasCostWei: BigInt(0),
      gasCostUsd: totalGasCostUsd,
      estimatedSeconds: totalCount * 15,
      nativeToken: nativeTokenInfo,
      itemCount: totalCount,
      breakdown,
    };
  }, [state.groups, totalCount]);

  // ============ CONTEXT VALUE ============

  const value: TransactionCartContextValue = useMemo(
    () => ({
      ...state,
      totalGasEstimate,
      // Computed
      totalCount,
      groupCount,
      hasFailures,
      isReady,
      // Actions
      addGroup,
      removeGroup,
      clearCart,
      retrySimulation,
      confirmAll,
      rejectAll,
    }),
    [
      state,
      totalGasEstimate,
      totalCount,
      groupCount,
      hasFailures,
      isReady,
      addGroup,
      removeGroup,
      clearCart,
      retrySimulation,
      confirmAll,
      rejectAll,
    ]
  );

  return (
    <TransactionCartContext.Provider value={value}>
      {children}
    </TransactionCartContext.Provider>
  );
};
