import { notifications, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX, IconLoader } from "@tabler/icons-react";
import { Stack, Anchor, Text } from "@mantine/core";
import { i18next } from "@real-token/i18n-locales";
import { shortenString } from "@/utils/address";
import { generateId } from "../generateId";
import { TransactionNotifications } from "./types";

/**
 * Affiche une notification de transaction en cours
 * Always shows a notification - uses provided config or defaults
 */
export function showTransactionPendingNotification(
  transactionNotifications?: TransactionNotifications
): string {
  const notificationId = transactionNotifications?.id || `tx-${generateId()}`;

  // Always show a notification - use provided config or defaults
  const title =
    transactionNotifications?.onSent?.title ||
    i18next.t("transactions.onchain.onSent.title", { ns: "notifications" });

  const message =
    transactionNotifications?.onSent?.message ||
    i18next.t("transactions.onchain.onSent.message", { ns: "notifications" });

  notifications.show({
    id: notificationId,
    title,
    message,
    loading: true,
    autoClose: false,
    withCloseButton: false,
    icon: <IconLoader size={16} />,
  });

  return notificationId;
}

/**
 * Met à jour la notification avec un succès
 * Always updates the notification - uses provided config or defaults
 */
export function updateTransactionSuccessNotification(
  notificationId: string,
  txHash?: string,
  blockExplorerUrl?: string,
  transactionNotifications?: TransactionNotifications
): void {
  // Always update the notification - use provided config or defaults
  const title =
    transactionNotifications?.onComplete?.title ||
    i18next.t("transactions.onchain.onComplete.title", { ns: "notifications" });

  // Créer le message avec le lien vers le block explorer
  const defaultMessage = i18next.t("transactions.onchain.onComplete.message", {
    ns: "notifications",
  });

  const message =
    blockExplorerUrl && txHash ? (
      <Stack gap={1}>
        {transactionNotifications?.onComplete?.message || defaultMessage}
        <Anchor
          component={"a"}
          href={`${blockExplorerUrl}tx/${txHash}`}
          target={"_blank"}
        >
          <Text>{`(${shortenString(txHash)})`}</Text>
        </Anchor>
      </Stack>
    ) : (
      transactionNotifications?.onComplete?.message || defaultMessage
    );

  updateNotification({
    id: notificationId,
    title,
    message,
    loading: false,
    autoClose: false,
    withCloseButton: true,
    color: "green",
    icon: <IconCheck size={16} />,
  });
}

/**
 * Met à jour la notification pour indiquer l'attente de validation blockchain
 * Spécifique aux transactions EOA
 */
export function updateTransactionWaitingBlockchainNotification(
  notificationId: string,
  txHash: string,
  blockExplorerUrl?: string,
  transactionNotifications?: TransactionNotifications
): void {
  const title =
    transactionNotifications?.onWaitingBlockchain?.title ||
    i18next.t("transactions.onchain.onWaitingBlockchain.title", {
      ns: "notifications",
    });

  // Créer le message avec le lien vers le block explorer
  const defaultMessage = i18next.t(
    "transactions.onchain.onWaitingBlockchain.message",
    {
      ns: "notifications",
    }
  );

  const message =
    blockExplorerUrl && txHash ? (
      <Stack gap={1}>
        {transactionNotifications?.onWaitingBlockchain?.message ||
          defaultMessage}
        <Anchor
          component={"a"}
          href={`${blockExplorerUrl}tx/${txHash}`}
          target={"_blank"}
        >
          <Text>{`(${shortenString(txHash)})`}</Text>
        </Anchor>
      </Stack>
    ) : (
      transactionNotifications?.onWaitingBlockchain?.message || defaultMessage
    );

  updateNotification({
    id: notificationId,
    title,
    message,
    loading: true,
    autoClose: false,
    withCloseButton: false,
    color: "blue",
    icon: <IconLoader size={16} />,
  });
}

/**
 * Met à jour la notification avec une erreur
 * Always updates the notification - uses provided config or defaults
 */
export function updateTransactionErrorNotification(
  notificationId: string,
  transactionNotifications?: TransactionNotifications
): void {
  // Always update the notification - use provided config or defaults
  const title =
    transactionNotifications?.onFail?.title ||
    i18next.t("transactions.onchain.onFail.title", { ns: "notifications" });

  const message =
    transactionNotifications?.onFail?.message ||
    i18next.t("transactions.onchain.onFail.message", { ns: "notifications" });

  updateNotification({
    id: notificationId,
    title,
    message,
    loading: false,
    autoClose: false,
    withCloseButton: true,
    color: "red",
    icon: <IconX size={16} />,
  });
}
