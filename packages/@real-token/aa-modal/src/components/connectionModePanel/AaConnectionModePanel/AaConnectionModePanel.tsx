import { AaConnectorModeConfig } from "../../../types";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { WalletButtonCustom } from "../../Buttons/WalletButton/WalletCustomButton";
import { Flex, Divider, Text, Button } from "@mantine/core";
import { EmailPasswordless } from "./EmailPasswordless";
import { useTranslation } from "react-i18next";
import { SocialLogins } from "./SocialLogins";
import { SocialCustomButton } from "../../SocialCustomButton";
import { IconWallet } from "@tabler/icons-react";
import { CustomDrawer } from "../../CustomDrawer/CustomDrawer";
import { useState } from "react";
import classes from "../../AaModal.module.css";
import { AAExternalConnectorDrawer } from "./AAExternalConnectorDrawer";

export const AaConnectionModePanel = ({
  config,
}: {
  config: AaConnectorModeConfig;
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
            <SocialLogins connectors={config.socialConnectorsName || []} />
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
        {config.showExternalWalletConnection ? (
          <>
            <AAExternalConnectorDrawer
              drawerOpened={drawerOpened}
              setDrawerOpened={setDrawerOpened}
              config={config}
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
        <Button size={"xs"} color={"#156CAB"}>
          {t("help")}
        </Button>
      </Flex>
    </Flex>
  );
};
