import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { modals } from "@mantine/modals";
import { AaModalConfig } from "@real-token/types";
import { useRealTokenUIConfig } from "@real-token/core";
import { useWeb3AuthPrivate } from "../../hooks";

export const AaConnectButton = ({ config }: { config?: AaModalConfig }) => {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });

  const web3authPrivate = useWeb3AuthPrivate();
  const { aaModalConfig } = useRealTokenUIConfig();

  const handleConnect = () => {
    modals.openContextModal({
      modal: "aaModal",
      innerProps: config || aaModalConfig,
    });
  };

  return (
    <Button
      aria-label={t("title")}
      onClick={handleConnect}
      loading={web3authPrivate.status === "connecting"}
    >
      {t("title")}
    </Button>
  );
};
