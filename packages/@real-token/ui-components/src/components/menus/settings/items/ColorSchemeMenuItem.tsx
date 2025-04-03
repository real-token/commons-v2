import {
  Box,
  Center,
  SegmentedControl,
  useMantineColorScheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const ColorSchemeMenuItem = () => {
  const { t } = useTranslation("common", { keyPrefix: "settings" });

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box px={5}>
      <SegmentedControl
        color={"brand"}
        fullWidth={true}
        value={colorScheme}
        onChange={() => toggleColorScheme()}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <IconSun size={16} />
                <Box ml={"xs"}>{t("light")}</Box>
              </Center>
            ),
          },
          {
            value: "dark",
            label: (
              <Center>
                <IconMoon size={16} />
                <Box ml={"xs"}>{t("dark")}</Box>
              </Center>
            ),
          },
        ]}
      />
    </Box>
  );
};
