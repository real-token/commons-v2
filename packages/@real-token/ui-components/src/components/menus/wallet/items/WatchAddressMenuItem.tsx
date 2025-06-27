import { Menu } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconSpy } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const WatchAddressButton = () => {
  const { t } = useTranslation("modals", { keyPrefix: "watchWallet" });

  const openWatchWalletModal = () => {
    modals.openContextModal({
      modal: "watchWallet",
      innerProps: {},
    });
  };

  return (
    <Menu.Item
      leftSection={<IconSpy size={18} />}
      onClick={openWatchWalletModal}
    >
      {t("title")}
    </Menu.Item>
  );
};
