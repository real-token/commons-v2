import { Button } from "@mantine/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAA } from "@real-token/aa-core";

export const ConnectButton: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "wallet" });
  const { login } = useAA();

  return <Button aria-label={t("title")}>{t("title")}</Button>;
};
