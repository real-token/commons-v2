import { FC } from "react";
import {
  Flex,
  Group,
  Text,
  ThemeIcon,
  Badge,
  Collapse,
  Stack,
  Card,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCheck,
  IconAlertTriangle,
  IconClock,
  IconLoader2,
  IconChevronRight,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { CartTransaction, SimulationStatus } from "../../../types/cart";
import { GasDisplay } from "./GasDisplay";
import { BalanceChange } from "../../txModals/commons/TransactionDecodeView/BalanceChange";

interface TransactionRowProps {
  transaction: CartTransaction;
  index: number;
  isLast: boolean;
}

const simulationStatusConfig: Record<
  SimulationStatus,
  { color: string; icon: typeof IconCheck }
> = {
  pending: { color: "gray", icon: IconClock },
  simulating: { color: "blue", icon: IconLoader2 },
  success: { color: "green", icon: IconCheck },
  will_revert: { color: "red", icon: IconAlertTriangle },
  error: { color: "red", icon: IconAlertTriangle },
  depends_on_failed: { color: "orange", icon: IconAlertTriangle },
};

export const TransactionRow: FC<TransactionRowProps> = ({
  transaction,
  index,
  isLast,
}) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });
  const [expanded, { toggle }] = useDisclosure(false);

  const status = transaction.simulation?.status || "pending";
  const config = simulationStatusConfig[status];
  const StatusIcon = config.icon;
  const isSimulating = status === "simulating";

  // Build transaction label
  const txLabel = `TX ${index + 1}`;
  const toAddress = transaction.txParams.to
    ? `${transaction.txParams.to.slice(0, 6)}...${transaction.txParams.to.slice(-4)}`
    : "Contract Creation";

  return (
    <Stack gap={4}>
      <Flex
        justify="space-between"
        align="center"
        py={4}
        px="xs"
        style={{
          borderRadius: "var(--mantine-radius-sm)",
          backgroundColor: expanded ? "var(--mantine-color-gray-0)" : undefined,
          cursor: "pointer",
        }}
        onClick={toggle}
      >
        <Group gap="sm">
          <ThemeIcon
            size={20}
            radius="xl"
            color={config.color}
            variant="light"
          >
            <StatusIcon
              size={12}
              style={{
                animation: isSimulating ? "spin 1s linear infinite" : undefined,
              }}
            />
          </ThemeIcon>

          <Text size="sm" fw={500}>
            {txLabel}
          </Text>

          <IconChevronRight
            size={12}
            style={{
              transform: expanded ? "rotate(90deg)" : undefined,
              transition: "transform 0.2s",
            }}
          />

          <Text size="xs" c="dimmed">
            → {toAddress}
          </Text>
        </Group>

        <Group gap="xs">
          {transaction.gasEstimate && (
            <GasDisplay estimate={transaction.gasEstimate} compact />
          )}
        </Group>
      </Flex>

      {/* Expanded Details */}
      <Collapse in={expanded}>
        <Card ml="xl" p="xs" radius="sm" bg="gray.0">
          <Stack gap="xs">
            {/* Error Message */}
            {transaction.simulation?.errorMessage && (
              <Card p="xs" radius="sm" bg="red.0">
                <Group gap="xs">
                  <IconAlertTriangle size={14} color="var(--mantine-color-red-6)" />
                  <Text size="xs" c="red.7">
                    {transaction.simulation.errorMessage}
                  </Text>
                </Group>
              </Card>
            )}

            {/* Dependency Warning */}
            {transaction.simulation?.willFailBecauseOf &&
              transaction.simulation.willFailBecauseOf.length > 0 && (
                <Card p="xs" radius="sm" bg="orange.0">
                  <Group gap="xs">
                    <IconAlertTriangle size={14} color="var(--mantine-color-orange-6)" />
                    <Text size="xs" c="orange.7">
                      {t("simulation.dependsOnFailed")}
                    </Text>
                  </Group>
                </Card>
              )}

            {/* Balance Change Preview */}
            {transaction.simulation?.balanceChange && (
              <BalanceChange balanceChange={transaction.simulation.balanceChange} />
            )}

            {/* Transaction Details */}
            <Stack gap={2}>
              <Text size="xs" c="dimmed">
                To: {transaction.txParams.to}
              </Text>
              {transaction.txParams.value && BigInt(transaction.txParams.value) > 0n && (
                <Text size="xs" c="dimmed">
                  Value: {transaction.txParams.value.toString()}
                </Text>
              )}
            </Stack>
          </Stack>
        </Card>
      </Collapse>

      {/* Connector Line */}
      {!isLast && (
        <Flex ml={22} h={16} align="center">
          <div
            style={{
              width: 2,
              height: "100%",
              backgroundColor: "var(--mantine-color-gray-3)",
            }}
          />
        </Flex>
      )}
    </Stack>
  );
};
