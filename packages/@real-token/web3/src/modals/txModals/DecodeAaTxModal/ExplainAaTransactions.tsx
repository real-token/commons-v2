import { DecodingError } from "../commons/DecodingError";
import { ExplainTransactionBody } from "../commons/ExplainTransactionBody";
import { TransactionDecodeLoading } from "../commons/TransactionDecodeLoading";
import { Button, Flex, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { AddTransactionParams, useAA } from "@real-token/aa-core";
import { useCallback, useMemo, useState } from "react";
import { useChainId } from "wagmi";
import { useDecodeTransactions } from "../../../hooks/transactions/useDecodeTransactions";

export const ExplainAaTransactions = ({
  txs,
}: {
  txs: AddTransactionParams[];
}) => {
  const { confirmTx, refuseTx, refuseAllTxs, confirmAllTxs } = useAA();

  const [index, setIndex] = useState<number>(0);

  const tx = useMemo(() => {
    return txs[index];
  }, [txs, index]);

  const chainId = useChainId();

  const { decodeData, decodeLoading, isError, refetch } = useDecodeTransactions(
    tx,
    chainId
  );

  const confirm = useCallback(() => {
    confirmTx(index, "wc");
    if (index == 0 && txs.length == 0) modals.closeAll();
  }, [confirmTx, index, txs]);

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
            onClick={() => refuseTx(index, "wc")}
          >
            {"Reject"}
          </Button>
        </Group>
      ) : undefined}
    </Flex>
  );
};
