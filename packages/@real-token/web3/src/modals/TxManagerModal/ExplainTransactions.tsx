import { useDecodeTransactions } from "../../hooks/interface/transactions/useDecodeTransactions";
import { acceptedSignMethods } from "../../utils/transactions/transactionTypes";
import { ExplainSignTransaction } from "./Body/ExplainSignTransaction";
import { WcSignMessageBody } from "./Body/WcSignMessageBody";
import { ExplainTransactionBody } from "./ExplainTransactionBody";
import { ExplainTransactionHeader } from "./ExplainTransactionHeader";
import { TransactionDecodeLoading } from "./TransactionDecodeLoading";
import { Button, Flex, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { EIP155_SIGNING_METHODS, useAA } from "@real-token/aa-core";
import { WalletKitTypes } from "@reown/walletkit/dist/types";
import { useCallback } from "react";

interface ExplainTransactionsProps {
  tx: WalletKitTypes.SessionRequest;
  index: number;
}
export const ExplainTransactions = ({
  tx,
  index,
}: ExplainTransactionsProps) => {
  const { confirmWcTx, refuseWcTx, wcTxsToValidate } = useAA();

  const isPersonalSign =
    tx.params.request.method == EIP155_SIGNING_METHODS.PERSONAL_SIGN;

  const { decodeData, decodeLoading, isError, refetch } = useDecodeTransactions(
    tx,
    tx.params.chainId
  );

  const confirm = useCallback(() => {
    confirmWcTx(index);
    if (index == 0 && wcTxsToValidate.length == 0) modals.closeAll();
  }, [confirmWcTx, index, wcTxsToValidate]);

  return (
    <Flex direction={"column"} gap={"md"}>
      {isError ? (
        <Flex direction={"column"} gap={"md"} justify={"center"} p="md">
          <Text fw={700} size="lg" c="red">
            Decoding API not available
          </Text>
          <Text c="dimmed" fs="italic">
            {
              "If you trust the origin, you can proceed with blind signing the transaction at your own risk"
            }
          </Text>
          <Text size="xs" c="dimmed" mt={5}>
            {"Always verify the source before signing unknown transactions"}
          </Text>
          <Button onClick={() => refetch()}>{"Retry"}</Button>
        </Flex>
      ) : decodeLoading ? (
        <TransactionDecodeLoading loading={decodeLoading} />
      ) : isPersonalSign ? (
        <WcSignMessageBody currentTx={tx} index={index} />
      ) : decodeData ? (
        <>
          <ExplainTransactionHeader url={tx.verifyContext.verified.origin} />
          {acceptedSignMethods.includes(tx.params.request.method) ? (
            <ExplainSignTransaction
              parsedCommonTx={decodeData.parsedCommonTx}
              contractInfo={decodeData.contractInfo}
              typedData={tx.params.request.params[1]}
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
            onClick={() => refuseWcTx(index)}
          >
            {"Reject"}
          </Button>
        </Group>
      ) : undefined}
    </Flex>
  );
};
