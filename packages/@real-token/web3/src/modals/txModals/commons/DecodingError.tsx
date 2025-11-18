import { Button, Flex, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const DecodingError = ({ refetch }: { refetch: () => void }) => {
  const { t } = useTranslation("web3", { keyPrefix: "decodingError" });
  return (
    <Flex direction={"column"} gap={"md"} justify={"center"} p="md">
      <Text fw={700} size="lg" c="red">
        {t("title")}
      </Text>
      <Text c="dimmed" fs="italic">
        {t("description")}
      </Text>
      <Text size="xs" c="dimmed" mt={5}>
        {t("alwaysVerify")}
      </Text>
      <Button onClick={() => refetch()}>{t("retry")}</Button>
    </Flex>
  );
};
