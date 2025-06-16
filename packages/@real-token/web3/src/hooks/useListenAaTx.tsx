import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { useEffect, useMemo } from "react";

type UseListenAaTxProps = (listenNewAaTx?: boolean) => void;

export const useListenAaTx: UseListenAaTxProps = (listenNewAaTx = true) => {
  const { txs } = useAA();

  const aaTxsToValidate = useMemo(() => {
    return txs.aa;
  }, [txs]);

  useEffect(() => {
    if (aaTxsToValidate.length == 0 || !listenNewAaTx) return;
    modals.openContextModal({
      modal: "aaTxManagerModal",
      innerProps: {},
    });
  }, [aaTxsToValidate, listenNewAaTx]);
};
