import { FC } from "react";
import {
  Stack,
  Text,
  Group,
  Button,
  Divider,
  ScrollArea,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { IconMaximize, IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTransactionCart } from "@real-token/web3";
import type { TransactionGroup } from "@real-token/web3";
import { CartGroupSummary } from "./CartGroupSummary";
import { GasDisplay } from "./GasDisplay";

interface CartPopoverContentProps {
  groups: TransactionGroup[];
  onExpand: () => void;
  onClose: () => void;
}

export const CartPopoverContent: FC<CartPopoverContentProps> = ({
  groups,
  onExpand,
  onClose,
}) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });
  const {
    totalCount,
    groupCount,
    totalGasEstimate,
    hasFailures,
    isReady,
    confirmAll,
    rejectAll,
    isSimulating,
  } = useTransactionCart();

  const handleConfirmAll = async () => {
    await confirmAll();
    onClose();
  };

  const handleRejectAll = async () => {
    await rejectAll();
    onClose();
  };

  return (
    <Stack gap={0}>
      {/* Header */}
      <Flex justify="space-between" align="center" p="sm" pb="xs">
        <Group gap="xs">
          <Text fw={600} size="sm">
            {t("title")}
          </Text>
          <Text size="xs" c="dimmed">
            ({groupCount} {t(groupCount === 1 ? "group" : "groups")}, {totalCount}{" "}
            {t(totalCount === 1 ? "transaction" : "transactions")})
          </Text>
        </Group>
        <ActionIcon variant="subtle" size="sm" onClick={onExpand} aria-label="Expand">
          <IconMaximize size={16} />
        </ActionIcon>
      </Flex>

      <Divider />

      {/* Groups List */}
      <ScrollArea.Autosize mah={300} offsetScrollbars>
        <Stack gap={0} p="xs">
          {groups.map((group, index) => (
            <div key={group.id}>
              <CartGroupSummary group={group} />
              {index < groups.length - 1 && <Divider my="xs" />}
            </div>
          ))}
        </Stack>
      </ScrollArea.Autosize>

      <Divider />

      {/* Footer */}
      <Stack gap="xs" p="sm">
        {/* Total Gas */}
        {totalGasEstimate && (
          <Flex justify="space-between" align="center">
            <Text size="sm" fw={500}>
              {t("gas.total")}
            </Text>
            <GasDisplay estimate={totalGasEstimate} />
          </Flex>
        )}

        {/* Warning if has failures */}
        {hasFailures && (
          <Text size="xs" c="orange" ta="center">
            {t("simulation.warningFailed")}
          </Text>
        )}

        {/* Action Buttons */}
        <Group grow gap="xs">
          <Button
            size="xs"
            color="green"
            leftSection={<IconCheck size={14} />}
            onClick={handleConfirmAll}
            disabled={!isReady || hasFailures}
            loading={isSimulating}
          >
            {t("buttons.confirmAll")}
          </Button>
          <Button
            size="xs"
            color="red"
            variant="outline"
            leftSection={<IconX size={14} />}
            onClick={handleRejectAll}
          >
            {t("buttons.rejectAll")}
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
};
