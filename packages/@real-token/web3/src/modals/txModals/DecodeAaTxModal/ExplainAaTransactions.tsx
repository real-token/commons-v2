import { DecodingError } from "../commons/DecodingError";
import { ExplainTransactionBody } from "../commons/ExplainTransactionBody";
import { TransactionDecodeLoading } from "../commons/TransactionDecodeLoading";
import { Button, Flex, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { AddTransactionParams, TxType, useAA } from "@real-token/aa-core";
import { useCallback, useMemo, useState } from "react";
import { useChainId } from "wagmi";
import { useDecodeTransactions } from "../../../hooks/transactions/decode/useDecodeTransactions";
import { useTxManager } from "../../../context/TxManagerContext";

export const ExplainAaTransactions = ({
  txs,
}: {
  txs: AddTransactionParams[];
}) => {
  const txManager = useTxManager();

  const [index, setIndex] = useState<number>(0);

  // Récupérer les transactions actives du TxManager
  const activeTransactions = txManager.getActiveTransactions();

  const tx = useMemo(() => {
    return txs[index];
  }, [txs, index]);

  // Trouver la transaction correspondante dans le TxManager
  const activeTx = useMemo(() => {
    // Utiliser l'index de position pour faire correspondre les transactions
    return activeTransactions[index];
  }, [activeTransactions, index]);

  const chainId = useChainId();

  const { decodeData, decodeLoading, isError, refetch } = useDecodeTransactions(
    tx,
    chainId
  );

  const confirm = useCallback(() => {
    if (activeTx) {
      // Utiliser le vrai transactionId du TxManager
      txManager.emitTransactionConfirm({
        transactionId: activeTx.transactionId,
      });

      // Fermer la modale si c'est la dernière transaction ou s'il n'y en a qu'une
      if (index === txs.length - 1) {
        modals.closeAll();
      } else {
        setIndex(index + 1);
      }
    }
  }, [txManager, activeTx, index, txs.length]);

  const refuse = useCallback(() => {
    if (activeTx) {
      // Utiliser le vrai transactionId du TxManager
      txManager.emitTransactionRefused({
        transactionId: activeTx.transactionId,
      });

      // Fermer la modale
      modals.closeAll();
    }
  }, [txManager, activeTx]);

  return (
    <Flex direction={"column"} gap={"md"}>
      {isError ? (
        <DecodingError refetch={refetch} />
      ) : decodeLoading ? (
        <TransactionDecodeLoading loading={decodeLoading} />
      ) : decodeData ? (
        <ExplainTransactionBody tx={decodeData} />
      ) : undefined}
      {!decodeLoading || isError ? (
        <Group>
          <Button
            w={{ base: "100%", md: "75%" }}
            color={"green"}
            onClick={() => confirm()}
          >
            {"Sign"}
          </Button>
          <Button
            w={{ base: "100%", md: "auto" }}
            color={"red"}
            onClick={refuse}
          >
            {"Reject"}
          </Button>
        </Group>
      ) : undefined}
    </Flex>
  );
};
