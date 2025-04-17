import { Flex, Text, Button } from "@mantine/core";
import { CustomDrawer } from "../../CustomDrawer/CustomDrawer";
import { advancedExternalWalletTermsAcceptedAtom } from "../../../state";
import { useAtom } from "jotai";
import { AaConnectorModeConfig } from "../../../types";
import { useTranslation } from "react-i18next";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { WalletButtonCustom } from "../../Buttons/WalletButton/WalletCustomButton";

export const AAExternalConnectorDrawer = ({
  drawerOpened,
  setDrawerOpened,
  config,
}: {
  drawerOpened: boolean;
  setDrawerOpened: (value: boolean) => void;
  config: AaConnectorModeConfig;
}) => {
  const { t } = useTranslation("main");
  const [
    advancedExternalWalletTermsAccepted,
    setAdvancedExternalWalletTermsAccepted,
  ] = useAtom(advancedExternalWalletTermsAcceptedAtom);

  return (
    <CustomDrawer isOpen={drawerOpened} onClose={() => setDrawerOpened(false)}>
      {!advancedExternalWalletTermsAccepted ? (
        <Flex direction={"column"} gap={"md"} px={"10%"}>
          <Text>{t("advancedExternalWallet.terms")}</Text>
          <Button onClick={() => setAdvancedExternalWalletTermsAccepted(true)}>
            {t("advancedExternalWallet.acceptButton")}
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" gap="md">
          {config.connectorsName.map((connectorName, index) => (
            <WalletButton.Custom
              key={`aa-${index}-${connectorName}`}
              wallet={connectorName}
            >
              {(props) => {
                return <WalletButtonCustom {...props} isAA={true} />;
              }}
            </WalletButton.Custom>
          ))}
        </Flex>
      )}
    </CustomDrawer>
  );
};
