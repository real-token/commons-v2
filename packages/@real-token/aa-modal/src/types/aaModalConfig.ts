import { AUTH_CONNECTION_TYPE, WALLET_CONNECTOR_TYPE } from "@web3auth/modal";
import { REALTOKEN_AA_GROUP_NAME } from "./aaCoreWalletGroupNames";
import {
  AaConnectorModeConfig,
  CONNECTION_MODE,
  ExternalConnectorModeConfig,
} from "./connectionMode";
import { LoginFunctionParams } from "@real-token/aa-core";

export type AaModalConfig = Omit<LoginFunctionParams, "toggleAA"> & {
  connectionModeVisibility: {
    [CONNECTION_MODE.tba]: boolean;
    [CONNECTION_MODE.external]: boolean;
    [CONNECTION_MODE.aa]: boolean;
  };
  connectionModeConfig: {
    [CONNECTION_MODE.aa]: AaConnectorModeConfig;
    [CONNECTION_MODE.external]: ExternalConnectorModeConfig;
  };
  connectors: {
    [key in REALTOKEN_AA_GROUP_NAME]: AUTH_CONNECTION_TYPE[];
  };
};

export const defaultAaModalConfig: AaModalConfig = {
  connectionModeVisibility: {
    [CONNECTION_MODE.aa]: true,
    [CONNECTION_MODE.tba]: false,
    [CONNECTION_MODE.external]: true,
  },
  connectionModeConfig: {
    [CONNECTION_MODE.aa]: {
      showAdvancedWalletConnection: false,
      showSocialLogins: true,
      showEmailPasswordless: false,
    },
    [CONNECTION_MODE.external]: {
      showReadOnly: true,
    },
  },
  // TODO: add default connectors from web3auth
  connectors: {
    [REALTOKEN_AA_GROUP_NAME.AA_ADVANCED_AND_EXTERNAL]: [],
    [REALTOKEN_AA_GROUP_NAME.AA_ADVANCED]: [],
    [REALTOKEN_AA_GROUP_NAME.AA_SOCIALS]: [],
    [REALTOKEN_AA_GROUP_NAME.EXTERNAL]: [],
  },
};
