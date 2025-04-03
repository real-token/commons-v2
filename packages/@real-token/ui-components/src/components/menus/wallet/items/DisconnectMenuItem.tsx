import { useTranslation } from "react-i18next";
import { Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useAA } from "@real-token/aa-core";

export const DisconnectMenuItem = () => {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });

  const { logout } = useAA();

  return (
    <Menu.Item leftSection={<IconLogout size={18} />} onClick={() => logout()}>
      {t("disconnect")}
    </Menu.Item>
  );
};
DisconnectMenuItem.displayName = "DisconnectMenuItem";
