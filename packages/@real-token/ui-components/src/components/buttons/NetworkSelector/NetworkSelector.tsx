import { useTranslation } from "react-i18next";
import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NetworkList } from "./NetworkList";
import { useCurrentNetwork, useIsUnsuportedNetwork } from "@real-token/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { CurrentNetworkLogo } from "./CurrentNetworkLogo";

export function NetworkMenuItems() {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });

  return (
    <>
      <Menu.Label pb={0}>{t("network")}</Menu.Label>
      <NetworkList />
    </>
  );
}

export function NetworkSelector() {
  const [isOpen, handlers] = useDisclosure(false);
  const isUnsuportedNetwork = useIsUnsuportedNetwork();
  const currentNetwork = useCurrentNetwork();
  if (!currentNetwork) {
    return null;
  }

  return (
    <Menu
      closeOnItemClick={true}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
      disabled={isUnsuportedNetwork}
    >
      <Menu.Target>
        <ActionIcon size={36} variant={"outline"} color={"brand"}>
          {isUnsuportedNetwork ? (
            <IconAlertCircle size={20} aria-label={"Network"} />
          ) : (
            <CurrentNetworkLogo />
          )}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <NetworkMenuItems />
      </Menu.Dropdown>
    </Menu>
  );
}
