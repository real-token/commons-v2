import {
  AAClientConfig,
  TorusConfig,
} from "@real-token/aa-core";
import { EthereumLogo } from "@real-token/ui-components";
import { RealTokenUiNetworkConfig } from "@real-token/core";

const env = import.meta.env.VITE_ENV;

export const networks: RealTokenUiNetworkConfig[] = [
  {
    logo: '',
    chainLogo: EthereumLogo,
    blockExplorerUrl: "https://sepolia.etherscan.io/",
    isTestnet: true,
    wsTarget: import.meta.env.VITE_SEPOLIA_WSS_URL!,
    rpcTarget: import.meta.env.VITE_SEPOLIA_RPC_URL!,
    decimals: 18,
    chainId: "0xaa36a7",
    displayName: "sepolia",
    chainNamespace: "eip155",
    ticker: "ETH",
    tickerName: "Sepolia ETH",
    serverChainId: "eth",
    fallbackRpcTargets: [],
    fallbackWsTargets: []
  },
];

const torusConfig: TorusConfig = {
  mfaLevel: "optional", // TODO en parler à web3auth
  networks,
  enableLogging: true,
  loginConfig: {}
};

export const aaClient: AAClientConfig = {
  uiConfig: {
    appName: "RealToken",
    appUrl: "https://realt.co",
    defaultLanguage: "en",
    mode: "dark",
    logoLight: "https://realt.co/wp-content/uploads/2019/04/RealT_Logo.svg",
    logoDark: "https://realt.co/wp-content/uploads/2019/04/RealT_Logo.svg",
    theme: {
      primary: "#512376",
      onPrimary: "#FFFFFF",
    },
  },
  web3auth: {
    apiKey: import.meta.env.VITE_TORUS_API_KEY!,
    network: "sapphire_devnet",
    uxMode: "popup",
  },
  guardians: [
    "0x8422207d24321c9d753c6806ca6b8448bb3dd465",
    "0x4fedcd237908287d0c4f9ad36ec2c9252196edb1",
    "0xa463bba1a71b7ed9dec676bad3b887e26c591db1",
  ],
  chainId: 0xaa36a7,
  etherspotApiKey: import.meta.env.VITE_ETHERSPOT_API_KEY,
  torusConfig: torusConfig,
  walletconnect: {
    projectId: import.meta.env.VITE_WC_PROJECTID!,
    relayUrl: "wss://relay.walletconnect.com",
    name: "RealT Wallet",
    description: "RealT account abstraction wallet",
    icons: ["https://avatars.githubusercontent.com/u/53057739"],
    url: "google.fr",
  },
};
