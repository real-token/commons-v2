import { useTranslation } from "react-i18next";

import { Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconAddressBook } from "@tabler/icons-react";

export const ManageAaAccountsMenuItem = () => {
  const { t } = useTranslation("modals");

  const openModal = () => {
    modals.openContextModal({
      modal: "manageAaAccounts",
      title: <Text size={"xl"}>{t("manageWallet.title")}</Text>,
      innerProps: {},
    });
  };

  return (
    <Menu.Item
      leftSection={<IconAddressBook size={18} />}
      onClick={() => {
        console.log("open modal");
        openModal();
      }}
    >
      {t("manageWallet.title")}
    </Menu.Item>
  );
};
