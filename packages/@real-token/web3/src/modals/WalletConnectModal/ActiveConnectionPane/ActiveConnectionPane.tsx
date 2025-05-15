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

  const { walletConnectDisconnect, wcClient, txs } = useAA();
  const activeSessions = wcClient?.getActiveSessions();

  const session = activeSessions?.[sessionKey];

  const sessionWcTx = useMemo(() => {
    return (
      txs.wc.filter(
        (tx) =>
          tx.event.verifyContext.verified.origin === session?.peer.metadata.url
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

  return (
    <Card withBorder>
      <Flex direction={"column"} gap={"sm"}>
        <Flex className={classes.connectContainer} align={"center"} gap={"md"}>
          <img
            src={`${session.peer.metadata.url}/favicon.ico`}
            alt={`${session.peer.metadata.name} logo`}
            className={classes.websiteLogo}
            style={{ width: 24, height: 24 }}
          />
          <Flex direction={"column"}>
            <Text fw={700} fz={20}>
              {session.peer.metadata.name}
            </Text>
            <Text
              component="a"
              href={session.peer.metadata.url}
              className={classes.link}
            >
              {session.peer.metadata.url}
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
