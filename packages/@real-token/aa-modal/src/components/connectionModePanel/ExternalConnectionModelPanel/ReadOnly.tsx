import { Button, Flex, TextInput, Text, Accordion } from "@mantine/core";
import { useField } from "@mantine/form";
import { useAA } from "@real-token/aa-core";
import { isAddress } from "viem";
import classes from "../../AaModal.module.css";
import { useTranslation } from "react-i18next";
import { IconSpy } from "@tabler/icons-react";

export const ReadOnly = () => {
  const { t } = useTranslation("main", { keyPrefix: "readOnly" });

  const { getInputProps, isDirty, error } = useField({
    initialValue: "",
    validate: (value) => {
      if (!value) return t("form.error.required");
      if (value.startsWith("0x") && !isAddress(value))
        return t("form.error.address");
      if (!value.startsWith("0x") && !value.endsWith(".eth"))
        return t("form.error.ens");
      return null;
    },
    validateOnChange: true,
  });

  const { watchAddress } = useAA();

  const onClick = async () => {
    watchAddress(getInputProps().value as `0x${string}`);
  };

  return (
    <Accordion>
      <Accordion.Item value="readOnly">
        <Accordion.Control icon={<IconSpy size={18} />}>
          <Text fz={16} fw={500} className={classes.text}>
            {t("title")}
          </Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Flex direction="column" gap="md">
            <Text fz={14} fw={400} c={"dimmed"}>
              {t("description")}
            </Text>
            <TextInput
              label={t("label")}
              placeholder={t("form.placeholder")}
              {...getInputProps()}
              error={error}
            />
            <Button onClick={() => onClick()} disabled={!isDirty() || !!error}>
              {t("button")}
            </Button>
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
