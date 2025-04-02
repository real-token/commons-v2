import { Button, Flex, LoadingOverlay, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { RealtokenLogoDark } from "../assets/RealtokenLogo/RealtokenLogoDark";
import { RealtokenLogoLight } from "../assets/RealtokenLogo/RealtokenLogoLight";
import { useAA } from "@real-token/aa-core";
import { ExternalButton } from "./Buttons/ExternalButton/ExternalButton";
import { MetamaskLogo } from "../assets/Metamask/MetamaskLogo";
import { WalletConnectLogo } from "../assets/WalletConnectLogo/WalletConnect";
import { useAtom } from "jotai";
import { advancedExternalWalletTermsAcceptedAtom } from "../state";
import { useTranslation } from "react-i18next";
import { RealTokenLogo } from "../assets/RealtokenLogo/RealTokenLogo";

interface AdvancedViewProps {
  onBack: () => void;
}
export const AdvancedView = ({ onBack }: AdvancedViewProps) => {
  const { t } = useTranslation("main");

  const { loginReady, login } = useAA();
  const [
    advancedExternalWalletTermsAccepted,
    setAdvancedExternalWalletTermsAccepted,
  ] = useAtom(advancedExternalWalletTermsAcceptedAtom);

  return (
    <Flex direction={"column"} gap={"md"} py={"xl"}>
      <Flex direction={"column"} gap={"xs"}>
        <Flex w={"100%"} justify={"start"}>
          <Button
            onClick={onBack}
            variant={"transparent"}
            leftSection={<IconArrowLeft size={24} />}
          >
            <Text fz={16}>{t("button.back")}</Text>
          </Button>
        </Flex>
        <LoadingOverlay visible={!loginReady} />
        <RealTokenLogo />
      </Flex>
      {!advancedExternalWalletTermsAccepted ? (
        <Flex direction={"column"} gap={"md"} px={"10%"}>
          <Text>{t("advancedExternalWallet.terms")}</Text>
          <Button onClick={() => setAdvancedExternalWalletTermsAccepted(true)}>
            {t("advancedExternalWallet.acceptButton")}
          </Button>
        </Flex>
      ) : (
        <Flex gap={"lg"} justify={"center"}>
          <ExternalButton label="Metamask" onClick={() => login("metamask")}>
            <MetamaskLogo width={56} height={56} />
          </ExternalButton>
          <ExternalButton
            label="WalletConnect (V2)"
            onClick={() => login("wallet-connect-v2")}
          >
            <WalletConnectLogo height={56} />
          </ExternalButton>
        </Flex>
      )}
    </Flex>
  );
};
