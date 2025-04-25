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
} as const;

export default modals;
