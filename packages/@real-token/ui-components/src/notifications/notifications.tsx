import { Translation } from "react-i18next";
import { NotificationData } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { asConst } from "@/utils/asConst";
import {
  getNotificationErrorMessage,
  getNotificationErrorParams,
  getNotificationTitle,
} from "./utils";

export enum NotificationsID {
  copyAddress = "copyAddress",
  notAaOwner = "notAaOwner",
}

export const NOTIFICATIONS = asConst<
  Record<
    NotificationsID,
    NotificationData | ((payload: any) => NotificationData)
  >
>()({
  [NotificationsID.copyAddress]: {
    id: "copyAddress",
    color: "teal",
    icon: <IconCheck size={14} />,
    title: (
      <Translation ns={"notifications"}>
        {(t) => t("copyAddress.title")}
      </Translation>
    ),
    message: (
      <Translation ns={"notifications"}>
        {(t) => t("copyAddress.message")}
      </Translation>
    ),
  },
  [NotificationsID.notAaOwner]: {
    ...getNotificationErrorParams("notAaOwner"),
    title: getNotificationTitle("notAaOwner.title"),
    message: getNotificationErrorMessage("notAaOwner.message"),
  },
});
