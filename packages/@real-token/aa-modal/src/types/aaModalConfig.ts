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
};
