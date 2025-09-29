import { Flex, Text, Button } from "@mantine/core";
import { CustomDrawer } from "../CustomDrawer/CustomDrawer";
import { advancedExternalWalletTermsAcceptedAtom } from "../../state";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { ExternalConnectionModelPanel } from "../connectionModePanel/ExternalConnectionModelPanel/ExternalConnectionModelPanel";

export const AAExternalConnectorDrawer = ({
  drawerOpened,
  setDrawerOpened,
}: {
  drawerOpened: boolean;
  setDrawerOpened: (value: boolean) => void;
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
          <ExternalConnectionModelPanel />
        </Flex>
      )}
    </CustomDrawer>
  );
};
