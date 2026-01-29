const web3 = {
  cart: {
    title: "Panier de transactions",
    group: "groupe",
    groups: "groupes",
    transaction: "transaction",
    transactions: "transactions",
    status: {
      pending: "En attente",
      simulating: "Simulation...",
      ready: "Prêt",
      hasFailures: "Contient des échecs",
      confirmed: "Confirmé",
      rejected: "Rejeté",
    },
    simulation: {
      success: "Réussira",
      willRevert: "Échouera",
      error: "Erreur",
      dependsOnFailed: "Dépend d'une transaction échouée",
      retry: "Réessayer",
      remove: "Supprimer",
      warningFailed: "{{count}} transaction(s) vont échouer. Veuillez vérifier avant de confirmer.",
    },
    gas: {
      total: "Gas total estimé",
      estimated: "Est.",
    },
    buttons: {
      confirmAll: "Tout confirmer",
      rejectAll: "Tout rejeter",
      close: "Fermer",
    },
    empty: {
      title: "Le panier est vide",
      description: "Ajoutez des transactions à votre panier pour les regrouper et les vérifier avant de les envoyer.",
    },
  },
  decodingError: {
    title: "API de décodage non disponible",
    description:
      "Si vous faites confiance à l'origine, vous pouvez continuer en signant aveuglément la transaction à vos propres risques",
    alwaysVerify:
      "Vérifiez toujours la source avant de signer des transactions inconnues",
    retry: "Réessayer",
  },
  explainTransaction: {
    common: {
      token: "Jeton",
      amount: "Montant",
      expireTime: "Date d'expiration",
      interactContract: "Contrat d'interaction",
      operation: "Opération",
      description: "Description",
      pay: "Payer",
      receive: "Recevoir",
      protocol: "Protocole",
    },
    permitToken: {
      title: "Autorisation de jeton",
      permitTo: "Autoriser à",
      permitData: "Données d'autorisation",
    },
    tokenOrder: {
      title: "Ordre de jeton",
    },
    approveToken: {
      title: "Approbation de jeton",
      approveTo: "Approuver à",
    },
    commonAction: {
      unknown: "Inconnu",
    },
    revokeToken: {
      title: "Révoquer l'approbation de jeton",
      revokeFrom: "Révoquer de",
    },
    swapToken: {
      title: "Échanger un jeton",
      simulationResults: "Résultats de la simulation",
    },
    wrapToken: {
      title: "Envelopper un jeton",
    },
  },
  modals: {
    aAsignature: {
      alertNoSignature: {
        title: "Aucune signature à valider",
        description: "Il n'y a aucune signature en attente à valider.",
      },
      messageToSign: "Message à signer",
      signatureRequest: "Demande de signature {{index}} sur {{total}}",
      alertReviewSignature: {
        description:
          "Veuillez examiner la demande de signature ci-dessous et confirmer si vous souhaitez continuer.",
      },
      signatureType: "Type de signature :",
      buttons: {
        signMessage: "Signer le message",
        reject: "Rejeter",
      },
    },
    explainAaTransaction: {
      buttons: {
        sign: "Signer",
        reject: "Rejeter",
      },
    },
  },
};

export default web3;
