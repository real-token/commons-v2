import {
  AaConnectorModeConfig,
  CONNECTION_MODE,
  ConnectorModeConfig,
} from "./connectionMode";
import { LoginFunctionParams } from "@real-token/aa-core";

export type AaModalConfig = Omit<LoginFunctionParams, "toggleAA"> & {
  connectionModeVisibility: {
    [key in CONNECTION_MODE]?: boolean;
  };
  connectionMode: {
    [CONNECTION_MODE.aa]: AaConnectorModeConfig;
    [CONNECTION_MODE.tba]: ConnectorModeConfig;
    [CONNECTION_MODE.external]: ConnectorModeConfig;
  };
};

export const defaultAaModalConfig: AaModalConfig = {
  connectionModeVisibility: {
    [CONNECTION_MODE.aa]: true,
    [CONNECTION_MODE.tba]: true,
    [CONNECTION_MODE.external]: true,
  },
  connectionMode: {
    [CONNECTION_MODE.aa]: {
      showEmailPasswordless: true,
      showExternalWalletConnection: true,
      showSocialLogins: true,
      socialConnectorsName: [], // TODO: add default connectors from @real-token/web3 package
      connectorsName: [], // TODO: add default connectors from @real-token/web3 package
    },
    [CONNECTION_MODE.tba]: {
      connectorsName: [], // TODO: add default connectors from @real-token/web3 package
    },
    [CONNECTION_MODE.external]: {
      connectorsName: [], // TODO: add default connectors from @real-token/web3 package
    },
  },
};
