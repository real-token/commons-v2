const notifications = {
  copyAddress: {
    title: "Copié ✅",
    message: "Adresse copiée dans le presse-papiers",
  },
  transactions: {
    onchain: {
      onSent: {
        title: "Transaction en attente",
        message: "Veuillez confirmer la transaction dans votre portefeuille",
      },
      onWaitingBlockchain: {
        title: "En attente de validation blockchain",
        message: "Votre transaction est en cours de validation sur la blockchain",
      },
      onComplete: {
        title: "Transaction confirmée",
        message: "Votre transaction a été confirmée avec succès",
      },
      onFail: {
        title: "Transaction échouée",
        message: "Une erreur s'est produite lors du traitement de votre transaction",
      },
    },
    native: {
      onSent: {
        title: "Transfert en attente",
        message: "Veuillez confirmer le transfert de jetons natifs dans votre portefeuille",
      },
      onWaitingBlockchain: {
        title: "En attente de validation blockchain",
        message: "Votre transfert est en cours de validation sur la blockchain",
      },
      onComplete: {
        title: "Transfert confirmé",
        message: "Votre transfert de jetons natifs a été confirmé avec succès",
      },
      onFail: {
        title: "Transfert échoué",
        message: "Une erreur s'est produite lors du traitement de votre transfert",
      },
    },
    erc20Approve: {
      onSent: {
        title: "Approbation en attente",
        message: "Veuillez confirmer l'approbation du jeton dans votre portefeuille",
      },
      onWaitingBlockchain: {
        title: "En attente de validation blockchain",
        message: "Votre approbation est en cours de validation sur la blockchain",
      },
      onComplete: {
        title: "Approbation confirmée",
        message: "L'approbation du jeton a été confirmée avec succès",
      },
      onFail: {
        title: "Approbation échouée",
        message: "Une erreur s'est produite lors du traitement de l'approbation du jeton",
      },
      withDetails: {
        onSent: {
          title: "Approbation en attente",
          message: "Veuillez confirmer l'approbation de {{amount}} pour {{spender}}",
        },
        onComplete: {
          title: "Approbation confirmée",
          message: "{{amount}} approuvé avec succès pour {{spender}}",
        },
        onFail: {
          title: "Approbation échouée",
          message: "Échec de l'approbation de {{amount}} pour {{spender}}",
        },
      },
    },
    erc20Transfer: {
      onSent: {
        title: "Transfert en attente",
        message: "Veuillez confirmer le transfert de jetons dans votre portefeuille",
      },
      onWaitingBlockchain: {
        title: "En attente de validation blockchain",
        message: "Votre transfert est en cours de validation sur la blockchain",
      },
      onComplete: {
        title: "Transfert confirmé",
        message: "Le transfert de jetons a été confirmé avec succès",
      },
      onFail: {
        title: "Transfert échoué",
        message: "Une erreur s'est produite lors du traitement du transfert de jetons",
      },
      withDetails: {
        onSent: {
          title: "Transfert en attente",
          message: "Veuillez confirmer le transfert de {{amount}} vers {{recipient}}",
        },
        onComplete: {
          title: "Transfert confirmé",
          message: "{{amount}} transféré avec succès vers {{recipient}}",
        },
        onFail: {
          title: "Transfert échoué",
          message: "Échec du transfert de {{amount}} vers {{recipient}}",
        },
      },
    },
    signMessageErc20: {
      onSent: {
        title: "Signature en attente",
        message: "Veuillez signer le message de permis ERC20 dans votre portefeuille",
      },
      onComplete: {
        title: "Signature confirmée",
        message: "La signature du permis ERC20 a été créée avec succès",
      },
      onFail: {
        title: "Signature échouée",
        message: "Une erreur s'est produite lors de la signature du permis ERC20",
      },
      withDetails: {
        onSent: {
          title: "Signature de permis en attente",
          message: "Veuillez signer le permis pour {{amount}} vers {{spender}}",
        },
        onComplete: {
          title: "Signature de permis confirmée",
          message: "Permis signé avec succès pour {{amount}} vers {{spender}}",
        },
        onFail: {
          title: "Signature de permis échouée",
          message: "Échec de la signature du permis pour {{amount}} vers {{spender}}",
        },
      },
    },
    signMessageCoinBridge: {
      onSent: {
        title: "Signature en attente",
        message: "Veuillez signer le message de permis dans votre portefeuille",
      },
      onComplete: {
        title: "Signature confirmée",
        message: "La signature du permis a été créée avec succès",
      },
      onFail: {
        title: "Signature échouée",
        message: "Une erreur s'est produite lors de la signature du permis",
      },
      withDetails: {
        onSent: {
          title: "Signature de permis en attente",
          message: "Veuillez signer le permis pour {{amount}} vers {{spender}}",
        },
        onComplete: {
          title: "Signature de permis confirmée",
          message: "Permis signé avec succès pour {{amount}} vers {{spender}}",
        },
        onFail: {
          title: "Signature de permis échouée",
          message: "Échec de la signature du permis pour {{amount}} vers {{spender}}",
        },
      },
    },
    signMessage: {
      onSent: {
        title: "Signature en attente",
        message: "Veuillez signer le message dans votre portefeuille",
      },
      onComplete: {
        title: "Signature confirmée",
        message: "Le message a été signé avec succès",
      },
      onFail: {
        title: "Signature échouée",
        message: "Une erreur s'est produite lors de la signature du message",
      },
    },
  },
} as const;

export default notifications;
