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
  walletConnect: {
    connect: "Connect",
    disconnect: "Disconnect",
    refuse: "Refuse",
    confirm: "Confirm",
    confirmAll: "Confirm all",
    sign: "Sign",
    activeConnections: "Active connections ({{count}})",
    txToValidate: "{{count}} transaction(s) to validate",
    transaction: "Transaction",
    from: "From",
    contractInteraction: "Contract interaction",
    data: "Data",
    name: "Name",
    params: "Params",
    disabled: {
      info: "WalletConnect is not supported on your wallet version {{version}}.",
      action:
        "Please upgrade to last version {{version}} by going to realt.co website and contacting support (orange bubble in right bottom corner)",
      button: "Go to realt.co website",
    },
    sessionProposal: {
      wantToConnect: '"{{name}}" wants to connect',
      buttons: {
        approve: "Approve",
        reject: "Reject",
      },
      securityAlert: {
        title: "Known security risk",
        domainMismatch:
          "This website has a domain that does not match the sender of this request. Approving may lead to loss of funds.",
        domainMismatchTitle: "Domain mismatch",
        unknownDomain:
          "This domain cannot be verified. Check the request carefully before approving.",
        unknownDomainTitle: "Unknown domain",
        isScam:
          "This domain is flagged as unsafe by multiple security providers. Refuse to connect to prevent any potential security risks.",
        isScamTitle: "Known security risk",
        securityRisk: "Security risk",
      },
      permissions: {
        title: "Permissions requested",
        eth_sendTransaction: "Send transactions",
        personal_sign: "Sign messages",
        eth_sign: "Sign transactions",
        eth_signTypedData: "Sign typed data",
        eth_signTypedData_v4: "Sign typed data v4",
        moveFundsWithoutPermissions: "Move funds without permissions",
      },
      notifications: {
        title: "Session proposal",
        accepted: "Session accepted",
        refused: "Session refused",
      },
    },
  },
} as const;

export default modals;
