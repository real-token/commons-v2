import { Button } from "@mantine/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRealTokenUIConfig } from "@real-token/core";
import { modals } from "@mantine/modals";

export const ConnectButton: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });
  const { aaModalConfig } = useRealTokenUIConfig();

  const handleConnect = () => {
    modals.openContextModal({
      modal: "aaModal",
      innerProps: aaModalConfig,
    });
  };

  return (
    <Button aria-label={t("title")} onClick={handleConnect}>
      {t("title")}
    </Button>
  );
};
