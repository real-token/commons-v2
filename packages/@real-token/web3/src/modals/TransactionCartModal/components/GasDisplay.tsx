import { FC } from "react";
import { Text, Group, Tooltip } from "@mantine/core";
import { IconGasStation } from "@tabler/icons-react";
import type { GasEstimate } from "../../../types/cart";

interface GasDisplayProps {
  estimate: GasEstimate;
  compact?: boolean;
  size?: "xs" | "sm" | "md";
}

export const GasDisplay: FC<GasDisplayProps> = ({
  estimate,
  compact = false,
  size = "sm",
}) => {
  const formattedUsd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(estimate.gasCostUsd);

  // Format native amount (wei to readable)
  const nativeAmount =
    Number(estimate.gasCostWei) / Math.pow(10, estimate.nativeToken.decimals);
  const formattedNative = nativeAmount.toFixed(6);

  if (compact) {
    return (
      <Tooltip
        label={`${formattedNative} ${estimate.nativeToken.symbol}`}
        withArrow
      >
        <Text size="xs" c="dimmed" fw={500}>
          ~{formattedUsd}
        </Text>
      </Tooltip>
    );
  }

  return (
    <Group gap={4}>
      <IconGasStation size={14} color="var(--mantine-color-dimmed)" />
      <Text size={size} fw={500}>
        {formattedUsd}
      </Text>
      <Text size="xs" c="dimmed">
        ({formattedNative} {estimate.nativeToken.symbol})
      </Text>
    </Group>
  );
};
