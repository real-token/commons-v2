import { FC } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { ContextModalProps, modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { isAddress } from "viem";
import { useTranslation } from "react-i18next";

export const WatchWalletModal: FC<ContextModalProps> = ({ id }) => {
  const { t } = useTranslation("modals", { keyPrefix: "watchWallet" });
  const { walletAddress, watchAddress } = useAA();

  const field = useField({
    initialValue: "",
    validateOnBlur: true,
    validate: (value: string) => {
      if (!value) return t("form.errors.required");
      if (!isAddress(value)) return t("form.errors.invalid");
      if (value.toLowerCase() === walletAddress?.toLowerCase())
        return t("form.errors.self");
      return null;
    },
  });

  const onSubmit = () => {
    watchAddress(field.getValue() as `0x${string}`);
    modals.close(id);
  };

  return (
    <Flex direction={"column"} gap={"md"}>
      <TextInput
        placeholder={t("form.addressPlaceholder")}
        label={t("form.address")}
        {...field.getInputProps()}
      />
      <Button onClick={onSubmit} disabled={!!field.error}>
        {t("button")}
      </Button>
    </Flex>
  );
};
