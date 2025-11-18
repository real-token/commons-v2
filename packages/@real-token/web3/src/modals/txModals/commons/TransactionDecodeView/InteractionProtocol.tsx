import { Avatar, Flex, Paper, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const InteractionProtocol = ({
  protocolLogoURL,
  protocolName,
}: {
  protocolLogoURL: string;
  protocolName: string;
}) => {
  const { t } = useTranslation("web3", {
    keyPrefix: "explainTransaction",
  });
  return (
    <Paper withBorder p={"sm"}>
      <Flex justify={"space-between"} align={"center"}>
        <Text>{t("common.protocol")}</Text>
        <Flex gap={4} align={"center"}>
          <Avatar src={protocolLogoURL} alt={protocolName} size={20} />
          <Text>{protocolName}</Text>
        </Flex>
      </Flex>
    </Paper>
  );
};
