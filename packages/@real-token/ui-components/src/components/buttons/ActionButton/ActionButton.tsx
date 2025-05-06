import { Button, ButtonProps, Popover, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAA } from "@real-token/aa-core";
import { useTranslation } from "react-i18next";

type ActionButtonProps = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ActionButton = ({ ...props }: ActionButtonProps) => {
  const { t } = useTranslation("common", { keyPrefix: "actionButton" });
  const { isWatching } = useAA();

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      width="target"
      position="top"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Button
          {...props}
          disabled={props.disabled || isWatching}
          onMouseEnter={(e) => {
            if (isWatching) open();
            props.onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            if (opened) close();
            props.onMouseLeave?.(e);
          }}
        >
          {props.children}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text>{t("watchOnly")}</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
