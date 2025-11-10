import { notifications, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX, IconLoader } from "@tabler/icons-react";
import { Stack, Anchor, Text } from "@mantine/core";
import { Translation } from "react-i18next";
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
    transactionNotifications?.onSent?.title || "Transaction Pending";
  const message =
    transactionNotifications?.onSent?.message ||
    "Please confirm the transaction in your wallet";

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
    transactionNotifications?.onComplete?.title || "Transaction Confirmed";

  // Créer le message avec le lien vers le block explorer
  const message =
    blockExplorerUrl && txHash ? (
      <Translation ns={"notifications"}>
        {(t) => (
          <Stack gap={1}>
            {transactionNotifications?.onComplete?.message ||
              t(
                "transactionConfirmed.message",
                "Your transaction has been successfully confirmed"
              )}
            <Anchor
              component={"a"}
              href={`${blockExplorerUrl}tx/${txHash}`}
              target={"_blank"}
            >
              <Text>{`(${shortenString(txHash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ) : (
      transactionNotifications?.onComplete?.message ||
      "Your transaction has been successfully confirmed"
    );

  updateNotification({
    id: notificationId,
    title,
    message,
    loading: false,
    autoClose: false, // Ne pas fermer automatiquement pour laisser le temps de cliquer sur le lien
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
    "Waiting for blockchain validation";

  // Créer le message avec le lien vers le block explorer
  const message =
    blockExplorerUrl && txHash ? (
      <Translation ns={"notifications"}>
        {(t) => (
          <Stack gap={1}>
            {transactionNotifications?.onWaitingBlockchain?.message ||
              t(
                "waitingBlockchain.message",
                "Your transaction is being validated on the blockchain"
              )}
            <Anchor
              component={"a"}
              href={`${blockExplorerUrl}tx/${txHash}`}
              target={"_blank"}
            >
              <Text>{`(${shortenString(txHash)})`}</Text>
            </Anchor>
          </Stack>
        )}
      </Translation>
    ) : (
      transactionNotifications?.onWaitingBlockchain?.message ||
      "Your transaction is being validated on the blockchain"
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
  const title = transactionNotifications?.onFail?.title || "Transaction Failed";
  const message =
    transactionNotifications?.onFail?.message ||
    "An error occurred while processing your transaction";

  updateNotification({
    id: notificationId,
    title,
    message,
    loading: false,
    autoClose: 5000,
    withCloseButton: true,
    color: "red",
    icon: <IconX size={16} />,
  });
}
