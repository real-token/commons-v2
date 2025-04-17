import { Trans } from "react-i18next";
import { LoginConfig } from "@real-token/aa-core";

export enum CONNECTION_MODE {
  aa = "aa",
  tba = "tba",
  external = "external",
}

export type ConnectorModeConfig = {
  connectorsName: string[];
};

type LoginProvider = keyof LoginConfig;
export type AaConnectorModeConfig = ConnectorModeConfig & {
  showSocialLogins?: boolean;
  socialConnectorsName?: LoginProvider[];
  showEmailPasswordless?: boolean;
  showExternalWalletConnection?: boolean;
};

export const connectionModeOptions: Record<CONNECTION_MODE, React.ReactNode> = {
  [CONNECTION_MODE.aa]: (
    <Trans ns="main" i18nKey="mode.aa" defaultMessage="AA" />
  ),
  [CONNECTION_MODE.tba]: (
    <Trans ns="main" i18nKey="mode.tba" defaultMessage="TBA" />
  ),
  [CONNECTION_MODE.external]: (
    <Trans ns="main" i18nKey="mode.external" default="External wallet" />
  ),
};
