import { Group } from "@mantine/core";
import { WalletMenu, SettingsMenu } from "../../menus";
import { NetworkSelector } from "../../buttons/NetworkSelector/NetworkSelector";
import { NativeBalanceButton } from "../../buttons/NativeBalanceButton";
import { CartButton } from "../../cart";
import { useAA } from "@real-token/aa-core";
import {
  AaWalletConnectButton,
  AaConnectButton,
  useIsAA,
} from "@real-token/web3";

export interface HeaderButtonsProps {
  disableWalletConnect?: boolean;
}

export function HeaderButtons({
  disableWalletConnect = false,
}: HeaderButtonsProps) {
  const { walletAddress } = useAA();
  const isAA = useIsAA();

  return (
    <Group gap={10}>
      {!disableWalletConnect && isAA && walletAddress && (
        <AaWalletConnectButton />
      )}
      <NetworkSelector />
      {walletAddress && <NativeBalanceButton />}
      {walletAddress ? <WalletMenu /> : <AaConnectButton />}
      {walletAddress && <CartButton />}
      <SettingsMenu />
    </Group>
  );
}
