const web3 = {
  decodingError: {
    title: "Decoding API not available",
    description:
      "If you trust the origin, you can proceed with blind signing the transaction at your own risk",
    alwaysVerify:
      "Always verify the source before signing unknown transactions",
    retry: "Retry",
  },
  explainTransaction: {
    common: {
      token: "Token",
      amount: "Amount",
      expireTime: "Expire time",
      interactContract: "Interact contract",
      operation: "Operation",
      description: "Description",
      pay: "Pay",
      receive: "Receive",
      protocol: "Protocol",
    },
    permitToken: {
      title: "Permit token",
      permitTo: "Permit to",
      permitData: "Permit data",
    },
    tokenOrder: {
      title: "Token order",
    },
    approveToken: {
      title: "Token approval",
      approveTo: "Approve to",
    },
    commonAction: {
      unknown: "Unknown",
    },
    revokeToken: {
      title: "Revoke token approval",
      revokeFrom: "Revoke from",
    },
    swapToken: {
      title: "Swap token",
      simulationResults: "Simulation results",
    },
    wrapToken: {
      title: "Wrap token",
    },
  },
  modals: {
    aAsignature: {
      alertNoSignature: {
        title: "No signatures to validate",
        description: "There are no pending signatures to validate.",
      },
      messageToSign: "Message to sign",
      signatureRequest: "Signature request {{index}} of {{total}}",
      alertReviewSignature: {
        description:
          "Please review the signature request below and confirm if you want to proceed.",
      },
      signatureType: "Signature type:",
      buttons: {
        signMessage: "Sign Message",
        reject: "Reject",
      },
    },
    explainAaTransaction: {
      buttons: {
        sign: "Sign",
        reject: "Reject",
      },
    },
  },
};

export default web3;
