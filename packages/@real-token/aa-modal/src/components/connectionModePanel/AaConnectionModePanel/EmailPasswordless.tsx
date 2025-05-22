import { Button, Flex, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useAA } from "@real-token/aa-core";
import { useAaModalConfig } from "../../AaModalProvider";

export const EmailPasswordless = () => {
  const { t } = useTranslation("main");
  const { login } = useAA();
  const config = useAaModalConfig();

  const { getInputProps, error } = useField({
    initialValue: "",
    validate: (value) => (value.length > 0 ? null : "Email is required"),
  });

  return (
    <WalletButton.Custom wallet={"email_passwordless"}>
      {({ connect, ready }) => {
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
              email: getInputProps().value,
            });
            await connect();
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
            <Button onClick={() => onClick()} loading={!ready}>
              {t("emailPasswordless.title")}
            </Button>
          </Flex>
        );
      }}
    </WalletButton.Custom>
  );
};
