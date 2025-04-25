import { Anchor, Stack, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Translation } from "react-i18next";
import { shortenString } from "../utils";
import { Link } from "../components";

export const getNotificationTitle = (translationKey: string, params?: any) => {
  return (
    <Translation ns={"notifications"}>
      {(t) => t(translationKey as any, { ...params }).toString()}
    </Translation>
  );
};

export const getNotificationErrorMessage = (translationKey: string) => {
  return (
    <Translation ns={"notifications"}>
      {(t) => <Stack gap={1}>{`${t(translationKey as any)}`}</Stack>}
    </Translation>
  );
};

export const getValidation = (
  translationKey: string,
  payload: { href: string; hash: string }
) => (
  <Translation ns={"notifications"}>
    {(t) => (
      <Stack gap={1}>
        {t(translationKey as any)}
        {payload.hash ? (
          <Anchor component={Link} href={payload.href} target={"_blank"}>
            <Text>{`(${shortenString(payload.hash)})`}</Text>
          </Anchor>
        ) : null}
      </Stack>
    )}
  </Translation>
);

export const getNotificationLoadingParams = (id: string) => ({
  id: id,
  loading: true,
  autoClose: false,
  withCloseButton: false,
});

export const getNotificationSuccessParams = (id: string) => ({
  id: id,
  color: "teal",
  loading: false,
  withCloseButton: true,
  icon: <IconCheck size={14} />,
});

export const getNotificationErrorParams = (id: string) => ({
  id: id,
  color: "red",
  icon: <IconX size={14} />,
  loading: false,
  autoClose: false,
  withCloseButton: true,
});
