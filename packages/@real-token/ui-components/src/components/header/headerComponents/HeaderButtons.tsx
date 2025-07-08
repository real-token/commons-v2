import { Group } from "@mantine/core";
import { WalletMenu, SettingsMenu } from "../../menus";
import { ConnectButton } from "../../buttons/ConnectButton/ConnectButton";
import { NetworkSelector } from "../../buttons/NetworkSelector/NetworkSelector";
import { useAA } from "@real-token/aa-core";
import { AaWalletConnectButton, useIsAA } from "@real-token/web3";

export function HeaderButtons() {
  const { walletAddress } = useAA();
  const isAA = useIsAA();

  return (
    <Group gap={10}>
      {isAA && walletAddress && <AaWalletConnectButton />}
      <NetworkSelector />
      {walletAddress ? <WalletMenu /> : <ConnectButton />}
      <SettingsMenu />
    </Group>
  );
}
