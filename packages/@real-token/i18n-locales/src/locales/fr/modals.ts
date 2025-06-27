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
} as const;

export default modals;
