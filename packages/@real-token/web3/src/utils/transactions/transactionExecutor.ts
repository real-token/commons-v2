import { encodeFunctionData } from "viem";
import {
  BaseTransaction,
  TransactionResult,
  TransactionNotifications,
  ApproveTransactionData,
  Erc20TransferTransactionData,
  SignMessageErc20TransactionData,
  SignMessageCoinBridgeTransactionData,
} from "./types";
import { shouldSkipTransaction } from "./skipConditionHelpers";
import {
  TransactionProcessorDependencies,
  processTransaction,
} from "./transactionProcessor";
import {
  showTransactionPendingNotification,
  updateTransactionSuccessNotification,
  updateTransactionErrorNotification,
  updateTransactionWaitingBlockchainNotification,
} from "./notificationHelpers";
import { mergeWithDefaultNotifications } from "./notificationDefaultsWithComponents";
import { fetchTokenMetadata } from "./tokenHelpers";

// Standard ERC20 approve function ABI
const ERC20_APPROVE_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

// Standard ERC20 transfer function ABI
const ERC20_TRANSFER_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

/**
 * Preprocesses approve transactions to fetch missing token metadata and encode data
 */
async function preprocessApproveTransaction(
  txData: ApproveTransactionData,
  dependencies: TransactionProcessorDependencies
): Promise<BaseTransaction> {
  const { publicClient } = dependencies;

  let tokenSymbol = txData.tokenSymbol;
  let tokenDecimals = txData.tokenDecimals;

  // Fetch missing token metadata from blockchain if not provided
  if (!tokenSymbol || tokenDecimals === undefined) {
    if (!publicClient) {
      console.warn(
        "PublicClient not available, using defaults for token metadata"
      );
      tokenSymbol = tokenSymbol || "Unknown";
      tokenDecimals = tokenDecimals ?? 18;
    } else {
      try {
        const metadata = await fetchTokenMetadata(
          txData.tokenAddress,
          publicClient
        );
        tokenSymbol = tokenSymbol || metadata.symbol;
        tokenDecimals = tokenDecimals ?? metadata.decimals;
      } catch (error) {
        console.warn("Failed to fetch token metadata, using defaults:", error);
        tokenSymbol = tokenSymbol || "Unknown";
        tokenDecimals = tokenDecimals ?? 18;
      }
    }
  }

  // Encode the approve function call
  const data = encodeFunctionData({
    abi: ERC20_APPROVE_ABI,
    functionName: "approve",
    args: [txData.spenderAddress, BigInt(txData.amount)],
  });

  // Return as an onchain transaction with enriched metadata
  return {
    type: "erc20-approve", // Keep the approve type for notification purposes
    tokenAddress: txData.tokenAddress,
    spenderAddress: txData.spenderAddress,
    amount: txData.amount,
    tokenSymbol,
    tokenDecimals,
  } as ApproveTransactionData;
}

/**
 * Preprocesses transfer transactions to fetch missing token metadata and encode data
 */
async function preprocessErc20TransferTransaction(
  txData: Erc20TransferTransactionData,
  dependencies: TransactionProcessorDependencies
): Promise<BaseTransaction> {
  const { publicClient } = dependencies;

  let tokenSymbol = txData.tokenSymbol;
  let tokenDecimals = txData.tokenDecimals;

  // Fetch missing token metadata from blockchain if not provided
  if (!tokenSymbol || tokenDecimals === undefined) {
    if (!publicClient) {
      console.warn(
        "PublicClient not available, using defaults for token metadata"
      );
      tokenSymbol = tokenSymbol || "Unknown";
      tokenDecimals = tokenDecimals ?? 18;
    } else {
      try {
        const metadata = await fetchTokenMetadata(
          txData.tokenAddress,
          publicClient
        );
        tokenSymbol = tokenSymbol || metadata.symbol;
        tokenDecimals = tokenDecimals ?? metadata.decimals;
      } catch (error) {
        console.warn("Failed to fetch token metadata, using defaults:", error);
        tokenSymbol = tokenSymbol || "Unknown";
        tokenDecimals = tokenDecimals ?? 18;
      }
    }
  }

  // Return as an onchain transaction with enriched metadata
  return {
    type: "erc20-transfer", // Keep the transfer type for notification purposes
    tokenAddress: txData.tokenAddress,
    recipientAddress: txData.recipientAddress,
    amount: txData.amount,
    tokenSymbol,
    tokenDecimals,
  } as Erc20TransferTransactionData;
}

/**
 * Preprocesses ERC20 permit transactions to fetch missing token metadata
 */
async function preprocessErc20PermitTransaction(
  txData: SignMessageErc20TransactionData,
  dependencies: TransactionProcessorDependencies
): Promise<BaseTransaction> {
  const { publicClient } = dependencies;

  let tokenSymbol = txData.tokenSymbol;
  let tokenDecimals = txData.tokenDecimals;

  // Fetch missing token metadata from blockchain if not provided
  if (!tokenSymbol || tokenDecimals === undefined) {
    if (!publicClient) {
      console.warn(
        "PublicClient not available, using defaults for token metadata"
      );
      tokenSymbol = tokenSymbol || "Unknown";
      tokenDecimals = tokenDecimals ?? 18;
    } else {
      try {
        const metadata = await fetchTokenMetadata(
          txData.contractAddress,
          publicClient
        );
        tokenSymbol = tokenSymbol || metadata.symbol;
        tokenDecimals = tokenDecimals ?? metadata.decimals;
      } catch (error) {
        console.warn("Failed to fetch token metadata, using defaults:", error);
        tokenSymbol = tokenSymbol || "Unknown";
        tokenDecimals = tokenDecimals ?? 18;
      }
    }
  }

  // Return the permit transaction with enriched metadata
  return {
    ...txData,
    tokenSymbol,
    tokenDecimals,
  } as SignMessageErc20TransactionData;
}

