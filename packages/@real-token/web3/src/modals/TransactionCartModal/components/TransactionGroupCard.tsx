import { FC } from "react";
import {
  Card,
  Flex,
  Group,
  Text,
  Badge,
  Stack,
  Collapse,
  ActionIcon,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronUp,
  IconTrash,
  IconRefresh,
  IconCheck,
  IconAlertTriangle,
  IconClock,
  IconLoader2,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTransactionCart } from "../../../context/TransactionCartContext";
import type { TransactionGroup, GroupStatus } from "../../../types/cart";
import { TransactionRow } from "./TransactionRow";
import { GasDisplay } from "./GasDisplay";

interface TransactionGroupCardProps {
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

export const TransactionGroupCard: FC<TransactionGroupCardProps> = ({ group }) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });
  const [expanded, { toggle }] = useDisclosure(true);
  const { removeGroup, retrySimulation } = useTransactionCart();

  const config = statusConfig[group.status];
  const StatusIcon = config.icon;
  const isSimulating = group.status === "simulating";

  const handleRemove = async () => {
    await removeGroup(group.id);
  };

  const handleRetry = async () => {
    await retrySimulation(group.id);
  };

  return (
    <Card withBorder p="sm" radius="md">
      <Stack gap="sm">
        {/* Group Header */}
        <Flex justify="space-between" align="center">
          <Group gap="sm">
            <Badge
              color={config.color}
              leftSection={
                <StatusIcon
                  size={12}
                  style={{
                    animation: isSimulating ? "spin 1s linear infinite" : undefined,
                  }}
                />
              }
            >
              {t(config.label)}
            </Badge>
            <Text fw={600} size="sm">
              {group.label}
            </Text>
          </Group>

          <Group gap="xs">
            {group.totalGasEstimate && (
              <GasDisplay estimate={group.totalGasEstimate} />
            )}

            <ActionIcon variant="subtle" size="sm" onClick={toggle}>
              {expanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </ActionIcon>

            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={handleRemove}
              disabled={isSimulating}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Flex>

        {/* Expanded Content */}
        <Collapse in={expanded}>
          <Stack gap="xs" pt="xs">
            {/* Transactions */}
            {group.transactions.map((tx, index) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                index={index}
                isLast={index === group.transactions.length - 1}
              />
            ))}

            {/* Failure Actions */}
            {group.status === "has_failures" && (
              <Flex
                justify="flex-end"
                gap="xs"
                pt="xs"
                style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
              >
                <Button
                  size="xs"
                  variant="light"
                  color="blue"
                  leftSection={<IconRefresh size={14} />}
                  onClick={handleRetry}
                  loading={isSimulating}
                >
                  {t("simulation.retry")}
                </Button>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  onClick={handleRemove}
                >
                  {t("simulation.remove")}
                </Button>
              </Flex>
            )}
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
};
