import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ActionIcon,
  Button,
  Flex,
  Image,
  ScrollArea,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useAA } from "@real-token/aa-core";
import {
  IconAlertOctagonFilled,
  IconArrowLeft,
  IconArrowRight,
  IconX,
  IconCheck,
  IconPlus,
  IconNotification,
} from "@tabler/icons-react";

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
    proposalAction,
  } = useAA();

  const activeSessions = wcClient?.getActiveSessions();

  const [showProposalSession, setShowProposalSession] =
    useState<boolean>(false);
  const [sessionProposalIndex, setSessionProposalIndex] = useState<number>(0);
  const sessionProposal = useMemo(
    () => proposals?.[sessionProposalIndex],
    [proposals, sessionProposalIndex]
  );
  console.log(proposals);

  const wcEnabled = useMemo(() => {
    return sdkVersion == latestSdkVersion;
  }, [sdkVersion, latestSdkVersion]);

  const connect = () => {
    try {
      walletConnectPair(url);
      setUrl("");
      setShowProposalSession(true);
    } catch (e) {
      console.error(e);
      notifications.show({
        color: "red",
        title: t("error"),
        message: (e as Error).message,
      });
    }
  };

  const handleProposalAction = (id: number, reject: boolean) => {
    try {
      proposalAction(id, reject);
      if (reject) {
        notifications.show({
          id: "session-proposal-refused",
          title: t("sessionProposal.notifications.title"),
          message: t("sessionProposal.notifications.refused"),
          icon: <IconX />,
          color: "red",
        });
      } else {
        notifications.show({
          id: "session-proposal-accepted",
          title: t("sessionProposal.notifications.title"),
          message: t("sessionProposal.notifications.accepted"),
          icon: <IconCheck />,
          color: "green",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (showProposalSession && sessionProposal) {
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
        {proposals?.length > 1 ? (
          <Flex
            direction={"row"}
            justify={"space-between"}
            align={"center"}
            w={"100%"}
            gap={"md"}
          >
            <ActionIcon
              onClick={() => setSessionProposalIndex(sessionProposalIndex - 1)}
              disabled={sessionProposalIndex - 1 < 0}
            >
              <IconArrowLeft />
            </ActionIcon>
            <Text fw={700} fz={20}>
              {sessionProposalIndex + 1} / {proposals?.length}
            </Text>
            <ActionIcon
              onClick={() => setSessionProposalIndex(sessionProposalIndex + 1)}
              disabled={sessionProposalIndex + 1 >= proposals?.length}
            >
              <IconArrowRight />
            </ActionIcon>
          </Flex>
        ) : undefined}
        <Flex direction={"column"} align={"center"} gap={"xs"}>
          <Image
            src={sessionProposal.params.proposer.metadata.icons[0]}
            w={80}
            h={80}
            radius={"md"}
            fallbackSrc="https://placehold.co/80x80?text=🌐"
          />
          <Title order={4} ta={"center"}>
            {t("sessionProposal.wantToConnect", {
              name: sessionProposal.params.proposer.metadata.name,
            })}
          </Title>
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
          <ActionIcon
            onClick={() => setShowProposalSession(false)}
            size={"lg"}
            variant="outline"
          >
            <IconArrowLeft />
          </ActionIcon>
          <Button
            color="blue"
            w={"100%"}
            variant="outline"
            onClick={() => {
              handleProposalAction(sessionProposal.id, true);
            }}
          >
            {t("sessionProposal.buttons.reject")}
          </Button>
          <Button
            w={"100%"}
            color={buttonColor}
            onClick={() => {
              handleProposalAction(sessionProposal.id, false);
            }}
          >
            {t("sessionProposal.buttons.approve")}
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
      <Flex
        direction={"row"}
        justify={
          Object.keys(activeSessions ?? {}).length > 0 && proposals?.length > 0
            ? "space-between"
            : proposals?.length > 0
              ? "end"
              : "center"
        }
        align={"center"}
      >
        {activeSessions && Object.keys(activeSessions).length > 0 ? (
          <Text fw={700} fz={20}>
            {t("activeConnections", {
              count: Object.keys(activeSessions).length,
            })}
          </Text>
        ) : undefined}
        {proposals?.length > 0 ? (
          <Button
            onClick={() => setShowProposalSession(true)}
            leftSection={<IconNotification size={16} />}
            size={"sm"}
          >
            <Text>{`${proposals?.length} Proposals`}</Text>
          </Button>
        ) : undefined}
      </Flex>
      {activeSessions && Object.keys(activeSessions).length > 0 ? (
        <ScrollArea h={300}>
          <Flex direction={"column"} gap={"sm"}>
            {Object.keys(activeSessions).map((sessionKey) => (
              <ActiveConnectionPane key={sessionKey} sessionKey={sessionKey} />
            ))}
          </Flex>
        </ScrollArea>
      ) : undefined}
      <TextInput
        label={"WalletConnect URL"}
        value={url}
        onChange={(e) => {
          setUrl(e.currentTarget.value);
        }}
      />
      <Button color={"#3B99FC"} onClick={() => connect()} disabled={!url}>
        {t("connect")}
      </Button>
    </Flex>
  );
};
