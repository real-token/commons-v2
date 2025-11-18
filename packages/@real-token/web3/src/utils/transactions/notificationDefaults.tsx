import {
  BaseTransaction,
  TransactionNotifications,
  NotificationConfig,
} from "./types";
import { formatTokenAmount } from "./tokenHelpers";
import { i18next } from "@real-token/i18n-locales";

// Helper function to get translated notification config
function getTranslatedConfig(keyPrefix: string): NotificationConfig {
  return {
    title: i18next.t(`${keyPrefix}.title`, { ns: "notifications" }),
    message: i18next.t(`${keyPrefix}.message`, { ns: "notifications" }),
  };
}

// Default notification configurations for each transaction type
// Using a function to ensure translations are evaluated at call time, not module load time
function getDefaultNotificationsConfig(type: string): TransactionNotifications {
  const configs: Record<string, TransactionNotifications> = {
    onchain: {
      onSent: getTranslatedConfig("transactions.onchain.onSent"),
      onWaitingBlockchain: getTranslatedConfig(
        "transactions.onchain.onWaitingBlockchain"
      ),
      onComplete: getTranslatedConfig("transactions.onchain.onComplete"),
      onFail: getTranslatedConfig("transactions.onchain.onFail"),
    },
    native: {
      onSent: getTranslatedConfig("transactions.native.onSent"),
      onWaitingBlockchain: getTranslatedConfig(
        "transactions.native.onWaitingBlockchain"
      ),
      onComplete: getTranslatedConfig("transactions.native.onComplete"),
      onFail: getTranslatedConfig("transactions.native.onFail"),
    },
    "erc20-approve": {
      onSent: getTranslatedConfig("transactions.erc20Approve.onSent"),
      onWaitingBlockchain: getTranslatedConfig(
        "transactions.erc20Approve.onWaitingBlockchain"
      ),
      onComplete: getTranslatedConfig("transactions.erc20Approve.onComplete"),
      onFail: getTranslatedConfig("transactions.erc20Approve.onFail"),
    },
    "erc20-transfer": {
      onSent: getTranslatedConfig("transactions.erc20Transfer.onSent"),
      onWaitingBlockchain: getTranslatedConfig(
        "transactions.erc20Transfer.onWaitingBlockchain"
      ),
      onComplete: getTranslatedConfig("transactions.erc20Transfer.onComplete"),
      onFail: getTranslatedConfig("transactions.erc20Transfer.onFail"),
    },
    "signMessage-erc20": {
      onSent: getTranslatedConfig("transactions.signMessageErc20.onSent"),
      onComplete: getTranslatedConfig(
        "transactions.signMessageErc20.onComplete"
      ),
      onFail: getTranslatedConfig("transactions.signMessageErc20.onFail"),
    },
    "signMessage-coinBridge": {
      onSent: getTranslatedConfig("transactions.signMessageCoinBridge.onSent"),
      onComplete: getTranslatedConfig(
        "transactions.signMessageCoinBridge.onComplete"
      ),
      onFail: getTranslatedConfig("transactions.signMessageCoinBridge.onFail"),
    },
    signMessage: {
      onSent: getTranslatedConfig("transactions.signMessage.onSent"),
      onComplete: getTranslatedConfig("transactions.signMessage.onComplete"),
      onFail: getTranslatedConfig("transactions.signMessage.onFail"),
    },
  };

  return configs[type] || configs.onchain;
}

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
      title: i18next.t("transactions.erc20Approve.withDetails.onSent.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.erc20Approve.withDetails.onSent.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
    },
    onComplete: {
      title: i18next.t(
        "transactions.erc20Approve.withDetails.onComplete.title",
        {
          ns: "notifications",
        }
      ),
      message: i18next.t(
        "transactions.erc20Approve.withDetails.onComplete.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
    },
    onFail: {
      title: i18next.t("transactions.erc20Approve.withDetails.onFail.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.erc20Approve.withDetails.onFail.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
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
      title: i18next.t("transactions.erc20Transfer.withDetails.onSent.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.erc20Transfer.withDetails.onSent.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          recipient: shortRecipient,
        }
      ),
    },
    onComplete: {
      title: i18next.t(
        "transactions.erc20Transfer.withDetails.onComplete.title",
        {
          ns: "notifications",
        }
      ),
      message: i18next.t(
        "transactions.erc20Transfer.withDetails.onComplete.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          recipient: shortRecipient,
        }
      ),
    },
    onFail: {
      title: i18next.t("transactions.erc20Transfer.withDetails.onFail.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.erc20Transfer.withDetails.onFail.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          recipient: shortRecipient,
        }
      ),
    },
  };
}

/**
 * Creates specialized notifications for ERC20 permit transactions
 */
function createErc20PermitNotifications(
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
      title: i18next.t("transactions.signMessageErc20.withDetails.onSent.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.signMessageErc20.withDetails.onSent.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
    },
    onComplete: {
      title: i18next.t(
        "transactions.signMessageErc20.withDetails.onComplete.title",
        {
          ns: "notifications",
        }
      ),
      message: i18next.t(
        "transactions.signMessageErc20.withDetails.onComplete.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
    },
    onFail: {
      title: i18next.t("transactions.signMessageErc20.withDetails.onFail.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.signMessageErc20.withDetails.onFail.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
    },
  };
}

/**
 * Creates specialized notifications for CoinBridge permit transactions
 */
function createCoinBridgePermitNotifications(
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
      title: i18next.t("transactions.signMessageCoinBridge.withDetails.onSent.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.signMessageCoinBridge.withDetails.onSent.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
    },
    onComplete: {
      title: i18next.t(
        "transactions.signMessageCoinBridge.withDetails.onComplete.title",
        {
          ns: "notifications",
        }
      ),
      message: i18next.t(
        "transactions.signMessageCoinBridge.withDetails.onComplete.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
    },
    onFail: {
      title: i18next.t("transactions.signMessageCoinBridge.withDetails.onFail.title", {
        ns: "notifications",
      }),
      message: i18next.t(
        "transactions.signMessageCoinBridge.withDetails.onFail.message",
        {
          ns: "notifications",
          amount: formattedAmount,
          spender: shortSpender,
        }
      ),
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

  if (txData.type === "signMessage-erc20") {
    // For ERC20 permit transactions, we need token metadata to create proper notifications
    const tokenSymbol = txData.tokenSymbol || "tokens";
    const tokenDecimals = txData.tokenDecimals || 18;
    const formattedAmount = formatTokenAmount(
      txData.amount,
      tokenDecimals,
      tokenSymbol
    );

    return createErc20PermitNotifications(
      tokenSymbol,
      formattedAmount,
      txData.spender
    );
  }

  if (txData.type === "signMessage-coinBridge") {
    // For CoinBridge permit transactions, we need token metadata to create proper notifications
    const tokenSymbol = txData.tokenSymbol || "tokens";
    const tokenDecimals = txData.tokenDecimals || 18;
    const formattedAmount = formatTokenAmount(
      txData.amount,
      tokenDecimals,
      tokenSymbol
    );

    return createCoinBridgePermitNotifications(
      tokenSymbol,
      formattedAmount,
      txData.spender
    );
  }

  // For other transaction types, use the predefined defaults
  // Call the function to get fresh translations
  return getDefaultNotificationsConfig(txData.type);
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
    onWaitingBlockchain:
      customNotifications.onWaitingBlockchain || defaults.onWaitingBlockchain,
    onComplete: customNotifications.onComplete || defaults.onComplete,
    onFail: customNotifications.onFail || defaults.onFail,
  };
}
