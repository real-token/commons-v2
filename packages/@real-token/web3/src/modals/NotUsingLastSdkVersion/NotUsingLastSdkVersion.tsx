import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, Flex, Text } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { IconAlertOctagonFilled } from "@tabler/icons-react";

export const NotUsingLastSdkVersion: FC<ContextModalProps> = ({ id }) => {
  const { t } = useTranslation("modals", { keyPrefix: "sdkVersion" });
  const { sdkVersion, latestSdkVersion } = useAA();

  return (
    <Flex direction={"column"} gap={"lg"}>
      <Flex direction={"column"} gap={"md"}>
        <Flex direction={"column"} align={"center"} gap={2}>
          <IconAlertOctagonFilled fill="orange" size={72} />
          <Text fw={600} fz={22} style={{ textAlign: "center" }}>
            {t("title", { version: sdkVersion })}
          </Text>
        </Flex>
        <Text>
          {t("description", {
            version: sdkVersion,
            lastSdkVersion: latestSdkVersion,
          })}
        </Text>
        <Text>{t("features")}</Text>
      </Flex>
      <Flex gap={"md"}>
        <Button color={"green"} onClick={() => modals.close(id)}>
          {t("buttons.understand")}
        </Button>
        <Button
          onClick={() => window.open("https://realt.co/", "_blank")}
          component="a"
        >
          {t("buttons.website")}
        </Button>
      </Flex>
    </Flex>
  );
};
