import { FC } from "react";
import { ContextModalProps } from "@mantine/modals";
import { Stack, ScrollArea, Flex, Text, Divider, Badge, Group } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTransactionCart } from "../../context/TransactionCartContext";
import { CartHeader } from "./components/CartHeader";
import { TransactionGroupCard } from "./components/TransactionGroupCard";
import { CartFooter } from "./components/CartFooter";
import { CartEmpty } from "./components/CartEmpty";

export const TransactionCartModal: FC<ContextModalProps> = ({ context, id }) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });
  const { groups, totalCount, groupCount, isSimulating } = useTransactionCart();

  if (groups.length === 0) {
    return <CartEmpty onClose={() => context.closeModal(id)} />;
  }

  return (
    <Stack gap="md" h="100%" mah={600}>
      <CartHeader
        totalCount={totalCount}
        groupCount={groupCount}
        isSimulating={isSimulating}
      />

      <Divider />

      <ScrollArea.Autosize mah={400} offsetScrollbars flex={1}>
        <Stack gap="md" pr="xs">
          {groups.map((group) => (
            <TransactionGroupCard key={group.id} group={group} />
          ))}
        </Stack>
      </ScrollArea.Autosize>

      <Divider />

      <CartFooter onClose={() => context.closeModal(id)} />
    </Stack>
  );
};
