import { Menu } from "@mantine/core";
import { useAA } from "@real-token/aa-core";
import { useCurrentNetwork } from "@real-token/core";
import { useTranslation } from "react-i18next";
import { Link } from "@/components/link";
import { IconExternalLink } from "@tabler/icons-react";

export function ViewOnExplorerMenuItem() {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });
  const { walletAddress } = useAA();

  const currentNetwork = useCurrentNetwork();
  if (!currentNetwork || !walletAddress) return <></>;

  return (
    <Menu.Item
      leftSection={<IconExternalLink size={18} />}
      component={Link}
      href={`${currentNetwork.blockExplorerUrl}address/${walletAddress}`}
      target={"_blank"}
    >
      {t("viewOn")}
    </Menu.Item>
  );
}
ViewOnExplorerMenuItem.displayName = "ViewOnExplorerMenuItem";
