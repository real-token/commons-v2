import { Button, Flex, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useAA } from "@real-token/aa-core";
import { useAaModalConfig } from "../../AaModalProvider";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { WALLET_CONNECTORS } from "@web3auth/modal";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useRealTokenWeb3Config } from "@real-token/web3";
import { useMemo } from "react";

export const EmailPasswordless = () => {
  const { t } = useTranslation("main");
  const { login } = useAA();
  const { config } = useAaModalConfig();

  const { getInputProps, error, isDirty } = useField({
    initialValue: "",
    validate: (value) => (value.length > 0 ? null : "Email is required"),
    validateOnChange: true,
  });

  const { connectTo, loading } = useWeb3AuthConnect();

  const { authProviderConfig } = useRealTokenWeb3Config();
  
  const authConnectionId = useMemo(() => {
    if (!authProviderConfig || !authProviderConfig["email_passwordless"]) {
      return null;
    }
    return authProviderConfig["email_passwordless"].authConnectionId;
  }, [authProviderConfig]);

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      try {
        if(!authConnectionId){
          throw new Error("email_passwordless authConnectionId not found")
        }
        console.log("email_passwordless authConnectionId: ", authConnectionId)
        await login({
          toggleAA: true,
          forceVersion: config.forceVersion,
          walletAddress: config.walletAddress,
        });
        await connectTo(WALLET_CONNECTORS.AUTH, {
          authConnectionId,
          authConnection: "email_passwordless",
          loginHint: getInputProps().value,
        });
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      console.error(error);
      notifications.show({
        title: "Error when connecting",
        message: (error as Error).message,
        color: "red",
      });
    },
  });

  return (
    <Flex direction={"column"} gap={"sm"}>
      <TextInput
        placeholder={t("emailPasswordless.subtitle")}
        {...getInputProps()}
        type="email"
        error={error}
      />
      <Button
        onClick={() => mutateAsync()}
        loading={loading}
        disabled={!isDirty() || !!error}
      >
        {t("emailPasswordless.title")}
      </Button>
    </Flex>
  );
};
