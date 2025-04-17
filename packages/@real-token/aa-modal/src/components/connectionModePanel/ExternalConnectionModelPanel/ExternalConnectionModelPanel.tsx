import { Flex, Grid } from "@mantine/core";
import { ConnectorModeConfig } from "../../../types";
import { WalletButtonCustom } from "../../Buttons/WalletButton/WalletCustomButton";
import { WalletButton } from "@rainbow-me/rainbowkit";

export const ExternalConnectionModelPanel = ({
  config,
}: {
  config: ConnectorModeConfig;
}) => {
  const nbrConnectors = config.connectorsName.length;
  return (
    <Grid gutter={"md"}>
      {config.connectorsName.map((connectorName, index) => (
        <WalletButton.Custom
          key={`external-${index}-${connectorName}`}
          wallet={connectorName}
        >
          {(props) => {
            const hideConnector =
              props.connector.installed !== undefined &&
              props.connector.installed === false;
            if (hideConnector) return null;
            return (
              <Grid.Col
                span={{
                  base: 12,
                  md: 12,
                  lg: nbrConnectors == 1 && index == 0 ? 12 : 6,
                }}
              >
                <WalletButtonCustom {...props} />
              </Grid.Col>
            );
          }}
        </WalletButton.Custom>
      ))}
    </Grid>
  );
};
