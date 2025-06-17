import { Grid } from "@mantine/core";
import { WalletButtonCustom } from "../../Buttons/WalletButton/WalletCustomButton";
import { WalletButton } from "@rainbow-me/rainbowkit";

export const ExternalConnectionModelPanel = ({
  connectors,
}: {
  connectors: string[];
}) => {
  const nbrConnectors = connectors.length;
  return (
    <Grid gutter={"md"}>
      {connectors.map((connectorName, index) => (
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
