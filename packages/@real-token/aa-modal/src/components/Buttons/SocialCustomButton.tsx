import { useAA } from "@real-token/aa-core";
import { ReactNode, useEffect, useMemo } from "react";
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconBrandTwitch,
  IconBrandDiscord,
  IconBrandTwitter,
  IconBrandApple,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandWechat,
  IconBrandLine,
  IconDeviceMobile,
} from "@tabler/icons-react";
import { ModalButton } from "./ModalButton/ModalButton";
import { ModalButtonCompact } from "./ModalButton/ModalButtonCompact";
import { useAaModalConfig } from "../AaModalProvider";
import { AUTH_CONNECTION_TYPE, WALLET_CONNECTORS } from "@web3auth/modal";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRealTokenWeb3Config } from "@real-token/web3";

const loginProvidersToLogo: Map<AUTH_CONNECTION_TYPE, ReactNode> = new Map([
  ["google", <IconBrandGoogle />],
  ["facebook", <IconBrandFacebook />],
  ["twitch", <IconBrandTwitch />],
  ["discord", <IconBrandDiscord />],
  ["twitter", <IconBrandTwitter />],
  ["apple", <IconBrandApple />],
  ["github", <IconBrandGithub />],
  ["linkedin", <IconBrandLinkedin />],
  ["reddit", <IconBrandReddit />],
  ["wechat", <IconBrandWechat />],
  ["line", <IconBrandLine />],
  ["sms_passwordless", <IconDeviceMobile />],
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
  const { config } = useAaModalConfig();

  const { connectTo, error, loading: isConnecting } = useWeb3AuthConnect();

  const { authProviderConfig } = useRealTokenWeb3Config();

  const authConnectionId = useMemo(() => {
    if (!authProviderConfig || !authProviderConfig[socialConnectorName]) {
      return null;
    }
    return authProviderConfig[socialConnectorName].authConnectionId;
  }, [authProviderConfig, socialConnectorName]);

  useEffect(() => {
    if (!error) return;
    console.error(error);
    notifications.show({
      title: "Error when connecting",
      message: error.message,
      color: "red",
    });
  }, [error]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      try {
        if (!authConnectionId) {
          console.warn("Auth connection ID not found");
        }
        await login({
          toggleAA: true,
          forceVersion: config.forceVersion,
          walletAddress: config.walletAddress,
        });
        await connectTo(WALLET_CONNECTORS.AUTH, {
          authConnection: socialConnectorName,
          authConnectionId: authConnectionId || undefined,
        });
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      console.error(error);
      notifications.show({
        title: "Error when connecting",
        message: (error as Error).message,
        color: "red",
      });
    },
  });

  const isLoading = isPending || isConnecting;

  if (variant == "compact") {
    return (
      <ModalButtonCompact
        onClick={() => mutateAsync()}
        w={"100%"}
        loading={isLoading}
      >
        {loginProvidersToLogo.get(socialConnectorName)}
      </ModalButtonCompact>
    );
  } else {
    return (
      <ModalButton
        onClick={() => mutateAsync()}
        leftSection={loginProvidersToLogo.get(socialConnectorName)}
        variant={variant}
        loading={isLoading}
      >
        {children}
      </ModalButton>
    );
  }
};
