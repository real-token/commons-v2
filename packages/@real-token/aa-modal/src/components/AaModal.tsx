// import "@mantine/notifications/styles.css";

import { useEffect } from "react";
import { ContextModalProps } from "@mantine/modals";
import { Flex, LoadingOverlay, Text } from "@mantine/core";
import { LanguageSwitcher } from "./Buttons/LanguageSwitcher";
import { RealTokenLogo } from "../assets/RealtokenLogo/RealTokenLogo";
import { merge } from "lodash-es";
import { useMemo } from "react";
import { AaModalConfig, defaultAaModalConfig } from "@real-token/types";
import { ConnectionMode } from "./ConnectionMode";
import { TranslationProvider } from "./TranslationProvider";
import { AaModalProvider } from "./AaModalProvider";
import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { useModalStatus } from "../hooks/useModalStatus";
import { IconCircleCheck } from "@tabler/icons-react";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AaModalProps = DeepPartial<AaModalConfig>;

export const AaModalContent = ({
  config,
  id,
}: {
  config: AaModalConfig;
  id: string;
}) => {
  const { walletAddress } = useAA();
  useEffect(() => {
    if (walletAddress) {
      modals.close(id);
    }
  }, [walletAddress]);

  const { isLoading, isConnected } = useModalStatus();

  return (
    <Flex direction={"column"} gap={"md"} w={"100%"}>
      {isConnected ? (
        <Flex
          direction={"column"}
          align={"center"}
          gap={"md"}
          justify={"center"}
          w={"100%"}
          h={"100%"}
          mih={"70vh"}
        >
          <IconCircleCheck size={46} color="#37b24d" />
          <Text>{"Connected"}</Text>
        </Flex>
      ) : (
        <>
          <LoadingOverlay visible={isLoading} />
          <Flex justify={"space-between"} align={"center"}>
            <RealTokenLogo />
            <LanguageSwitcher />
          </Flex>
          <ConnectionMode config={config} />
        </>
      )}
    </Flex>
  );
};

export const AaModal = (props: ContextModalProps<AaModalProps>) => {
  const config = useMemo(
    () => merge({}, defaultAaModalConfig, props.innerProps),
    [props.innerProps]
  ) as AaModalConfig;

  const { isLoading, uri } = useWalletConnect();

  return (
    <TranslationProvider>
      <AaModalProvider
        config={{
          config,
          isLoading,
          walletConnectUri: uri,
        }}
      >
        <Notifications position="bottom-right" />
        <AaModalContent config={config} id={props.id} />
      </AaModalProvider>
    </TranslationProvider>
  );
};
