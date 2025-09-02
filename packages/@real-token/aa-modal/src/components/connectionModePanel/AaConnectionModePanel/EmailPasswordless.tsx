import { Button, Flex, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useAA } from "@real-token/aa-core";
import { useAaModalConfig } from "../../AaModalProvider";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { WALLET_CONNECTORS } from "@web3auth/modal";

export const EmailPasswordless = () => {
  const { t } = useTranslation("main");
  const { login } = useAA();
  const config = useAaModalConfig();

  const { getInputProps, error, isDirty } = useField({
    initialValue: "",
    validate: (value) => (value.length > 0 ? null : "Email is required"),
    validateOnChange: true,
  });

  const {
    connectTo,
    loading,
    isConnected,
    error: web3authError,
  } = useWeb3AuthConnect();

  const ready = isConnected && !loading;

  const onClick = async () => {
    if (!ready) {
      console.warn("Connector not ready. Cannot connect...");
      return;
    }
    try {
      await login({
        toggleAA: true,
        forceVersion: config.forceVersion,
        walletAddress: config.walletAddress,
      });
      await connectTo(WALLET_CONNECTORS.AUTH, {
        authConnection: "email_passwordless",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex direction={"column"} gap={"sm"}>
      <TextInput
        placeholder={t("emailPasswordless.subtitle")}
        {...getInputProps()}
        type="email"
        error={error}
      />
      <Button
        onClick={() => onClick()}
        loading={!ready}
        disabled={!isDirty() || !!error}
      >
        {t("emailPasswordless.title")}
      </Button>
    </Flex>
  );
};
