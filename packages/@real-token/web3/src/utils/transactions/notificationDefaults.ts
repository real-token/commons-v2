import {
  BaseTransaction,
  TransactionNotifications,
  NotificationConfig,
} from "./types";
import { formatTokenAmount } from "./tokenHelpers";

// Default notification configurations for each transaction type
const DEFAULT_NOTIFICATIONS = {
  onchain: {
    onSent: {
      title: "Transaction Pending",
      message: "Please confirm the transaction in your wallet",
    },
    onWaitingBlockchain: {
      title: "Waiting for blockchain validation",
      message: "Your transaction is being validated on the blockchain",
    },
    onComplete: {
      title: "Transaction Confirmed",
      message: "Your transaction has been successfully confirmed",
    },
    onFail: {
      title: "Transaction Failed",
      message: "An error occurred while processing your transaction",
    },
  },
  native: {
    onSent: {
      title: "Transfer Pending",
      message: "Please confirm the native token transfer in your wallet",
    },
    onWaitingBlockchain: {
      title: "Waiting for blockchain validation",
      message: "Your transfer is being validated on the blockchain",
    },
    onComplete: {
      title: "Transfer Confirmed",
      message: "Your native token transfer has been successfully confirmed",
    },
    onFail: {
      title: "Transfer Failed",
      message: "An error occurred while processing your transfer",
    },
  },
  "erc20-approve": {
    onSent: {
      title: "Approval Pending",
      message: "Please confirm the token approval in your wallet",
    },
    onWaitingBlockchain: {
      title: "Waiting for blockchain validation",
      message: "Your approval is being validated on the blockchain",
    },
    onComplete: {
      title: "Approval Confirmed",
      message: "Token approval has been successfully confirmed",
    },
    onFail: {
      title: "Approval Failed",
      message: "An error occurred while processing the token approval",
    },
  },
  "erc20-transfer": {
    onSent: {
      title: "Transfer Pending",
      message: "Please confirm the token transfer in your wallet",
    },
    onWaitingBlockchain: {
      title: "Waiting for blockchain validation",
      message: "Your transfer is being validated on the blockchain",
    },
    onComplete: {
      title: "Transfer Confirmed",
      message: "Token transfer has been successfully confirmed",
    },
    onFail: {
      title: "Transfer Failed",
      message: "An error occurred while processing the token transfer",
    },
  },
  "signMessage-erc20": {
    onSent: {
      title: "Signature Pending",
      message: "Please sign the ERC20 permit message in your wallet",
    },
    onComplete: {
      title: "Signature Confirmed",
      message: "ERC20 permit signature has been successfully created",
    },
    onFail: {
      title: "Signature Failed",
      message: "An error occurred while signing the ERC20 permit",
    },
  },
  "signMessage-coinBridge": {
    onSent: {
      title: "Signature Pending",
      message: "Please sign the CoinBridge permit message in your wallet",
    },
    onComplete: {
      title: "Signature Confirmed",
      message: "CoinBridge permit signature has been successfully created",
    },
    onFail: {
      title: "Signature Failed",
      message: "An error occurred while signing the CoinBridge permit",
    },
  },
  signMessage: {
    onSent: {
      title: "Signature Pending",
      message: "Please sign the message in your wallet",
    },
    onComplete: {
      title: "Signature Confirmed",
      message: "Message has been successfully signed",
    },
    onFail: {
      title: "Signature Failed",
      message: "An error occurred while signing the message",
    },
  },
} as const;

/**
 * Creates specialized notifications for approve transactions
 */
function createApproveNotifications(
  tokenSymbol: string,
  formattedAmount: string,
  spenderAddress: string
): {
  onSent: NotificationConfig;
  onComplete: NotificationConfig;
  onFail: NotificationConfig;
} {
  const shortSpender = `${spenderAddress.slice(0, 6)}...${spenderAddress.slice(-4)}`;

  return {
    onSent: {
      title: "Approval Pending",
      message: `Please confirm approval of ${formattedAmount} for ${shortSpender}`,
    },
    onComplete: {
      title: "Approval Confirmed",
      message: `Successfully approved ${formattedAmount} for ${shortSpender}`,
    },
    onFail: {
      title: "Approval Failed",
      message: `Failed to approve ${formattedAmount} for ${shortSpender}`,
    },
  };
}

/**
 * Creates specialized notifications for transfer transactions
 */
function createTransferNotifications(
  tokenSymbol: string,
  formattedAmount: string,
  recipientAddress: string
): {
  onSent: NotificationConfig;
  onComplete: NotificationConfig;
  onFail: NotificationConfig;
} {
  const shortRecipient = `${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`;

  return {
    onSent: {
      title: "Transfer Pending",
      message: `Please confirm transfer of ${formattedAmount} to ${shortRecipient}`,
    },
    onComplete: {
      title: "Transfer Confirmed",
      message: `Successfully transferred ${formattedAmount} to ${shortRecipient}`,
    },
    onFail: {
      title: "Transfer Failed",
      message: `Failed to transfer ${formattedAmount} to ${shortRecipient}`,
    },
  };
}

/**
 * Gets default notifications for a transaction type
 */
function getDefaultNotifications(
  txData: BaseTransaction
): TransactionNotifications {
  if (txData.type === "erc20-approve") {
    // For approve transactions, we need token metadata to create proper notifications
    const tokenSymbol = txData.tokenSymbol || "tokens";
    const tokenDecimals = txData.tokenDecimals || 18;
    const formattedAmount = formatTokenAmount(
      txData.amount,
      tokenDecimals,
      tokenSymbol
    );

    return createApproveNotifications(
      tokenSymbol,
      formattedAmount,
      txData.spenderAddress
    );
  }

  if (txData.type === "erc20-transfer") {
    // For transfer transactions, we need token metadata to create proper notifications
    const tokenSymbol = txData.tokenSymbol || "tokens";
    const tokenDecimals = txData.tokenDecimals || 18;
    const formattedAmount = formatTokenAmount(
      txData.amount,
      tokenDecimals,
      tokenSymbol
    );

    return createTransferNotifications(
      tokenSymbol,
      formattedAmount,
      txData.recipientAddress
    );
  }

  // For other transaction types, use the predefined defaults
  const defaults = DEFAULT_NOTIFICATIONS[txData.type];
  if (!defaults) {
    // Fallback to onchain defaults if type not found
    return DEFAULT_NOTIFICATIONS.onchain;
  }

  return defaults;
}

/**
 * Merges custom notifications with transaction-type defaults
 * Custom notifications take precedence over defaults
 */
export function mergeWithDefaultNotifications(
  txData: BaseTransaction,
  customNotifications?: TransactionNotifications
): TransactionNotifications {
  const defaults = getDefaultNotifications(txData);

  if (!customNotifications) {
    return defaults;
  }

  return {
    id: customNotifications.id,
    onSent: customNotifications.onSent || defaults.onSent,
    onWaitingBlockchain: customNotifications.onWaitingBlockchain || defaults.onWaitingBlockchain,
    onComplete: customNotifications.onComplete || defaults.onComplete,
    onFail: customNotifications.onFail || defaults.onFail,
  };
}
