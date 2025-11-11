import { Divider, Flex, Loader, ScrollArea, TextInput } from "@mantine/core";
import { WalletButtonCustom } from "../../Buttons/WalletButton/WalletCustomButton";
import { ReadOnly } from "./ReadOnly";
import { useWeb3Auth } from "@web3auth/modal/react";
import { AaWalletExternal, getWeb3AuthPrivateAccess } from "@real-token/web3";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useDeviceAndBrowserDetection } from "../../../hooks/useDeviceAndBrowserDetection";
import { WalletInstallationDrawer } from "../../drawers/WalletInstallationDrawer";
import { QrCodeDrawer } from "../../drawers/QrCodeDrawer";
import { useMutation } from "@tanstack/react-query";
import { useAA } from "@real-token/aa-core";
import { useAaModalConfig } from "../../AaModalProvider";
import { LOGIN_MODE, WALLET_CONNECTOR_TYPE } from "@web3auth/modal";
import { notifications } from "@mantine/notifications";
import { useExternalWallets } from "../../../hooks/useExternalWallets";
import { useTranslation } from "react-i18next";

export const ExternalConnectionModelPanel = () => {
  const { t } = useTranslation("main", {
    keyPrefix: "externalConnectionModelPanel",
  });

  const { web3Auth } = useWeb3Auth();
  const { login } = useAA();
  const { config: aaModalConfig } = useAaModalConfig();

  const web3AuthPrivate = getWeb3AuthPrivateAccess(web3Auth);
  const devices = useDeviceAndBrowserDetection();

  const [walletInstallationDrawerOpened, setWalletInstallationDrawerOpened] =
    useState(false);
  const [qrCodeDrawerOpened, setQrCodeDrawerOpened] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<AaWalletExternal | null>(
    null
  );

  const [search, setSearch] = useState("");

  const { isLoading, aaExternalWallets } = useExternalWallets(search);

  const { mutate: handleConnection } = useMutation({
    mutationFn: async (connector: AaWalletExternal) => {
      if (!web3Auth) return;
      try {
        await login({
          toggleAA: false,
          forceVersion: aaModalConfig.forceVersion,
          walletAddress: aaModalConfig.walletAddress,
        });

        if (connector.isInstalled) {
          await web3Auth.connectTo(
            connector.walletId as unknown as WALLET_CONNECTOR_TYPE,
            {
              chainNamespace: "eip155",
            },
            LOGIN_MODE.NO_MODAL
          );
        } else {
          if (connector.hasWalletConnect) {
            const connector = web3Auth.getConnector(
              "wallet-connect-v2",
              "eip155"
            );
            if (connector) {
              setQrCodeDrawerOpened(true);
              await web3Auth.connectTo(
                "wallet-connect-v2",
                {
                  chainNamespace: "eip155",
                },
                LOGIN_MODE.NO_MODAL
              );
            } else {
              console.error("Connector not found");
            }
          } else {
            setWalletInstallationDrawerOpened(true);
          }
        }
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      console.log("SUCCESS");
    },
    onError: (error) => {
      console.error(error);
      notifications.show({
        title: t("error"),
        message: (error as Error).message,
        color: "red",
      });
    },
  });

  if (isLoading || !aaExternalWallets) return <Loader />;

  return (
    <>
      <WalletInstallationDrawer
        opened={walletInstallationDrawerOpened}
        setOpened={setWalletInstallationDrawerOpened}
        wallet={selectedWallet}
        device={devices}
      />
      <QrCodeDrawer
        opened={qrCodeDrawerOpened}
        setOpened={setQrCodeDrawerOpened}
        wallet={selectedWallet}
        setWalletInstallationDrawerOpened={setWalletInstallationDrawerOpened}
      />
      <Flex direction="column" gap="lg">
        <TextInput
          placeholder={t("search")}
          leftSection={<IconSearch size={18} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Divider />
        <Flex direction="column" gap="md">
          <ScrollArea h={300}>
            <Flex
              direction="column"
              gap="md"
              style={{
                paddingRight: "15px",
              }}
            >
              {aaExternalWallets.map((connector) => (
                <WalletButtonCustom
                  key={connector.walletId}
                  connector={connector}
                  handleConnection={(connector) => {
                    setSelectedWallet(connector);
                    handleConnection(connector);
                  }}
                  loading={false}
                />
              ))}
            </Flex>
          </ScrollArea>
          <ReadOnly />
        </Flex>
      </Flex>
    </>
  );
};
