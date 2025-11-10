import { Button, Flex, Group, Text, Stack, Code, Alert } from "@mantine/core";
import { modals } from "@mantine/modals";
import { TxType, useAA, SignatureType } from "@real-token/aa-core";
import { useCallback, useMemo, useState } from "react";
import { useTxManager } from "../../../context/TxManagerContext";
import { IconInfoCircle } from "@tabler/icons-react";
import { SignatureAddedEvent } from "../../../class/RealtokenWeb3TxManager";

export const ExplainAaSignatures = ({
  signatures,
}: {
  signatures: SignatureAddedEvent[];
}) => {
  const txManager = useTxManager();
  const { confirmTx, refuseTx } = useAA();

  const [index, setIndex] = useState<number>(0);

  const signature = useMemo(() => {
    return signatures[index];
  }, [signatures, index]);

  const confirm = useCallback(() => {
    if (confirmTx && signature) {
      // Pour les signatures AA, utiliser confirmTx avec le type "aa"
      confirmTx(signature.index, "aa");

      // Émettre l'événement de confirmation de signature
      txManager.emitSignatureConfirm({
        transactionId: signature.transactionId,
      });
    }

    // Fermer la modale si c'est la dernière signature ou s'il n'y en a qu'une
    if (index === signatures.length - 1) {
      modals.closeAll();
    } else {
      setIndex(index + 1);
    }
  }, [confirmTx, signature, txManager, index, signatures.length]);

  const refuse = useCallback(() => {
    if (refuseTx && signature) {
      // Pour les signatures AA, utiliser refuseTx avec le type "aa"
      refuseTx(signature.index, "aa");

      // Émettre l'événement d'erreur de signature
      txManager.emitSignatureError({
        transactionId: signature.transactionId,
        error: new Error("Signature refused by user"),
      });
    }

    // Fermer la modale
    modals.closeAll();
  }, [refuseTx, signature, txManager]);

  if (!signature) {
    return (
      <Alert
        icon={<IconInfoCircle size={16} />}
        title="No signatures to validate"
      >
        There are no pending signatures to validate.
      </Alert>
    );
  }

  const renderSignatureData = () => {
    if (signature.signatureType === SignatureType.TYPED_DATA) {
      return (
        <Stack gap="xs">
          <Text size="sm" fw={600}>
            EIP-712 Typed Data:
          </Text>
          <Code block style={{ maxHeight: 200, overflow: "auto" }}>
            {JSON.stringify(signature.data, null, 2)}
          </Code>
        </Stack>
      );
    } else {
      return (
        <Stack gap="xs">
          <Text size="sm" fw={600}>
            Message to sign:
          </Text>
          <Code block>
            {typeof signature.data === "string"
              ? signature.data
              : JSON.stringify(signature.data)}
          </Code>
        </Stack>
      );
    }
  };

  return (
    <Flex direction={"column"} gap={"md"}>
      <Stack gap="md">
        <Text size="lg" fw={700}>
          Signature Request {index + 1} of {signatures.length}
        </Text>

        <Alert icon={<IconInfoCircle size={16} />} color="blue">
          Please review the signature request below and confirm if you want to
          proceed.
        </Alert>

        {renderSignatureData()}

        <Stack gap="xs">
          <Text size="sm" fw={600}>
            Signature Type:
          </Text>
          <Text size="sm" c="dimmed">
            {signature.signatureType}
          </Text>
        </Stack>
      </Stack>

      <Group>
        <Button
          w={{ base: "100%", md: "75%" }}
          color={"green"}
          onClick={confirm}
        >
          Sign Message
        </Button>
        <Button w={{ base: "100%", md: "auto" }} color={"red"} onClick={refuse}>
          Reject
        </Button>
      </Group>
    </Flex>
  );
};
