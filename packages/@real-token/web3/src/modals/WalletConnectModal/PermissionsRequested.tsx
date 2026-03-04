import { Flex, Paper, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const permissionsToText = new Map([
  ["eth_accounts", "eth_accounts"],
  ["eth_requestAccounts", "eth_requestAccounts"],
  ["eth_sendRawTransaction", "eth_sendRawTransaction"],
  ["eth_sign", "eth_sign"],
  ["eth_signTransaction", "eth_signTransaction"],
  ["eth_signTypedData", "eth_signTypedData"],
  ["eth_signTypedData_v3", "eth_signTypedData_v3"],
  ["eth_signTypedData_v4", "eth_signTypedData_v4"],
  ["eth_sendTransaction", "eth_sendTransaction"],
  ["personal_sign", "personal_sign"],
  ["wallet_switchEthereumChain", "wallet_switchEthereumChain"],
  ["wallet_addEthereumChain", "wallet_addEthereumChain"],
  ["wallet_getPermissions", "wallet_getPermissions"],
  ["wallet_requestPermissions", "wallet_requestPermissions"],
  ["wallet_registerOnboarding", "wallet_registerOnboarding"],
  ["wallet_watchAsset", "wallet_watchAsset"],
  ["wallet_scanQRCode", "wallet_scanQRCode"],
  ["wallet_getCallsStatus", "wallet_getCallsStatus"],
  ["wallet_showCallsStatus", "wallet_showCallsStatus"],
  ["wallet_sendCalls", "wallet_sendCalls"],
  ["wallet_getCapabilities", "wallet_getCapabilities"],
  ["wallet_grantPermissions", "wallet_grantPermissions"],
  ["wallet_revokePermissions", "wallet_revokePermissions"],
  ["wallet_getAssets", "wallet_getAssets"],
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
          {permissions
            .filter((permission) => permissionsToText.has(permission))
            .map((permission) => (
              <Flex key={permission} gap={4} align={"center"}>
                <IconCheck size={16} />
                <Text fz={14}>
                  {t(permissionsToText.get(permission)!)}
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
