import React, { createContext, useContext, useEffect, useRef } from "react";
import { useAA } from "@real-token/aa-core";
import { usePublicClient } from "wagmi";
import { useCurrentNetwork } from "@real-token/core";
import { RealtokenWeb3TxManager } from "../class/RealtokenWeb3TxManager";

interface TxManagerContextType {
  txManager: RealtokenWeb3TxManager;
}

const TxManagerContext = createContext<TxManagerContextType | null>(null);

export const useTxManager = (): RealtokenWeb3TxManager => {
  const context = useContext(TxManagerContext);
  if (!context) {
    throw new Error("useTxManager must be used within a TxManagerProvider");
  }
  return context.txManager;
};

interface TxManagerProviderProps {
  children: React.ReactNode;
}

export const TxManagerProvider: React.FC<TxManagerProviderProps> = ({
  children,
}) => {
  const txManagerRef = useRef<RealtokenWeb3TxManager | null>(null);
  const { addTransaction, confirmTx, refuseTx, addSignature } = useAA();
  const publicClient = usePublicClient();
  const networkConfig = useCurrentNetwork();

  if (!txManagerRef.current) {
    txManagerRef.current = new RealtokenWeb3TxManager();
  }

  const txManager = txManagerRef.current;

  useEffect(() => {
    if (confirmTx && refuseTx && addTransaction) {
      txManager.initialize({
        addTransaction: addTransaction,
        addSignature: addSignature,
        confirmTx: confirmTx as any,
        refuseTx: refuseTx as any,
        publicClient: publicClient || undefined,
        blockExplorerUrl: networkConfig?.blockExplorerUrl,
      });
    }
  }, [
    addTransaction,
    addSignature,
    confirmTx,
    refuseTx,
    publicClient,
    networkConfig?.blockExplorerUrl,
    txManager,
  ]);

  return (
    <TxManagerContext.Provider value={{ txManager }}>
      {children}
    </TxManagerContext.Provider>
  );
};
