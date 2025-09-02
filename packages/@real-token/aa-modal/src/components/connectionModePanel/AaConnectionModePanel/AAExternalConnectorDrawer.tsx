import { Flex, Text, Button } from "@mantine/core";
import { CustomDrawer } from "../../CustomDrawer/CustomDrawer";
import { advancedExternalWalletTermsAcceptedAtom } from "../../../state";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { WalletButtonCustom } from "../../Buttons/WalletButton/WalletCustomButton";
import { AUTH_CONNECTION_TYPE } from "@web3auth/modal";

export const AAExternalConnectorDrawer = ({
  drawerOpened,
  setDrawerOpened,
  connectors,
}: {
  drawerOpened: boolean;
  setDrawerOpened: (value: boolean) => void;
  connectors: AUTH_CONNECTION_TYPE[];
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
            <WalletButtonCustom
              key={`aa-advanced-${connectorName}`}
              connector={connectorName}
              isAA={true}
            />
          ))}
        </Flex>
      )}
    </CustomDrawer>
  );
};
