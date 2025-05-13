import { FC, useEffect } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { Flex } from "@mantine/core";
import { ExplainWcTransactions } from "./ExplainWcTransactions";

export const DecodeWalletConnectTxModal: FC<ContextModalProps> = ({ id }) => {
  const { txs } = useAA();

  const txToValidate = txs.wc;
  useEffect(() => {
    if (txToValidate.length == 0) modals.close(id);
  }, [txToValidate]);

  return (
    <Flex direction={"column"} gap={"md"}>
      <ExplainWcTransactions txs={txToValidate} />
    </Flex>
  );
};
