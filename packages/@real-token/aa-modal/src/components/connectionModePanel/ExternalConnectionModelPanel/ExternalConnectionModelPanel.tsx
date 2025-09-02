import { Divider, Flex, Grid } from "@mantine/core";
import { WalletButtonCustom } from "../../Buttons/WalletButton/WalletCustomButton";
import { ReadOnly } from "./ReadOnly";
import { ExternalConnectorModeConfig } from "../../../types";
import { AUTH_CONNECTION_TYPE } from "@web3auth/modal";

export const ExternalConnectionModelPanel = ({
  connectors,
  config,
}: {
  connectors: AUTH_CONNECTION_TYPE[];
  config: ExternalConnectorModeConfig;
}) => {
  const nbrConnectors = connectors.length;
  return (
    <Flex direction="column" gap="lg">
      <Grid gutter={"md"}>
        {connectors.map((connectorName, index) => (
          <Grid.Col
            span={{
              base: 12,
              md: 12,
              lg: nbrConnectors == 1 && index == 0 ? 12 : 6,
            }}
          >
            <WalletButtonCustom connector={connectorName} />
          </Grid.Col>
        ))}
      </Grid>
      <ReadOnly />
    </Flex>
  );
};
