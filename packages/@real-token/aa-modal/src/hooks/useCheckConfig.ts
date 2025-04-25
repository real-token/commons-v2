import { useEffect } from "react";
import { AaModalConfig } from "../types/aaModalConfig";
import { useConnectors, Connector, CreateConnectorFn } from "wagmi";

const checkAaConnectionMode = (
  config: AaModalConfig,
  connectors: readonly Connector<CreateConnectorFn>[]
) => {
  const { connectionMode } = config;
  const connectionAA = connectionMode.aa;

  if (connectionAA) {
    if (connectionAA.connectorsName.length > 0) {
      const connectorsName = connectionAA.connectorsName;
      connectorsName.forEach((connectorName) => {
        const connector = connectors.find(
          // @ts-expect-error
          (connector) => connector.rkDetails.id === connectorName
        );
        if (!connector) {
          throw new Error(
            `Connector ${connectorName} not found for: config.connectionMode[aa].connectorsName`
          );
        }
      });
    }
    if (
      connectionAA.socialConnectorsName &&
      connectionAA.socialConnectorsName.length > 0
    ) {
      const socialConnectorsName = connectionAA.socialConnectorsName;
      socialConnectorsName.forEach((socialConnectorName) => {
        const socialConnector = connectors.find((connector) => {
          return (
            connector.id === "web3auth" &&
            // @ts-expect-error
            connector.rkDetails.id == socialConnectorName
          );
        });
        if (!socialConnector) {
          throw new Error(
            `Social connector ${socialConnectorName} not found for: config.connectionMode[aa].socialConnectorsName`
          );
        }
      });
    }
  }
};

const checkExternalConnectionMode = (
  config: AaModalConfig,
  connectors: readonly Connector<CreateConnectorFn>[]
) => {
  const { connectionMode } = config;
  const connectionExternal = connectionMode.external;
  if (connectionExternal.connectorsName.length > 0) {
    const connectorsName = connectionExternal.connectorsName;
    connectorsName.forEach((connectorName) => {
      const connector = connectors.find((connector) => {
        // @ts-expect-error
        return connector.rkDetails.id === connectorName;
      });
      if (!connector) {
        throw new Error(
          `Connector ${connectorName} not found for: config.connectionMode[external].connectorsName`
        );
      }
    });
  }
};

export const useCheckConfig = (config: AaModalConfig) => {
  const connectors = useConnectors();
  const { connectionMode } = config;

  useEffect(() => {
    if (!connectors || !config) return;

    const connectionAA = connectionMode.aa;
    const connectionExternal = connectionMode.external;
    if (
      connectionAA.connectorsName.length == 0 &&
      connectionExternal.connectorsName.length == 0
    ) {
      throw new Error(
        "Cannot use AaModal without connectors; Please provide at least one connector"
      );
    }

    checkAaConnectionMode(config, connectors);
    checkExternalConnectionMode(config, connectors);

    // TODO: add check for TBA configuration
  }, [config, connectors]);
};
