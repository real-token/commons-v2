const modals = {
  copyAddress: {
    title: "Available Networks",
    description:
      "Only the networks listed below are supported. Any funds sent to another network will result in a loss of funds.",
    agree: "I agree and I understand",
    supportedNetworks: "Supported networks:",
    buttons: {
      confirm: "Copy my address",
      cancel: "Cancel",
    },
  },
  manageWallet: {
    title: "Manage addresses",
    loading: "Loading accounts",
    address: "Your addresses",
    manual: "Don't see your address ? try direct connect",
    connect: "Connect",
    switchNetwork: "Switch network",
  },
  watchWallet: {
    title: "Watch an address",
    button: "Watch",
    form: {
      address: "Address",
      addressPlaceholder: "Enter the address to watch",
      errors: {
        required: "Address is required",
        invalid: "Address is not valid",
        self: "You cannot watch yourself",
      },
    },
  },
  sdkVersion: {
    title: "Wallet not update to date ({{version}})",
    description:
      "You are connected to version {{version}}. There is a new wallet version available ({{lastSdkVersion}}). If you would like to connect to {{lastSdkVersion}}, or fewer one, go to the left orange box at the top right and add/change your wallet address. \n \n. If you don't have a {{lastSdkVersion}} wallet, Please contact support on realt.co website (orange bubble chat on the bottom right).",
    features:
      "You can still use your current version, but some bugs could apparear and some features are not working (walletConnect for example).",
    buttons: {
      understand: "I understand",
      website: "Go to realt.co website",
    },
  },
} as const;

export default modals;
