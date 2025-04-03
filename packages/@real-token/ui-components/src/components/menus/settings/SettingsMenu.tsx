import { FC } from "react";
import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import { ColorSchemeMenuItem, LanguageSelect } from "./items";

export const SettingsMenu: FC = () => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={false}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <ActionIcon size={36} color={"brand"}>
          <IconSettings size={20} aria-label={"Setting"} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <LanguageSelect />
        <Menu.Divider />
        <ColorSchemeMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};
