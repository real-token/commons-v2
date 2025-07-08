import { Badge } from "@mantine/core";
import {
  IconAlertCircle,
  IconAlertTriangleFilled,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const ValidationStatusBadge = ({
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
    validationStatus == "INVALID"
      ? t("domainMismatchTitle")
      : t("unknownDomainTitle");
  const icon =
    validationStatus == "INVALID" ? (
      <IconAlertCircle size={16} />
    ) : (
      <IconInfoCircle size={16} />
    );

  return (
    <Badge
      color={isScam ? "red" : color}
      leftSection={isScam ? <IconAlertTriangleFilled size={16} /> : icon}
    >
      {isScam ? t("securityRisk") : label}
    </Badge>
  );
};
