import { RealTokenUiNetworkConfig } from "@real-token/core";
import { Menu } from "@mantine/core";
import { useSwitchChain, useChainId } from "wagmi";

export function NetworkMenuItem<
  T extends RealTokenUiNetworkConfig = RealTokenUiNetworkConfig
>({ network }: { network: T }) {
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  return (
    <Menu.Item
      key={network.chainId}
      onClick={() =>
        switchChain({
          chainId: Number(network.chainId),
        })
      }
      leftSection={
        <network.chainLogo
          width={20}
          height={20}
          color="var(--mantine-color-brand)"
        />
      }
      color={chainId === Number(network.chainId) ? "brand" : ""}
    >
      {network.displayName}
    </Menu.Item>
  );
}
