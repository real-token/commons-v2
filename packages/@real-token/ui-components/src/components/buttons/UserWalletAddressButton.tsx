import { Button, ButtonProps } from "@mantine/core";
import { useAA } from "@real-token/aa-core";
import { shortenString } from "@/utils/shortenString";

export const UserWalletAddressButton = ({ ...props }: ButtonProps) => {
  const { walletAddress } = useAA();
  if (!walletAddress) return <></>;

  return (
    <Button aria-label={shortenString(walletAddress)}>
      {shortenString(walletAddress)}
    </Button>
  );
};
UserWalletAddressButton.displayName = "UserWalletAddressButton";
