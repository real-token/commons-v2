import { Accordion, Button, Flex, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useQuery } from "@tanstack/react-query";
import { WalletConnector } from "@rainbow-me/rainbowkit/dist/wallets/useWalletConnectors";
import { ContextModalProps } from "@mantine/modals";
import { merge } from "lodash";

export const WalletButtonCustom = ({
  error,
  loading,
  connected,
  ready,
  mounted,
  connector,
  connect,
}: {
  error: boolean;
  loading: boolean;
  connected: boolean;
  ready: boolean;
  mounted: boolean;
  connector: WalletConnector;
  connect: () => Promise<void>;
}) => {
  const { data: iconUrl } = useQuery({
    queryKey: ["iconUrl", connector.id],
    queryFn: async () => {
      if (typeof connector.iconUrl === "function") {
        return await connector.iconUrl();
      }
      return connector.iconUrl;
    },
  });

  return (
    <Button
      onClick={async () => {
        connector.connect();
      }}
      leftSection={<img src={iconUrl} />}
      color={connector.iconBackground}
      loading={loading || !mounted || !ready}
    >
      <Text c={connector.iconAccent}>{connector.name}</Text>
    </Button>
  );
};

type AAModalProps = {
  showAAConnectors: boolean;
  showTBAConnectors: boolean;
  showExternalConnectors: boolean;
  connectors: {
    AA?: WalletConnector[];
    TBA?: WalletConnector[];
    External?: WalletConnector[];
  };
};
const defaultProps: AAModalProps = {
  showAAConnectors: true,
  showTBAConnectors: true,
  showExternalConnectors: true,
  connectors: {}, // TODO: add default connectors from @real-token/web3 package
};

export const AaModal = ({
  innerProps,
  id,
}: ContextModalProps<AAModalProps>) => {
  const config = useMemo(
    () => merge({}, defaultProps, innerProps),
    [innerProps]
  );

  const {
    showAAConnectors,
    showTBAConnectors,
    showExternalConnectors,
    connectors,
  } = config;

  const [value, setValue] = useState<string | null>("AA");

  const items = ["AA", "TBA", "External wallet"].map((item) => (
    <Accordion.Item key={item} value={item}>
      <Accordion.Control>{item}</Accordion.Control>
      <Accordion.Panel>
        <Flex>
          <WalletButton.Custom wallet="metamask">
            {(props) => <WalletButtonCustom {...props} />}
          </WalletButton.Custom>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Flex w={"100%"}>
      <Accordion
        w={"100%"}
        defaultValue={"AA"}
        value={value}
        onChange={setValue}
      >
        {items}
      </Accordion>
    </Flex>
  );
};
