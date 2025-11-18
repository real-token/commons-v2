const notifications = {
  copyAddress: {
    title: "Copied ✅",
    message: "Address copied to clipboard",
  },
  transactions: {
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
    erc20Approve: {
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
      withDetails: {
        onSent: {
          title: "Approval Pending",
          message: "Please confirm approval of {{amount}} for {{spender}}",
        },
        onComplete: {
          title: "Approval Confirmed",
          message: "Successfully approved {{amount}} for {{spender}}",
        },
        onFail: {
          title: "Approval Failed",
          message: "Failed to approve {{amount}} for {{spender}}",
        },
      },
    },
    erc20Transfer: {
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
      withDetails: {
        onSent: {
          title: "Transfer Pending",
          message: "Please confirm transfer of {{amount}} to {{recipient}}",
        },
        onComplete: {
          title: "Transfer Confirmed",
          message: "Successfully transferred {{amount}} to {{recipient}}",
        },
        onFail: {
          title: "Transfer Failed",
          message: "Failed to transfer {{amount}} to {{recipient}}",
        },
      },
    },
    signMessageErc20: {
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
    signMessageCoinBridge: {
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
  },
} as const;

export default notifications;
