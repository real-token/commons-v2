import { ActionIcon, ActionIconProps } from "@mantine/core";
import classes from "./Buttons.module.css";
import { ForceWalletParams, useAA } from "@real-token/aa-core";

export const ProviderButton = ({
  provider,
  forceWallet,
  ...props
}: ActionIconProps & { provider: string; forceWallet?: ForceWalletParams }) => {
  const { login } = useAA();
  return (
    <ActionIcon
      {...props}
      classNames={{
        root: classes.root,
      }}
      style={{
        width: "100%",
      }}
      onClick={() => login("auth", { loginProvider: provider }, forceWallet)}
      variant={"outline"}
    >
      {props.children}
    </ActionIcon>
  );
};
