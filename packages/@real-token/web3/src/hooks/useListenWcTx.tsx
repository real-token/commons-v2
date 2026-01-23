"use client";

import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { useEffect, useMemo, useRef } from "react";
import { useTxManager } from "../context/TxManagerContext";
import { generateId } from "../utils/generateId";

type UseListenNewTxProps = (listenNewTx?: boolean) => void;

export const useListenNewTx: UseListenNewTxProps = (listenNewTx = true) => {
  const { txs } = useAA();
  const txManager = useTxManager();

  // Track registered WC transactions by their event.id
  const registeredTxsRef = useRef<Map<number, string>>(new Map());

  const wcTxsToValidate = useMemo(() => {
    return txs.wc;
  }, [txs]);

  // Register new WC transactions with the TxManager and keep indices in sync
  useEffect(() => {
    const currentEventIds = new Set(wcTxsToValidate.map((tx) => tx.event.id));

    // Unregister removed transactions first
    registeredTxsRef.current.forEach((transactionId, eventId) => {
      if (!currentEventIds.has(eventId)) {
        txManager.unregisterWcTransaction(transactionId);
        registeredTxsRef.current.delete(eventId);
      }
    });

    // Register new transactions and update indices for existing ones
    wcTxsToValidate.forEach((tx, index) => {
      if (!registeredTxsRef.current.has(tx.event.id)) {
        // New transaction - register it
        const transactionId = generateId();
        txManager.registerWcTransaction(transactionId, index, tx.event.id);
        registeredTxsRef.current.set(tx.event.id, transactionId);
      } else {
        // Existing transaction - update its index
        const transactionId = registeredTxsRef.current.get(tx.event.id);
        if (transactionId) {
          txManager.updateWcTransactionIndex(transactionId, index);
        }
      }
    });
  }, [wcTxsToValidate, txManager]);

  // Open modal when there are WC transactions to validate
  useEffect(() => {
    if (wcTxsToValidate.length == 0 || !listenNewTx) return;
    modals.openContextModal({
      modal: "wcTxManagerModal",
      innerProps: {},
    });
  }, [wcTxsToValidate, listenNewTx]);
};
