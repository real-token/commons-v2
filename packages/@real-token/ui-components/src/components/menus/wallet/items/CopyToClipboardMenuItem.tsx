import { Menu } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { modals } from "@mantine/modals";

export const CopyToClipboardMenuItem = () => {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });

  const handleCopy = () => {
    modals.openContextModal({
      modal: "copyAddress",
      innerProps: {},
    });
  };

  return (
    <Menu.Item leftSection={<IconCopy size={18} />} onClick={handleCopy}>
      {t("copy")}
    </Menu.Item>
  );
};
