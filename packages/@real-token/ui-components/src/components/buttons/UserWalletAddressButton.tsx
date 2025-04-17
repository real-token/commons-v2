import { Button, ButtonProps } from "@mantine/core";
import { useAA } from "@real-token/aa-core";
import { shortenString } from "@/utils/shortenString";
import { forwardRef } from "react";

export const UserWalletAddressButton = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const { walletAddress } = useAA();
  if (!walletAddress) return <></>;

  return (
    <Button ref={ref} aria-label={shortenString(walletAddress)} {...props}>
      {shortenString(walletAddress)}
    </Button>
  );
});

UserWalletAddressButton.displayName = "UserWalletAddressButton";
