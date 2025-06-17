export enum CONNECTION_MODE {
  aa = "aa",
  tba = "tba",
  external = "external",
}

export type AaConnectorModeConfig = {
  showSocialLogins?: boolean;
  showEmailPasswordless?: boolean;
  showAdvancedWalletConnection?: boolean;
};

export const connectionModeOptions: Record<CONNECTION_MODE, string> = {
  [CONNECTION_MODE.aa]: "mode.aa",
  [CONNECTION_MODE.tba]: "mode.tba",
  [CONNECTION_MODE.external]: "mode.external",
};
