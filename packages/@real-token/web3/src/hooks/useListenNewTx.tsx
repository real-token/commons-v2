import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { useTxBrowserTabNotification } from "./useTxBrowserTabNotification";

type UseListenNewTxProps = (listenNewTx?: boolean) => void;

export const useListenNewTx: UseListenNewTxProps = (listenNewTx = true) => {
  const { wcTxsToValidate } = useAA();

  useEffect(() => {
    if (wcTxsToValidate.length == 0 || !listenNewTx) return;
    modals.openContextModal({
      modal: "wcTxManagerModal",
      innerProps: {},
    });
  }, [wcTxsToValidate, listenNewTx]);

  useTxBrowserTabNotification(wcTxsToValidate.length);
};
