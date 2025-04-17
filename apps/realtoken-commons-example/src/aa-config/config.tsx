import {
  AAClientConfig,
  ChainConfig,
  LoginConfig,
  TorusConfig,
} from "@real-token/aa-core";
import {
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
  coinbaseWallet,
  ledgerWallet,
  trustWallet,
  frameWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { EthereumLogo } from "@real-token/ui-components";
import {
  discordLogo,
  facebookLogo,
  twitchLogo,
  googleLogo,
} from "@real-token/web3";
const env = import.meta.env.VITE_ENV;

const networks: ChainConfig[] = [
  {
    logo: EthereumLogo,
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
  },
];

const loginConfig: LoginConfig = {
  google: {
    name: "google",
    verifier: "realt-google",
    typeOfLogin: "google",
    clientId:
      "900675479243-o3mab93vi7nt7ho4nctkfbqs5pmgv61m.apps.googleusercontent.com",
    showOnModal: true,
    showOnSocialBackupFactor: true,
    rainbowLogo: googleLogo,
  },
};

const stagingLoginModal: LoginConfig = {
  discord: {
    name: "discord",
    verifier: "realt-discord-staging",
    typeOfLogin: "discord",
    clientId: "1294468658856460348",
    rainbowLogo: discordLogo,
  },
  google: {
    name: "google",
    verifier: "realt-google-staging",
    typeOfLogin: "google",
    clientId:
      "427962867996-kdhi2rirlqqsghn7uiq1m462b9d04mia.apps.googleusercontent.com",
    rainbowLogo: googleLogo,
  },
  facebook: {
    name: "facebook",
    verifier: "realt-facebook-staging",
    typeOfLogin: "facebook",
    clientId: "569679122063484",
    rainbowLogo: facebookLogo,
  },
  twitch: {
    name: "twitch",
    verifier: "realt-twitchtv-staging",
    typeOfLogin: "twitch",
    clientId: "qnw5sbf2xhf39mn334nztn95n64mcm",
    rainbowLogo: twitchLogo,
  },
  email_passwordless: {
    name: "email_passwordless",
    verifier: "realt-passwordless-staging",
    typeOfLogin: "email_passwordless",
    clientId: import.meta.env.VITE_TORUS_API_KEY!,
    rainbowLogo: "",
  },
};

const torusConfig: TorusConfig = {
  mfaLevel: "optional", // TODO en parler à web3auth
  networks,
  enableLogging: true,
  loginConfig: loginConfig,
};

export const aaClient: AAClientConfig = {
  walletList: [
    {
      groupName: "hot wallets",
      wallets: [
        metaMaskWallet,
        rabbyWallet,
        walletConnectWallet,
        coinbaseWallet,
        ledgerWallet,
        trustWallet,
        frameWallet,
      ],
    },
  ],
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
