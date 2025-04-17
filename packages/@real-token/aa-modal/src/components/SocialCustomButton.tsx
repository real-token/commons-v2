import { LoginConfig, useAA } from "@real-token/aa-core";
import { ReactNode } from "react";
import {
  IconBrandGoogle,
  IconBrandFacebook,
  IconBrandTwitch,
  IconBrandDiscord,
  IconBrandTwitter,
  IconBrandApple,
} from "@tabler/icons-react";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { ModalButton } from "./Buttons/ModalButton/ModalButton";
import { ModalButtonCompact } from "./Buttons/ModalButton/ModalButtonCompact";
import { useAaModalConfig } from "./AaModalProvider";

type LoginProvider = keyof LoginConfig;

const loginProvidersToLogo: Map<LoginProvider, ReactNode> = new Map([
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
  socialConnectorName: LoginProvider;
  children?: ReactNode;
  variant?: "default" | "compact";
}) => {
  const { login } = useAA();
  const config = useAaModalConfig();

  return (
    <WalletButton.Custom wallet={socialConnectorName}>
      {({ connect, ready }) => {
        const onClick = async () => {
          try {
            await login({
              toggleAA: true,
              forceVersion: config.forceVersion,
              walletAddress: config.walletAddress,
            });
            await connect();
          } catch (err) {
            console.error(err);
          }
        };

        if (variant == "compact") {
          return (
            <ModalButtonCompact onClick={onClick} loading={!ready} w={"100%"}>
              {loginProvidersToLogo.get(socialConnectorName as LoginProvider)}
            </ModalButtonCompact>
          );
        } else {
          return (
            <ModalButton
              onClick={onClick}
              loading={!ready}
              leftSection={loginProvidersToLogo.get(
                socialConnectorName as LoginProvider
              )}
              variant={variant}
            >
              {children}
            </ModalButton>
          );
        }
      }}
    </WalletButton.Custom>
  );
};
