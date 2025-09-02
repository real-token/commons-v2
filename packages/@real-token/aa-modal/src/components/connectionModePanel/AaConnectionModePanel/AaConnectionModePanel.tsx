import { AaConnectorModeConfig } from "../../../types";
import { Flex, Divider, Text, Button } from "@mantine/core";
import { EmailPasswordless } from "./EmailPasswordless";
import { useTranslation } from "react-i18next";
import { SocialLogins } from "./SocialLogins";
import { SocialCustomButton } from "../../SocialCustomButton";
import { IconWallet } from "@tabler/icons-react";
import { useState } from "react";
import classes from "../../AaModal.module.css";
import { AAExternalConnectorDrawer } from "./AAExternalConnectorDrawer";
import { AUTH_CONNECTION_TYPE } from "@web3auth/modal";

export const AaConnectionModePanel = ({
  config,
  socialsConnectors,
  advancedConnectors,
}: {
  config: AaConnectorModeConfig;
  socialsConnectors: AUTH_CONNECTION_TYPE[];
  advancedConnectors: AUTH_CONNECTION_TYPE[];
}) => {
  const { t } = useTranslation("main");
  const [drawerOpened, setDrawerOpened] = useState(false);

  if (!config) return null;
  return (
    <Flex direction="column" gap="xs">
      <Flex direction={"column"} gap={"md"}>
        <Flex direction={"column"}>
          <Text fz={36} fw={600} className={classes.text}>
            {t("signin.title")}
          </Text>
          <Text fz={16} fw={500} className={classes.text}>
            {t("signin.subtitle")}
          </Text>
        </Flex>
      </Flex>
      {config.showSocialLogins && (
        <>
          <Flex direction={"column"} gap={"sm"} w={"100%"}>
            <SocialCustomButton socialConnectorName="google">
              <Text fw={600}>{t("providers.continueWithGoogle")}</Text>
            </SocialCustomButton>
            <SocialLogins connectors={socialsConnectors} />
          </Flex>
          <Divider />
        </>
      )}
      {config.showEmailPasswordless && <EmailPasswordless />}
      <Text fz={12} c={"dimmed"}>
        {t("privacyPolicy")}{" "}
      </Text>
      <Divider label={t("providers.or")} />
      <Flex gap={"sm"} w={"100%"} justify={"center"}>
        {config.showAdvancedWalletConnection ? (
          <>
            <AAExternalConnectorDrawer
              drawerOpened={drawerOpened}
              setDrawerOpened={setDrawerOpened}
              connectors={advancedConnectors}
            />
            <Button
              size={"xs"}
              color={"#FAAE1D"}
              leftSection={<IconWallet size={18} />}
              onClick={() => setDrawerOpened(true)}
            >
              {t("providers.connectExternalWallet")}
            </Button>
          </>
        ) : undefined}
        <Button
          size={"xs"}
          color={"#156CAB"}
          onClick={() => {
            window.open("https://realt.co", "_blank");
          }}
        >
          {t("help")}
        </Button>
      </Flex>
    </Flex>
  );
};
