import { FC, useEffect } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { Flex } from "@mantine/core";
import { ExplainAaTransactions } from "./ExplainAaTransactions";

export const DecodeAaTxModal: FC<ContextModalProps> = ({ id }) => {
  const { txs } = useAA();

  const txToValidate = txs.aa;
  useEffect(() => {
    if (txToValidate.length == 0) modals.close(id);
  }, [txToValidate]);

  return (
    <Flex direction={"column"} gap={"md"}>
      <ExplainAaTransactions txs={txToValidate} />
    </Flex>
  );
};
