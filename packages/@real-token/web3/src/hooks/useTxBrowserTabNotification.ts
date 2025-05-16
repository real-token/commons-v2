"use client";

import { useState, useEffect } from "react";

type TxBrowserTabNotification = (nbTransactions: number) => void;
export const useTxBrowserTabNotification: TxBrowserTabNotification = (
  nbTransactions
) => {
  const [originalTitle, setOriginalTitle] = useState(document.title);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOriginalTitle(document.title);
  }, []);

  useEffect(() => {
    if (nbTransactions == 0) return;

    const intervalId = setInterval(() => {
      setToggle((prevToggle) => !prevToggle);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [nbTransactions]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (toggle && nbTransactions > 0) {
      document.title = `(${nbTransactions}) Tx`;
    } else {
      document.title = originalTitle;
    }
  }, [toggle, nbTransactions, originalTitle]);
};
