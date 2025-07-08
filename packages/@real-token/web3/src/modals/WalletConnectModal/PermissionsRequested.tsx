import { Flex, Paper, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const permissionsToText = new Map([
  ["eth_sendTransaction", "eth_sendTransaction"],
  ["personal_sign", "personal_sign"],
  ["eth_sign", "eth_sign"],
  ["eth_signTypedData", "eth_signTypedData"],
  ["eth_signTypedData_v4", "eth_signTypedData_v4"],
]);

export const PermissionsRequested = ({
  permissions,
}: {
  permissions: string[];
}) => {
  const { t } = useTranslation("modals", {
    keyPrefix: "walletConnect.sessionProposal.permissions",
  });
  return (
    <Paper withBorder p={"xs"} radius={"md"}>
      <Flex direction={"column"} gap={"xs"}>
        <Text fw={600}>{t("title")}</Text>
        <Flex direction={"column"} gap={"xs"}>
          {permissions.map((permission) => (
            <Flex gap={4} align={"center"}>
              <IconCheck size={16} />
              <Text fz={14}>
                {t(permissionsToText.get(permission) ?? "unknown")}
              </Text>
            </Flex>
          ))}
          <Flex gap={4} align={"center"}>
            <IconX size={16} color={"var(--mantine-color-dimmed)"} />
            <Text c={"dimmed"} fz={14}>
              {t("moveFundsWithoutPermissions")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};
