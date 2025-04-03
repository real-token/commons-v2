import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  CopyToClipboardMenuItem,
  DisconnectMenuItem,
  ViewOnExplorerMenuItem,
} from "./items";
import { UserWalletAddressButton } from "@/components/buttons/UserWalletAddressButton";
import { WalletProviderMenuItem } from "./items/WalletProviderMenuItem";

export function WalletMenu() {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={false}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <UserWalletAddressButton
          rightSection={
            isOpen ? (
              <IconChevronUp size={16} stroke={3} />
            ) : (
              <IconChevronDown size={16} stroke={3} />
            )
          }
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={WalletProviderMenuItem} />
        <CopyToClipboardMenuItem />
        <ViewOnExplorerMenuItem />
        <DisconnectMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
}
