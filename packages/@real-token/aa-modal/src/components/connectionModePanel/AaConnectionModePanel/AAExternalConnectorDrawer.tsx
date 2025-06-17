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
  connectors,
}: {
  drawerOpened: boolean;
  setDrawerOpened: (value: boolean) => void;
  connectors: string[];
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
          <Button
            onClick={(event) => {
              event.stopPropagation();
              setAdvancedExternalWalletTermsAccepted(true);
            }}
          >
            {t("advancedExternalWallet.acceptButton")}
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" gap="md">
          {connectors.map((connectorName, index) => (
            <WalletButton.Custom
              key={`aa-advanced-${connectorName}`}
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
