import { Group } from "@mantine/core";
import { WalletMenu, SettingsMenu } from "../../menus";
import { ConnectButton } from "../ConnectButton/ConnectButton";
import { NetworkSelector } from "../../buttons/NetworkSelector/NetworkSelector";
import { useAA } from "@real-token/aa-core";

export function HeaderButtons() {
  const { walletAddress } = useAA();

  return (
    <Group gap={10}>
      <NetworkSelector />
      {walletAddress ? <WalletMenu /> : <ConnectButton />}
      <SettingsMenu />
    </Group>
  );
}
