import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  CopyToClipboardMenuItem,
  DisconnectMenuItem,
  ManageAaAccountsMenuItem,
  ViewOnExplorerMenuItem,
} from "./items";
import { UserWalletAddressButton } from "@/components/buttons/UserWalletAddressButton";
import { CurrentConnectorMenuItem } from "./items/CurrentConnectorMenuItem";
import { useIsAA } from "@real-token/web3";
import { WatchAddressButton } from "./items/WatchAddressMenuItem";

export function WalletMenu() {
  const [isOpen, handlers] = useDisclosure(false);

  const isAA = useIsAA();

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
        <CurrentConnectorMenuItem />
        {isAA && <ManageAaAccountsMenuItem />}
        {/* <WatchAddressButton /> */}
        <CopyToClipboardMenuItem />
        <ViewOnExplorerMenuItem />
        <DisconnectMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
}
