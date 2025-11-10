import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { useEffect, useMemo } from "react";

type UseListenAaSignaturesProps = (listenNewAaSignatures?: boolean) => void;

export const useListenAaSignatures: UseListenAaSignaturesProps = (
  listenNewAaSignatures = true
) => {
  const { txs } = useAA();

  const aaSignaturesToValidate = useMemo(() => {
    // Vérifier s'il y a une propriété signatures dans txs
    return (txs as any)?.signatures || (txs as any)?.sigs || [];
  }, [txs]);

  useEffect(() => {
    if (aaSignaturesToValidate.length === 0 || !listenNewAaSignatures) return;

    modals.openContextModal({
      modal: "aaSignatureManagerModal",
      innerProps: {},
    });
  }, [aaSignaturesToValidate, listenNewAaSignatures]);
};
