import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Button,
  Flex,
  Image,
  Paper,
  ScrollArea,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useAA } from "@real-token/aa-core";
import { IconAlertOctagonFilled } from "@tabler/icons-react";

import { ActiveConnectionPane } from "./ActiveConnectionPane/ActiveConnectionPane";
import { PermissionsRequested } from "./PermissionsRequested";
import { SecurityAlert } from "./SecurityAlert";
import { ValidationStatusBadge } from "./ValidationStatusBadge";

export const WalletConnectModal: FC<ContextModalProps> = ({ id }) => {
  const { t } = useTranslation("modals", { keyPrefix: "walletConnect" });

  const [url, setUrl] = useState<string>("");

  const {
    walletConnectPair,
    wcClient,
    sdkVersion,
    latestSdkVersion,
    proposals,
  } = useAA();

  const activeSessions = wcClient?.getActiveSessions();

  const sessionProposal = proposals?.[0];

  const wcEnabled = useMemo(() => {
    return sdkVersion == latestSdkVersion;
  }, [sdkVersion, latestSdkVersion]);

  const connect = () => {
    try {
      walletConnectPair(url);
      setUrl("");
    } catch (e) {
      console.error(e);
      notifications.show({
        color: "red",
        title: t("error"),
        message: (e as Error).message,
      });
    }
  };

  if (sessionProposal) {
    // "UNKNOWN" | "VALID" | "INVALID"
    const validationStatus = sessionProposal.verifyContext.verified.validation;
    const isScam = sessionProposal.verifyContext.verified.isScam ?? false;

    const buttonColor =
      validationStatus == "VALID"
        ? "blue"
        : validationStatus == "INVALID"
        ? "red"
        : "orange";

    return (
      <Flex direction={"column"} gap={"lg"}>
        <Flex direction={"column"} align={"center"} gap={"xs"}>
          <Image
            src={sessionProposal.params.proposer.metadata.icons[0]}
            w={80}
            h={80}
            radius={"md"}
            fallbackSrc="https://placehold.co/80x80?text=🌐"
          />
          <Title
            order={4}
            ta={"center"}
          >{`"${sessionProposal.params.proposer.metadata.name}" wants to connect`}</Title>
          <Text c={"dimmed"}>
            {sessionProposal.params.proposer.metadata.url}
          </Text>
          <ValidationStatusBadge
            validationStatus={validationStatus}
            isScam={isScam}
          />
        </Flex>
        <PermissionsRequested
          permissions={sessionProposal.params.requiredNamespaces.eip155.methods}
        />
        <SecurityAlert validationStatus={validationStatus} isScam={isScam} />
        <Flex gap={"md"}>
          <Button color="blue" w={"100%"} variant="outline">
            Reject
          </Button>
          <Button w={"100%"} color={buttonColor}>
            {"Approve"}
          </Button>
        </Flex>
      </Flex>
    );
  }

  if (!wcEnabled) {
    return (
      <Flex direction={"column"} gap={"md"}>
        <Flex direction={"column"} align={"center"} gap={2}>
          <IconAlertOctagonFilled fill="orange" size={72} />
          <Text fw={600} fz={22} style={{ textAlign: "center" }}>
            {t("disabled.info", { version: sdkVersion })}
          </Text>
        </Flex>
        {/** TODO: change last version when available in  */}
        <Text fz={18} fs={"italic"}>
          {t("disabled.action", { version: latestSdkVersion })}
        </Text>
        <Button
          onClick={() => window.open("https://realt.co/", "_blank")}
          component="a"
          color={"#3B99FC"}
        >
          {t("disabled.button")}
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction={"column"} p={"xs"} gap={"xl"}>
      {activeSessions && Object.keys(activeSessions).length > 0 ? (
        <Flex direction={"column"} gap={"sm"}>
          <Text fw={700} fz={20}>
            {t("activeConnections", {
              count: Object.keys(activeSessions).length,
            })}
          </Text>
          <ScrollArea h={300}>
            <Flex direction={"column"} gap={"sm"}>
              {Object.keys(activeSessions).map((sessionKey) => (
                <ActiveConnectionPane
                  key={sessionKey}
                  sessionKey={sessionKey}
                />
              ))}
            </Flex>
          </ScrollArea>
        </Flex>
      ) : undefined}
      <TextInput
        label={"WalletConnect URL"}
        value={url}
        onChange={(e) => setUrl(e.currentTarget.value)}
      />
      <Button color={"#3B99FC"} onClick={() => connect()} disabled={!url}>
        {t("connect")}
      </Button>
    </Flex>
  );
};
