import { QRCodeSVG } from "qrcode.react";
import { CustomDrawer } from "../CustomDrawer/CustomDrawer";
import {
  Loader,
  Text,
  Card,
  Flex,
  Button,
  ActionIcon,
  Box,
} from "@mantine/core";
import { AaWalletExternal } from "../../types/web3auth";
import { useAaModalConfig } from "../AaModalProvider";
import { IconClipboardCopy } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const QrCodeDrawer = ({
  opened,
  setOpened,
  wallet,
  setWalletInstallationDrawerOpened,
}: {
  opened: boolean;
  setOpened: (value: boolean) => void;
  wallet: AaWalletExternal | null;
  setWalletInstallationDrawerOpened: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const { walletConnectUri, isLoading } = useAaModalConfig();
  const { t } = useTranslation("main", { keyPrefix: "qrCodeDrawer" });

  const onClick = async () => {
    if (!walletConnectUri) return;
    await navigator.clipboard.writeText(walletConnectUri);
    notifications.show({
      title: t("notifications.copiedToClipboard"),
      message: t("notifications.linkCopiedToClipboard"),
      color: "green",
    });
  };

  const onClickGetWallet = async () => {
    setOpened(false);
    setWalletInstallationDrawerOpened(true);
  };

  if (!wallet) return null;
  return (
    <CustomDrawer isOpen={opened} onClose={() => setOpened(false)}>
      {isLoading ? (
        <Box p={"xl"}>
          <Flex justify={"center"} align={"center"} h={"100%"}>
            <Loader />
          </Flex>
        </Box>
      ) : walletConnectUri ? (
        <Flex
          direction={"column"}
          justify={"center"}
          h={"100%"}
          w={"100%"}
          gap={"md"}
        >
          <Card p={"md"} withBorder>
            <Flex direction={"column"} gap={"md"}>
              <Flex justify={"center"} w={"100%"}>
                <QRCodeSVG
                  value={walletConnectUri}
                  title={`${t("title")} ${wallet.name}`}
                  size={256}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  imageSettings={{
                    src: wallet.logo,
                    x: undefined,
                    y: undefined,
                    height: 42,
                    width: 42,
                    opacity: 1,
                    excavate: true,
                  }}
                />
              </Flex>
              <Text>{t("description")}</Text>
              <Flex gap={"md"} justify={"center"}>
                <Card p={"xs"} withBorder>
                  <Flex align={"center"} gap={"xs"}>
                    <Text>{t("button")}</Text>
                    <ActionIcon onClick={onClick}>
                      <IconClipboardCopy />
                    </ActionIcon>
                  </Flex>
                </Card>
              </Flex>
            </Flex>
          </Card>
          <Card p={"md"} withBorder>
            <Flex justify={"space-between"} align={"center"}>
              <Text>{t("noWallet", { name: wallet.name })}</Text>
              <Button onClick={onClickGetWallet}>{t("getWallet")}</Button>
            </Flex>
          </Card>
        </Flex>
      ) : (
        <Text>{t("noWalletConnectUri")}</Text>
      )}
    </CustomDrawer>
  );
};
