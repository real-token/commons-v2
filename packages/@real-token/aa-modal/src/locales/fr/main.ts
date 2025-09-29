export const main = {
  button: {
    back: "Retour",
    installed: "Installé",
  },
  signin: {
    title: "Se connecter",
    subtitle: "Votre portefeuille Realtoken en un clic",
  },
  providers: {
    continueWithGoogle: "Continuer avec Google",
    connectExternalWallet: "Connexions avancées",
    or: "ou",
  },
  mode: {
    aa: "RealToken AA",
    tba: "TBA",
    external: "Autres portefeuilles",
  },
  readOnly: {
    title: "Surveiller une adresse",
    description:
      "Surveiller une adresse vous permettra de voir tous les actifs de l'adresse spécifiée, mais ne vous permettra pas d'envoyer des transactions. CECI est un mode lecture seule.",
    label: "Entrez l'adresse ou l'ENS",
    button: "Surveiller",
    form: {
      placeholder: "0x... ou realteam.eth",
      error: {
        required: "L'adresse ou le nom ENS est requis",
        address: "Adresse invalide",
        ens: "Nom ENS invalide",
      },
    },
  },
  help: "J'ai besoin d'aide",
  privacyPolicy:
    "Nous ne partageons aucune donnée liée à vos connexions sociales.",
  languageSwitcher: {
    en: "Anglais",
    es: "Espagnol",
    fr: "Français",
  },
  advancedExternalWallet: {
    terms:
      'En cliquant sur "accepter" vous confirmez avoir compris que le propriétaire du compte AA sera l\'adresse avec laquelle vous êtes connecté sur le portefeuille externe utilisé.',
    acceptButton: "Accepter",
  },
  externalConnectionModelPanel: {
    search: "Rechercher un portefeuille",
    error: "Erreur lors de la connexion",
  },
  emailPasswordless: {
    title: "Se connecter avec email",
    subtitle: "Entrez votre email",
  },
  aaChoiceModal: {
    title: "Choisissez votre mode de connexion",
    aa: "Connecter avec le portefeuille Realtoken",
    external: "Connecter avec un portefeuille externe",
  },
  qrCodeDrawer: {
    description:
      "Scannez le code QR avec un portefeuille compatible WalletConnect ou cliquez pour copier le lien.",
    button: "Copier le lien",
    getWallet: "Obtenir un portefeuille",
    noWallet: "Vous n'avez pas {{name}} ?",
    notifications: {
      copiedToClipboard: "Copié dans le presse-papiers",
      linkCopiedToClipboard: "Lien copié dans le presse-papiers",
    },
  },
  walletInstallationDrawer: {
    title: "Obtenir un portefeuille",
    installMobile: "Installer l'application {{name}}",
    installDesktop: "Installer l'extension {{name}}",
  },
};
