import { FC, useEffect } from "react";
import { ContextModalProps, modals } from "@mantine/modals";
import { Flex } from "@mantine/core";
import { ExplainAaSignatures } from "./ExplainAaSignatures";
import { useTxManager } from "../../../context/TxManagerContext";

export const DecodeAaSignatureModal: FC<ContextModalProps> = ({ id }) => {
  const txManager = useTxManager();

  // Récupérer les signatures actives depuis le TxManager
  const signaturesToValidate = txManager.getActiveSignatures();

  useEffect(() => {
    if (signaturesToValidate.length === 0) {
      console.log("No signatures to validate, closing modal");
      modals.close(id);
    }
  }, [signaturesToValidate, id]);

  return (
    <Flex direction={"column"} gap={"md"}>
      <ExplainAaSignatures signatures={signaturesToValidate} />
    </Flex>
  );
};
