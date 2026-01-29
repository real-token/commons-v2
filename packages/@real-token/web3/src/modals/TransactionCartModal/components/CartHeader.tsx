import { FC } from "react";
import { Flex, Group, Text, Badge, Loader } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface CartHeaderProps {
  totalCount: number;
  groupCount: number;
  isSimulating: boolean;
}

export const CartHeader: FC<CartHeaderProps> = ({
  totalCount,
  groupCount,
  isSimulating,
}) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });

  return (
    <Flex justify="space-between" align="center">
      <Group gap="sm">
        <IconShoppingCart size={24} />
        <Text fw={600} size="lg">
          {t("title")}
        </Text>
      </Group>
      <Group gap="xs">
        <Badge color="brand" size="lg">
          {groupCount} {t(groupCount === 1 ? "group" : "groups")}
        </Badge>
        <Badge color="gray" size="lg" variant="light">
          {totalCount} {t(totalCount === 1 ? "transaction" : "transactions")}
        </Badge>
        {isSimulating && <Loader size="xs" />}
      </Group>
    </Flex>
  );
};
