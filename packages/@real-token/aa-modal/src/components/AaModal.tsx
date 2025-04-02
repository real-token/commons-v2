import { FC, useEffect, useState } from "react";
import { ContextModalProps } from "@mantine/modals";
import {
  Flex,
  Text,
  Button,
  LoadingOverlay,
  TextInput,
  Divider,
} from "@mantine/core";
import { RealtokenLogoLight } from "../assets/RealtokenLogo/RealtokenLogoLight";
import { RealtokenLogoDark } from "../assets/RealtokenLogo/RealtokenLogoDark";
import { ModalButton } from "./Buttons/ModalButton";
import { IconBrandGoogle, IconWallet } from "@tabler/icons-react";
import classes from "./AaModal.module.css";
import { ForceWalletParams, LoginConfig, useAA } from "@real-token/aa-core";
import { Providers } from "./Providers";
import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import { resources } from "../locales";
import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import { LanguageSwitcher } from "./Buttons/LanguageSwitcher";
import { AdvancedView } from "./AdvancedView";
import { RealTokenLogo } from "../assets/RealtokenLogo/RealTokenLogo";

i18next
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "es", "fr"],
    debug: process.env.NODE_ENV === "development",
    detection: {
      order: ["navigator", "cookie", "localStorage"],
    },
    resources,
  });

export type ModalProps = {
  forceWallet?: ForceWalletParams;
};

export const AaModal: FC<ContextModalProps<ModalProps>> = ({
  innerProps,
  context: { closeModal },
  id,
}) => {
  const { t } = useTranslation("main");
  const { forceWallet } = innerProps;

  const { loginReady, login, loginConfig, walletAddress } = useAA();

  useEffect(() => {
    if (walletAddress && walletAddress !== "") closeModal(id);
  }, [walletAddress]);

  const [connectExternalWallet, setConnectExternalWallet] = useState(false);

  const [email, setEmail] = useState("");
  const connectWithEmail = () => {
    login("auth", {
      loginProvider: "email_passwordless",
      login_hint: email,
    });
  };

  if (connectExternalWallet) {
    return <AdvancedView onBack={() => setConnectExternalWallet(false)} />;
  }
  return (
    <Flex direction={"column"} gap={"md"}>
      <LoadingOverlay visible={!loginReady} />
      <Flex justify={"space-between"} align={"center"} px={"xl"}>
        <RealTokenLogo />
        <LanguageSwitcher />
      </Flex>
      <Flex direction={"column"} px={"xl"} gap={"md"}>
        <Flex direction={"column"}>
          <Text fz={36} fw={600} className={classes.text}>
            {t("signin.title")}
          </Text>
          <Text fz={16} fw={500} className={classes.text}>
            {t("signin.subtitle")}
          </Text>
        </Flex>
        <Flex direction={"column"} gap={"lg"}>
          <Flex direction={"column"} gap={"sm"} w={"100%"}>
            <ModalButton
              leftSection={<IconBrandGoogle />}
              onClick={() =>
                login("auth", { loginProvider: "google" }, forceWallet)
              }
              variant={"outline"}
            >
              <Text fw={600}>{t("providers.continueWithGoogle")}</Text>
            </ModalButton>
            <Providers
              loginConfig={loginConfig as LoginConfig}
              forceWallet={forceWallet}
            />
          </Flex>
        </Flex>
        <Divider />
        <Flex direction={"column"} gap={"sm"}>
          <TextInput
            placeholder={t("emailPasswordless.subtitle")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Button onClick={() => connectWithEmail()} disabled={email == ""}>
            {t("emailPasswordless.title")}
          </Button>
        </Flex>
        <Text fz={12} c={"dimmed"}>
          {t("privacyPolicy")}
        </Text>
      </Flex>
      <Flex gap={"xs"} align={"center"} w={"100%"} px={"20%"}>
        <div className={classes.line} />
        <Text fz={16} c={"dimmed"}>
          {t("providers.or")}
        </Text>
        <div className={classes.line} />
      </Flex>
      <Flex gap={"sm"} w={"100%"} px={"10%"} justify={"center"}>
        <Button
          size={"xs"}
          color={"#FAAE1D"}
          leftSection={<IconWallet size={18} />}
          onClick={() => setConnectExternalWallet(true)}
        >
          {t("providers.connectExternalWallet")}
        </Button>
        <Button size={"xs"} color={"#156CAB"}>
          {t("help")}
        </Button>
      </Flex>
    </Flex>
  );
};
