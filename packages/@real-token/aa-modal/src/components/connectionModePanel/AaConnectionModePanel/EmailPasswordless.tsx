import { Button, Flex, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { SocialCustomButton } from "../../SocialCustomButton";

export const EmailPasswordless = () => {
  const { t } = useTranslation("main");

  const { getInputProps, error } = useField({
    initialValue: "",
    validate: (value) => (value.length > 0 ? null : "Email is required"),
  });

  // const connectWithEmail = () => {
  //   login("auth", {
  //     loginProvider: "email_passwordless",
  //     login_hint: email,
  //   });
  // };

  return <SocialCustomButton socialConnectorName="email_passwordless" />;

  // return (
  //   <Flex direction={"column"} gap={"sm"}>
  //     <TextInput
  //       placeholder={t("emailPasswordless.subtitle")}
  //       {...getInputProps()}
  //       type="email"
  //       error={error}
  //     />
  //     <Button>{t("emailPasswordless.title")}</Button>
  //   </Flex>
  // );
};
