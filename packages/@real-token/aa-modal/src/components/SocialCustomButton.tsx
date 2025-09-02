import { useAA } from "@real-token/aa-core";
import { ReactNode, useEffect } from "react";
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconBrandTwitch,
  IconBrandDiscord,
  IconBrandTwitter,
  IconBrandApple,
} from "@tabler/icons-react";
import { ModalButton } from "./Buttons/ModalButton/ModalButton";
import { ModalButtonCompact } from "./Buttons/ModalButton/ModalButtonCompact";
import { useAaModalConfig } from "./AaModalProvider";
import { AUTH_CONNECTION_TYPE, WALLET_CONNECTORS } from "@web3auth/modal";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { notifications } from "@mantine/notifications";

const loginProvidersToLogo: Map<AUTH_CONNECTION_TYPE, ReactNode> = new Map([
  ["google", <IconBrandGoogle />],
  ["facebook", <IconBrandFacebook />],
  ["twitch", <IconBrandTwitch />],
  ["discord", <IconBrandDiscord />],
  ["twitter", <IconBrandTwitter />],
  ["apple", <IconBrandApple />],
]);

export const SocialCustomButton = ({
  socialConnectorName,
  children,
  variant = "default",
}: {
  socialConnectorName: AUTH_CONNECTION_TYPE;
  children?: ReactNode;
  variant?: "default" | "compact";
}) => {
  const { login } = useAA();
  const config = useAaModalConfig();

  const { connectTo, loading, isConnected, error } = useWeb3AuthConnect();

  useEffect(() => {
    if (!error) return;
    console.error(error);
    notifications.show({
      title: "Error when connecting",
      message: error.message,
      color: "red",
    });
  }, [error]);

  const onClick = async () => {
    try {
      await login({
        toggleAA: true,
        forceVersion: config.forceVersion,
        walletAddress: config.walletAddress,
      });
      await connectTo(WALLET_CONNECTORS.AUTH, {
        authConnection: socialConnectorName,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const ready = isConnected && !loading;

  if (variant == "compact") {
    return (
      <ModalButtonCompact onClick={onClick} loading={!ready} w={"100%"}>
        {loginProvidersToLogo.get(socialConnectorName)}
      </ModalButtonCompact>
    );
  } else {
    return (
      <ModalButton
        onClick={onClick}
        loading={!ready}
        leftSection={loginProvidersToLogo.get(socialConnectorName)}
        variant={variant}
      >
        {children}
      </ModalButton>
    );
  }
};