/**
 * Preprocesses CoinBridge permit transactions to fetch missing token metadata
 */
async function preprocessCoinBridgePermitTransaction(
  txData: SignMessageCoinBridgeTransactionData,
  dependencies: TransactionProcessorDependencies
): Promise<BaseTransaction> {
  const { publicClient } = dependencies;

  let tokenSymbol = txData.tokenSymbol;
  let tokenDecimals = txData.tokenDecimals;

  // Fetch missing token metadata from blockchain if not provided
  if (!tokenSymbol || tokenDecimals === undefined) {
    if (!publicClient) {
      console.warn(
        "PublicClient not available, using defaults for token metadata"
      );
      tokenSymbol = tokenSymbol || "Unknown";
      tokenDecimals = tokenDecimals ?? 18;
    } else {
      try {
        const metadata = await fetchTokenMetadata(
          txData.contractAddress,
          publicClient
        );
        tokenSymbol = tokenSymbol || metadata.symbol;
        tokenDecimals = tokenDecimals ?? metadata.decimals;
      } catch (error) {
        console.warn("Failed to fetch token metadata, using defaults:", error);
        tokenSymbol = tokenSymbol || "Unknown";
        tokenDecimals = tokenDecimals ?? 18;
      }
    }
  }

  // Return the permit transaction with enriched metadata
  return {
    ...txData,
    tokenSymbol,
    tokenDecimals,
  } as SignMessageCoinBridgeTransactionData;
}

/**
 * Converts approve transaction to onchain transaction for processing
 */
function approveToOnchainTransaction(
  approveData: ApproveTransactionData
): BaseTransaction {
  const data = encodeFunctionData({
    abi: ERC20_APPROVE_ABI,
    functionName: "approve",
    args: [approveData.spenderAddress, BigInt(approveData.amount)],
  });

  return {
    type: "onchain",
    to: approveData.tokenAddress,
    data,
    value: BigInt(0),
  };
}

/**
 * Converts transfer transaction to onchain transaction for processing
 */
function transferToOnchainTransaction(
  transferData: Erc20TransferTransactionData
): BaseTransaction {
  const data = encodeFunctionData({
    abi: ERC20_TRANSFER_ABI,
    functionName: "transfer",
    args: [transferData.recipientAddress, BigInt(transferData.amount)],
  });

  return {
    type: "onchain",
    to: transferData.tokenAddress,
    data,
    value: BigInt(0),
  };
}

/**
 * Executes a transaction with complete notification handling
 * This is the shared function used by both useSendTransaction and useSendTransactions
 */
export async function executeTransactionWithNotifications(
  txData: BaseTransaction,
  dependencies: TransactionProcessorDependencies,
  customNotifications?: TransactionNotifications
): Promise<TransactionResult> {
  // Check if transaction should be skipped (for static transactions, no context needed)
  if (await shouldSkipTransaction(txData)) {
    return {
      success: true,
      txHash: undefined,
      contextData: {},
    };
  }

  let processedTxData = txData;

  // Preprocess approve transactions to fetch metadata and prepare for execution
  if (txData.type === "erc20-approve") {
    processedTxData = await preprocessApproveTransaction(txData, dependencies);
  }

  // Preprocess transfer transactions to fetch metadata and prepare for execution
  if (txData.type === "erc20-transfer") {
    processedTxData = await preprocessErc20TransferTransaction(txData, dependencies);
  }

  // Preprocess ERC20 permit transactions to fetch metadata
  if (txData.type === "signMessage-erc20") {
    processedTxData = await preprocessErc20PermitTransaction(txData, dependencies);
  }

  // Preprocess CoinBridge permit transactions to fetch metadata
  if (txData.type === "signMessage-coinBridge") {
    processedTxData = await preprocessCoinBridgePermitTransaction(txData, dependencies);
  }

  // Merge custom notifications with defaults based on transaction type
  const notifications = mergeWithDefaultNotifications(
    processedTxData,
    customNotifications,
    dependencies.blockExplorerUrl,
    dependencies.networkMappings
  );

  // Show initial pending notification
  const notificationId = showTransactionPendingNotification(notifications);

  try {
    // Convert approve/transfer to onchain for actual processing
    let txDataForProcessing = processedTxData;
    if (processedTxData.type === "erc20-approve") {
      txDataForProcessing = approveToOnchainTransaction(
        processedTxData as ApproveTransactionData
      );
    } else if (processedTxData.type === "erc20-transfer") {
      txDataForProcessing = transferToOnchainTransaction(
        processedTxData as Erc20TransferTransactionData
      );
    }

    // Create notification context for handling intermediate states
    const notificationContext = {
      notificationId,
      notifications,
      updateWaitingBlockchain: (txHash: string) => {
        updateTransactionWaitingBlockchainNotification(
          notificationId,
          txHash,
          dependencies.blockExplorerUrl,
          notifications
        );
      },
    };

    // Process the transaction (this handles the actual blockchain interaction)
    const result = await processTransaction(txDataForProcessing, dependencies, notificationContext);

    if (!result.success) {
      // Update notification with error
      updateTransactionErrorNotification(notificationId, notifications);
      throw result.error || new Error("Transaction failed");
    }

    // Update notification with success
    updateTransactionSuccessNotification(
      notificationId,
      result.txHash,
      dependencies.blockExplorerUrl,
      notifications
    );

    return result;
  } catch (error) {
    // Update notification with error
    updateTransactionErrorNotification(notificationId, notifications);
    throw error;
  }
}
