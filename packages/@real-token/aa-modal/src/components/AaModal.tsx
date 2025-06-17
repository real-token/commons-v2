import { useEffect } from "react";
import { ContextModalProps } from "@mantine/modals";
import { Flex } from "@mantine/core";
import { LanguageSwitcher } from "./Buttons/LanguageSwitcher";
import { RealTokenLogo } from "../assets/RealtokenLogo/RealTokenLogo";
import { merge } from "lodash";
import { useMemo } from "react";
import { AaModalConfig, defaultAaModalConfig } from "../types/aaModalConfig";
import { ConnectionMode } from "./ConnectionMode";
import { TranslationProvider } from "./TranslationProvider";
import { AaModalProvider } from "./AaModalProvider";
import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { useParsedConnectorsConfig } from "../hooks/useParsedConnectorsConfig";

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

  const parsedConnectorsConfig = useParsedConnectorsConfig(config);

  return (
    <Flex direction={"column"} gap={"md"} w={"100%"}>
      <Flex justify={"space-between"} align={"center"}>
        <RealTokenLogo />
        <LanguageSwitcher />
      </Flex>
      <ConnectionMode
        config={config}
        parsedConnectorsConfig={parsedConnectorsConfig}
      />
    </Flex>
  );
};

export const AaModal = (props: ContextModalProps<AaModalProps>) => {
  const config = useMemo(
    () => merge({}, defaultAaModalConfig, props.innerProps),
    [props.innerProps]
  ) as AaModalConfig;
  return (
    <TranslationProvider>
      <AaModalProvider config={config}>
        <AaModalContent config={config} id={props.id} />
      </AaModalProvider>
    </TranslationProvider>
  );
};
