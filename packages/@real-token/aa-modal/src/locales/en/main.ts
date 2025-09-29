export const main = {
  button: {
    back: "Back",
    installed: "Installed",
  },
  signin: {
    title: "Sign in",
    subtitle: "Your Realtoken wallet with one click",
  },
  providers: {
    continueWithGoogle: "Continue with google",
    connectExternalWallet: "Advanced connections",
    or: "or",
  },
  mode: {
    aa: "RealToken AA",
    tba: "TBA",
    external: "Others wallet",
  },
  readOnly: {
    title: "Watch an address",
    description:
      "Watching an address will allow you see all assets of the specified adress. But will not allow you to send transactions. THIS is a read only mode.",
    label: "Enter the address or ENS",
    button: "Watch",
    form: {
      placeholder: "0x... or realteam.eth",
      error: {
        required: "Address or ENS name is required",
        address: "Invalid address",
        ens: "Invalid ENS name",
      },
    },
  },
  help: "I need help",
  privacyPolicy: "We do not share any data related to your social logins.",
  languageSwitcher: {
    en: "English",
    es: "Spanish",
    fr: "French",
  },
  advancedExternalWallet: {
    terms:
      'By clicking on "accept" you confirm with understanding that the owner of the AA account will be the address with which you are connected to the external wallet used.',
    acceptButton: "Accept",
  },
  externalConnectionModelPanel: {
    search: "Search for a wallet",
    error: "Error when connecting",
  },
  emailPasswordless: {
    title: "Connect with email",
    subtitle: "Enter your email",
  },
  aaChoiceModal: {
    title: "Choose your connection mode",
    aa: "Connect with RealToken Wallet",
    external: "Connect with External Wallet",
  },
  qrCodeDrawer: {
    description:
      "Scan the QR code with a WalletConnect supported wallet or click to copy link.",
    button: "Copy link",
    getWallet: "Get wallet",
    noWallet: "Don't have {{name}}?",
    notifications: {
      copiedToClipboard: "Copied to clipboard",
      linkCopiedToClipboard: "Link copied to clipboard",
    },
  },
  walletInstallationDrawer: {
    title: "Get wallet",
    installMobile: "Install {{name}} app",
    installDesktop: "Install {{name}} extension",
  },
};
