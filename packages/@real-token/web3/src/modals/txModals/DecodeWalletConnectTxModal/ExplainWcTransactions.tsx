import { acceptedSignMethods } from "@/utils/transactions/transactionTypes";
import { DecodingError } from "../commons/DecodingError";
import { ExplainSignTransaction } from "../commons/Body/ExplainSignTransaction";
import { ExplainTransactionBody } from "../commons/ExplainTransactionBody";
import { ExplainTransactionHeader } from "./ExplainTransactionHeader";
import { TransactionDecodeLoading } from "../commons/TransactionDecodeLoading";
import { Button, Flex, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  EIP155_SIGNING_METHODS,
  useAA,
  WcTransactionType,
} from "@real-token/aa-core";
import { useCallback, useMemo, useState } from "react";
import { useChainId } from "wagmi";
import { ExplainWcSignMessage } from "./ExplainWcSignMessage";
import { useDecodeWalletConnectTransactions } from "@/hooks/transactions/useDecodeWalletConnectTransactions";

export const ExplainWcTransactions = ({
  txs,
}: {
  txs: WcTransactionType[];
}) => {
  const { confirmTx, refuseTx, refuseAllTxs, confirmAllTxs } = useAA();

  const [index, setIndex] = useState<number>(0);

  const tx = useMemo(() => {
    return txs[index];
  }, [txs, index]);

  const chainId = useChainId();

  const isPersonalSign =
    tx.event.params.request.method == EIP155_SIGNING_METHODS.PERSONAL_SIGN;

  const { decodeData, decodeLoading, isError, refetch } =
    useDecodeWalletConnectTransactions(tx, chainId);

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
      ) : isPersonalSign ? (
        <ExplainWcSignMessage tx={tx} index={index} />
      ) : decodeData ? (
        <>
          <ExplainTransactionHeader
            url={tx.event.verifyContext.verified.origin}
          />
          {acceptedSignMethods.includes(tx.event.params.request.method) ? (
            <ExplainSignTransaction
              parsedCommonTx={decodeData.parsedCommonTx}
              contractInfo={decodeData.contractInfo}
              typedData={tx.event.params.request.params[1]}
            />
          ) : (
            <ExplainTransactionBody tx={decodeData} />
          )}
        </>
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
