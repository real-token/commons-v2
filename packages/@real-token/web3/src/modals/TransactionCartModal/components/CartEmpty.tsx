import { FC } from "react";
import { Stack, Text, Button, Center, ThemeIcon } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface CartEmptyProps {
  onClose: () => void;
}

export const CartEmpty: FC<CartEmptyProps> = ({ onClose }) => {
  const { t } = useTranslation("web3", { keyPrefix: "cart" });

  return (
    <Center py="xl">
      <Stack align="center" gap="md">
        <ThemeIcon size={60} radius="xl" color="gray" variant="light">
          <IconShoppingCart size={30} />
        </ThemeIcon>
        <Text fw={500} size="lg">
          {t("empty.title")}
        </Text>
        <Text c="dimmed" size="sm" ta="center" maw={300}>
          {t("empty.description")}
        </Text>
        <Button variant="subtle" onClick={onClose}>
          {t("buttons.close")}
        </Button>
      </Stack>
    </Center>
  );
};
