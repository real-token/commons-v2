import { FC, useEffect, useMemo, useState } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { Flex } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ExplainTransactions } from "./ExplainTransactions";

export const TxManagerModal: FC<ContextModalProps> = ({ id }) => {
  // TODO: handle params.request.expiryTimestamp

  const { t } = useTranslation("modals", { keyPrefix: "walletConnect" });

  const [index, setIndex] = useState<number>(0);
  const { wcTxsToValidate, wcClient } = useAA();

  useEffect(() => {
    if (wcTxsToValidate.length == 0) modals.close(id);
  }, [wcTxsToValidate]);

  const currentTx = useMemo(() => {
    if (wcTxsToValidate.length == 0) return undefined;
    return wcTxsToValidate[index];
  }, [index, wcTxsToValidate]);
  console.log(currentTx);

  return (
    <Flex direction={"column"} gap={"md"}>
      <ExplainTransactions tx={currentTx} index={index} />
    </Flex>
  );
};
