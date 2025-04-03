import { Menu } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useAA } from "@real-token/aa-core";
import { IconCopy } from "@tabler/icons-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NOTIFICATIONS, NotificationsID } from "@/notifications";

export const CopyToClipboardMenuItem = () => {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });

  const { walletAddress } = useAA();
  const { copy } = useClipboard({ timeout: 500 });

  const onCopy = useCallback(() => {
    copy(walletAddress);
    showNotification(NOTIFICATIONS[NotificationsID.userCopied]);
  }, [walletAddress, copy]);

  return (
    <Menu.Item leftSection={<IconCopy size={18} />} onClick={onCopy}>
      {t("copy")}
    </Menu.Item>
  );
};
