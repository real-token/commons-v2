import { FC } from "react";
import { Stack, Flex, Group, Button, Text, Card, Alert } from "@mantine/core";
import { IconCheck, IconX, IconAlertTriangle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTransactionCart } from "../../../context/TransactionCartContext";
import { GasDisplay } from "./GasDisplay";

interface CartFooterProps {
  onClose: () => void;
}

export const CartFooter: FC<CartFooterProps> = ({ onClose }) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });
  const {
    totalGasEstimate,
    hasFailures,
    isReady,
    isSimulating,
    confirmAll,
    rejectAll,
    groups,
  } = useTransactionCart();

  // Count failed transactions
  const failedCount = groups.reduce((count, group) => {
    return (
      count +
      group.transactions.filter(
        (tx) =>
          tx.simulation?.status === "will_revert" ||
          tx.simulation?.status === "error"
      ).length
    );
  }, 0);

  const handleConfirmAll = async () => {
    await confirmAll();
    onClose();
  };

  const handleRejectAll = async () => {
    await rejectAll();
    onClose();
  };

  return (
    <Stack gap="md">
      {/* Warning if has failures */}
      {hasFailures && (
        <Alert
          icon={<IconAlertTriangle size={16} />}
          color="orange"
          variant="light"
        >
          {t("simulation.warningFailed", { count: failedCount })}
        </Alert>
      )}

      {/* Total Gas Summary */}
      {totalGasEstimate && (
        <Card bg="gray.0" p="sm" radius="md">
          <Flex justify="space-between" align="center">
            <Text fw={500}>{t("gas.total")}</Text>
            <GasDisplay estimate={totalGasEstimate} size="md" />
          </Flex>
        </Card>
      )}

      {/* Action Buttons */}
      <Group grow>
        <Button
          color="green"
          size="md"
          leftSection={<IconCheck size={18} />}
          onClick={handleConfirmAll}
          disabled={!isReady || hasFailures}
          loading={isSimulating}
        >
          {t("buttons.confirmAll")}
        </Button>
        <Button
          color="red"
          variant="outline"
          size="md"
          leftSection={<IconX size={18} />}
          onClick={handleRejectAll}
        >
          {t("buttons.rejectAll")}
        </Button>
      </Group>
    </Stack>
  );
};
