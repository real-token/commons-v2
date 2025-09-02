import { useMemo } from "react";
import {
  AaModalConfig,
  ACCEPTED_GROUP_NAMES,
  CONNECTOR_CATEGORY,
  REALTOKEN_AA_GROUP_NAME,
} from "../types";
import { AUTH_CONNECTION_TYPE } from "@web3auth/modal";

export type ParsedConnectorsConfig = {
  [CONNECTOR_CATEGORY.AA_ADVANCED]: AUTH_CONNECTION_TYPE[];
  [CONNECTOR_CATEGORY.AA_SOCIALS]: AUTH_CONNECTION_TYPE[];
  [CONNECTOR_CATEGORY.EXTERNAL]: AUTH_CONNECTION_TYPE[];
};

export const useParsedConnectorsConfig = (
  config: AaModalConfig
): ParsedConnectorsConfig => {
  const connectors = config.connectors;

  return useMemo(() => {
    const acc: ParsedConnectorsConfig = {
      [CONNECTOR_CATEGORY.AA_ADVANCED]: [],
      [CONNECTOR_CATEGORY.AA_SOCIALS]: [],
      [CONNECTOR_CATEGORY.EXTERNAL]: [],
    };
    Object.keys(connectors).forEach((connectorGroupName) => {
      const groupName = connectorGroupName as REALTOKEN_AA_GROUP_NAME;
      connectors[groupName].forEach((connector) => {
        if (!ACCEPTED_GROUP_NAMES.includes(connectorGroupName)) {
          throw new Error(
            `Group name "${connectorGroupName}" not found for connector ${connector}`
          );
        }

        if (groupName === REALTOKEN_AA_GROUP_NAME.AA_ADVANCED) {
          acc[CONNECTOR_CATEGORY.AA_ADVANCED].push(connector);
        } else if (groupName === REALTOKEN_AA_GROUP_NAME.AA_SOCIALS) {
          acc[CONNECTOR_CATEGORY.AA_SOCIALS].push(connector);
        } else if (groupName === REALTOKEN_AA_GROUP_NAME.EXTERNAL) {
          acc[CONNECTOR_CATEGORY.EXTERNAL].push(connector);
        } else if (
          groupName === REALTOKEN_AA_GROUP_NAME.AA_ADVANCED_AND_EXTERNAL
        ) {
          acc[CONNECTOR_CATEGORY.AA_ADVANCED].push(connector);
          acc[CONNECTOR_CATEGORY.EXTERNAL].push(connector);
        }
      });
    });
    return acc;
  }, [connectors]);
};
