import { useMemo } from "react";
import { useGetRkConnectors } from "./useGetRkConnectors";
import {
  AaModalConfig,
  ACCEPTED_GROUP_NAMES,
  CONNECTOR_CATEGORY,
  REALTOKEN_AA_GROUP_NAME,
} from "../types";

export type ParsedConnectorsConfig = {
  [CONNECTOR_CATEGORY.AA_ADVANCED]: string[];
  [CONNECTOR_CATEGORY.AA_SOCIALS]: string[];
  [CONNECTOR_CATEGORY.EXTERNAL]: string[];
};

export const useParsedConnectorsConfig = (
  config: AaModalConfig
): ParsedConnectorsConfig => {
  const rkConnectors = useGetRkConnectors();
  // console.log("rkConnectors", rkConnectors);

  return useMemo(() => {
    const categorizedConnectors = rkConnectors.reduce<ParsedConnectorsConfig>(
      (acc, connector) => {
        if (!connector.rkDetails) {
          return acc;
        }

        const groupName = connector.rkDetails.groupName;
        if (!groupName) {
          throw new Error("Group name not found");
        }
        if (!ACCEPTED_GROUP_NAMES.includes(groupName)) {
          throw new Error(
            `Group name "${groupName}" not found for connector ${connector.rkDetails.name}`
          );
        }

        const connectorId = connector.rkDetails.id;

        if (groupName === REALTOKEN_AA_GROUP_NAME.AA_ADVANCED) {
          acc[CONNECTOR_CATEGORY.AA_ADVANCED].push(connectorId);
        } else if (groupName === REALTOKEN_AA_GROUP_NAME.AA_SOCIALS) {
          acc[CONNECTOR_CATEGORY.AA_SOCIALS].push(connectorId);
        } else if (groupName === REALTOKEN_AA_GROUP_NAME.EXTERNAL) {
          acc[CONNECTOR_CATEGORY.EXTERNAL].push(connectorId);
        } else if (
          groupName === REALTOKEN_AA_GROUP_NAME.AA_ADVANCED_AND_EXTERNAL
        ) {
          acc[CONNECTOR_CATEGORY.AA_ADVANCED].push(connectorId);
          acc[CONNECTOR_CATEGORY.EXTERNAL].push(connectorId);
        }

        return acc;
      },
      {
        [CONNECTOR_CATEGORY.AA_ADVANCED]: [],
        [CONNECTOR_CATEGORY.AA_SOCIALS]: [],
        [CONNECTOR_CATEGORY.EXTERNAL]: [],
      }
    );

    // console.log("categorizedConnectors", categorizedConnectors);

    //TODO:  check if config is set to true but no connector is found
    // Object.keys(config.connectionModeVisibility).forEach((connectionMode) => {
    //   if (config.connectionModeVisibility[connectionMode as CONNECTION_MODE]) {
    //     if (
    //       categorizedConnectors[connectionMode as CONNECTION_MODE].length === 0
    //     ) {
    //       throw new Error(
    //         `You have activated config.connectionModeVisibility.${connectionMode} but no connector found for connection mode ${connectionMode}`
    //       );
    //     }
    //   }
    // });

    return categorizedConnectors;
  }, [rkConnectors]);
};
