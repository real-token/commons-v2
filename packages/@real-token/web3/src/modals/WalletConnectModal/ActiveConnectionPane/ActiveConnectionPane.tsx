import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import classes from "./ActiveConnectionPane.module.css";

interface ActiveConnectionPaneProps {
  sessionKey: string;
}
export const ActiveConnectionPane = ({
  sessionKey,
}: ActiveConnectionPaneProps) => {
  const { t } = useTranslation("modals");

  const { walletConnectDisconnect, wcConnectedWebsiteMetadata, txs } = useAA();

  const session = wcConnectedWebsiteMetadata?.find(
    (s: any) => s.topic === sessionKey
  ) as any;

  const sessionWcTx = useMemo(() => {
    return (
      txs.wc.filter(
        (tx) =>
          tx.event.verifyContext?.verified?.origin === session?.url
      ) ?? []
    );
  }, [txs, session]);

  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);
  const disconnect = async () => {
    setIsDisconnecting(true);
    walletConnectDisconnect(sessionKey);
  };

  const openTxManagerModal = () => {
    modals.openContextModal({
      modal: "wcTxManagerModal",
      innerProps: {},
    });
  };

  if (!session) return null;

  // Support both MetadataWithTopic (flat: name, url) and SessionTypes.Struct (nested: peer.metadata.name)
  const name = session.name ?? session.peer?.metadata?.name;
  const url = session.url ?? session.peer?.metadata?.url;

  return (
    <Card withBorder>
      <Flex direction={"column"} gap={"sm"}>
        <Flex className={classes.connectContainer} align={"center"} gap={"md"}>
          <img
            src={`${url}/favicon.ico`}
            alt={`${name} logo`}
            className={classes.websiteLogo}
            style={{ width: 24, height: 24 }}
          />
          <Flex direction={"column"}>
            <Text fw={700} fz={20}>
              {name}
            </Text>
            <Text
              component="a"
              href={url}
              className={classes.link}
            >
              {url}
            </Text>
          </Flex>
        </Flex>
        {sessionWcTx.length > 0 ? (
          <Button
            onClick={() => openTxManagerModal()}
            rightSection={<IconArrowNarrowRight />}
            className={classes.button}
          >
            <Text fw={600}>
              {t("walletConnect.txToValidate", {
                count: sessionWcTx.length,
              })}
            </Text>
          </Button>
        ) : undefined}
        <Button
          variant={"outline"}
          onClick={() => disconnect()}
          loading={isDisconnecting}
          className={classes.buttonOutline}
        >
          {t("walletConnect.disconnect")}
        </Button>
      </Flex>
    </Card>
  );
};
