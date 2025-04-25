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
} as const;

export default modals;
