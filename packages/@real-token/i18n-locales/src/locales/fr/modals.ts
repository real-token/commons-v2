const modals = {
  copyAddress: {
    title: "Réseaux disponibles",
    description:
      "Seuls les réseaux listés ci-dessous sont supportés. Tout fonds envoyé à un autre réseau entraînera la perte des fonds.",
    agree: "Je suis d'accord et je comprends",
    supportedNetworks: "Réseaux supportés :",
    buttons: {
      confirm: "Copier mon adresse",
      cancel: "Annuler",
    },
  },
  manageWallet: {
    title: "Gérer les adresses",
    loading: "Chargement des adresses",
    address: "Vos adresses",
    manual:
      "Votre adresse n'est pas dans la liste ? Essayez de vous connecter directement",
    connect: "Se connecter à l'adresse",
    switchNetwork: "Changer de réseau",
  },
  watchWallet: {
    title: "Observer une adresse",
    button: "Observer",
    form: {
      address: "Adresse",
      addressPlaceholder: "Entrez l'adresse à observer",
      errors: {
        required: "L'adresse est requise",
        invalid: "L'adresse n'est pas valide",
        self: "Vous ne pouvez pas observer votre propre adresse",
      },
    },
  },
  sdkVersion: {
    title: "Portefeuille non à jour ({{version}})",
    description:
      "Vous êtes connecté à version {{version}}. Une nouvelle version du portefeuille est disponible ({{lastSdkVersion}}). Si vous souhaitez vous connecter à {{lastSdkVersion}}, ou une version antérieure, allez dans la boîte orange en haut à droite et ajoutez/changez votre adresse de portefeuille. \n \n Si vous n'avez pas d'addresse de portefeuille {{lastSdkVersion}}, veuillez contacter le support sur le site realt.co (bulle de chat orange en bas à droite).",
    features:
      "Vous pouvez toujours utiliser la version actuelle. Cependant certains bugs peuvent toujours être présent et certaines fonctionnalitées ne sont pas fonctionnels (walletConnect par exemple).",
    buttons: {
      understand: "Je comprend",
      website: "Aller sur realt.co",
    },
  },

  walletConnect: {
    connect: "Connecter",
    disconnect: "Déconnecter",
    refuse: "Refuser",
    confirm: "Confirmer",
    confirmAll: "Tout confirmer",
    sign: "Signer",
    activeConnections: "Connexions actives ({{count}})",
    txToValidate: "{{count}} transaction(s) à valider",
    transaction: "Transaction",
    from: "De",
    contractInteraction: "Interaction de contrat",
    data: "Données",
    name: "Nom",
    params: "Paramètres",
    disabled: {
      info: "WalletConnect n'est pas supporté sur la version de votre portefeuille {{version}}.",
      action:
        "Veuillez mettre à jour vers la dernière version {{version}} en allant sur le site realt.co et en contactant le support (bulle orange en bas à droite)",
      button: "Aller sur realt.co",
    },
    sessionProposal: {
      wantToConnect: '"{{name}}" souhaite se connecter',
      buttons: {
        approve: "Approuver",
        reject: "Rejeter",
      },
      securityAlert: {
        title: "Risque de sécurité connu",
        domainMismatch:
          "Ce site web a un domaine qui ne correspond pas à l'expéditeur de cette demande. Approuver peut entraîner une perte de fonds.",
        domainMismatchTitle: "Domaine non correspondant",
        unknownDomain:
          "Ce domaine ne peut pas être vérifié. Vérifiez attentivement la demande avant d'approuver.",
        unknownDomainTitle: "Domaine inconnu",
        isScam:
          "Ce domaine est signalé comme non sécurisé par plusieurs fournisseurs de sécurité. Refusez la connexion pour éviter tout risque potentiel.",
        isScamTitle: "Risque de sécurité connu",
        securityRisk: "Risque de sécurité",
      },
      permissions: {
        title: "Permissions demandées",
        eth_sendTransaction: "Envoyer des transactions",
        personal_sign: "Signer des messages",
        eth_sign: "Signer des transactions",
        eth_signTypedData: "Signer des données typées",
        eth_signTypedData_v4: "Signer des données typées v4",
        moveFundsWithoutPermissions: "Déplacer des fonds sans permissions",
      },
      notifications: {
        title: "Proposition de session",
        accepted: "Session acceptée",
        refused: "Session refusée",
      },
    },
  },
} as const;

export default modals;
