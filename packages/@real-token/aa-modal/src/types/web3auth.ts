import { AUTH_CONNECTION_TYPE } from "@web3auth/modal";
import type { IUseWeb3Auth } from "@web3auth/modal/react";

export type Web3Auth = IUseWeb3Auth["web3Auth"];

export type Wallet = {
  app: {
    browser?: string;
    android?: string;
    ios?: string;
    chrome?: string;
    firefox?: string;
    edge?: string;
  };
  chains: string[];
  imgExtension: string;
  injected: null;
  mobile: {
    native: string;
    universal: string;
  };
  name: string;
  primaryColor: string;
  walletConnect:
    | {
        sdks: string[];
      }
    | undefined;
};

export type AaWalletExternal = Wallet & {
  walletId: string;
  logo: string;
  isInstalled: boolean;
  hasWalletConnect: boolean;
};

export type ExternalWallets = {
  label: string;
  showOnModal: boolean;
  isInjected: boolean;
  icon: string;
  chainNamespaces: string[];
};

// Interface pour les propriétés privées que nous voulons utiliser
export interface Web3AuthPrivateAccess {
  loginModal: {
    uiConfig: {
      walletRegistry: {
        default: {
          [walletId: string]: Wallet;
        };
        others: {
          [walletId: string]: Wallet;
        };
      };
      loginMethodsOrder: AUTH_CONNECTION_TYPE[];
    };
    externalWalletsConfig: {
      [walletId: string]: ExternalWallets;
    };
  };
  connectors: {
    name: string;
    connectorData?: {
      uri: string;
    };
  }[];
}

// Helper function pour accéder aux propriétés privées de façon typée
export function getWeb3AuthPrivateAccess(
  web3Auth: Web3Auth
): Web3AuthPrivateAccess {
  return web3Auth as any;
}
