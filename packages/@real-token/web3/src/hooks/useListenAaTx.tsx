import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { useEffect, useMemo } from "react";
import { useTxBrowserTabNotification } from "./useTxBrowserTabNotification";

type UseListenAaTxProps = (listenNewAaTx?: boolean) => void;

export const useListenAaTx: UseListenAaTxProps = (listenNewAaTx = true) => {
  const { txs } = useAA();

  const wcTxsToValidate = useMemo(() => {
    return txs.wc;
  }, [txs]);

  useEffect(() => {
    if (wcTxsToValidate.length == 0 || !listenNewAaTx) return;
    modals.openContextModal({
      modal: "wcTxManagerModal",
      innerProps: {},
    });
  }, [wcTxsToValidate, listenNewAaTx]);
};
