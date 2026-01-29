import { FC } from "react";
import { Flex, Text, Badge, Group, Stack, ThemeIcon } from "@mantine/core";
import {
  IconCheck,
  IconAlertTriangle,
  IconClock,
  IconLoader2,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { TransactionGroup, GroupStatus } from "@real-token/web3";
import { GasDisplay } from "./GasDisplay";

interface CartGroupSummaryProps {
  group: TransactionGroup;
}

const statusConfig: Record<
  GroupStatus,
  { color: string; icon: typeof IconCheck; label: string }
> = {
  pending: { color: "gray", icon: IconClock, label: "status.pending" },
  simulating: { color: "blue", icon: IconLoader2, label: "status.simulating" },
  ready: { color: "green", icon: IconCheck, label: "status.ready" },
  has_failures: { color: "orange", icon: IconAlertTriangle, label: "status.hasFailures" },
  confirmed: { color: "green", icon: IconCheck, label: "status.confirmed" },
  rejected: { color: "red", icon: IconAlertTriangle, label: "status.rejected" },
};

export const CartGroupSummary: FC<CartGroupSummaryProps> = ({ group }) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });
  const config = statusConfig[group.status];
  const StatusIcon = config.icon;

  return (
    <Stack gap={4}>
      {/* Group Header */}
      <Flex justify="space-between" align="center">
        <Group gap="xs">
          <Badge
            size="xs"
            color={config.color}
            leftSection={
              <StatusIcon
                size={10}
                style={{
                  animation: group.status === "simulating" ? "spin 1s linear infinite" : undefined,
                }}
              />
            }
          >
            {t(config.label)}
          </Badge>
          <Text size="sm" fw={500} lineClamp={1} maw={200}>
            {group.label}
          </Text>
        </Group>
        {group.totalGasEstimate && (
          <GasDisplay estimate={group.totalGasEstimate} compact />
        )}
      </Flex>

      {/* Transactions Summary */}
      <Group gap={4} ml="xs">
        {group.transactions.map((tx, index) => {
          const isSuccess = tx.simulation?.status === "success";
          const isFailed =
            tx.simulation?.status === "will_revert" ||
            tx.simulation?.status === "error";
          const isPending =
            !tx.simulation || tx.simulation.status === "pending";
          const isSimulating = tx.simulation?.status === "simulating";

          return (
            <Group key={tx.id} gap={2}>
              {index > 0 && (
                <Text size="xs" c="dimmed">
                  →
                </Text>
              )}
              <ThemeIcon
                size={14}
                radius="xl"
                color={
                  isSuccess
                    ? "green"
                    : isFailed
                    ? "red"
                    : isSimulating
                    ? "blue"
                    : "gray"
                }
                variant="light"
              >
                {isSuccess && <IconCheck size={10} />}
                {isFailed && <IconAlertTriangle size={10} />}
                {isPending && <IconClock size={10} />}
                {isSimulating && (
                  <IconLoader2
                    size={10}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                )}
              </ThemeIcon>
              <Text size="xs" c="dimmed">
                TX{index + 1}
              </Text>
            </Group>
          );
        })}
      </Group>
    </Stack>
  );
};
