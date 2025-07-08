import { Alert } from "@mantine/core";
import {
  IconAlertCircle,
  IconAlertTriangleFilled,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const SecurityAlert = ({
  validationStatus,
  isScam,
}: {
  validationStatus: string;
  isScam: boolean;
}) => {
  const { t } = useTranslation("modals", {
    keyPrefix: "walletConnect.sessionProposal.securityAlert",
  });
  if (validationStatus == "VALID") return null;
  const color = validationStatus == "INVALID" ? "red" : "orange";
  const label =
    validationStatus == "INVALID" ? t("domainMismatch") : t("unknownDomain");
  const title =
    validationStatus == "INVALID"
      ? t("domainMismatchTitle")
      : t("unknownDomainTitle");
  const icon =
    validationStatus == "INVALID" ? (
      <IconAlertCircle size={24} />
    ) : (
      <IconInfoCircle size={24} />
    );
  return (
    <Alert
      color={isScam ? "red" : color}
      variant={"light"}
      icon={isScam ? <IconAlertTriangleFilled size={24} /> : icon}
      title={isScam ? t("isScamTitle") : title}
    >
      {isScam ? t("isScam") : label}
    </Alert>
  );
};
