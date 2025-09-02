import { Button } from "@mantine/core";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const AaConnectButton = () => {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });
  const { connect } = useWeb3AuthConnect();

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  return (
    <Button aria-label={t("title")} onClick={handleConnect}>
      {t("title")}
    </Button>
  );
};
