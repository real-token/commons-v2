import { useListenNewTx } from "../hooks/useListenWcTx";
import { useListenAaTx } from "../hooks/useListenAaTx";
import { PropsWithChildren } from "react";
import { RealTokenWeb3ProviderProps } from "./RealTokenWeb3Provider";
import { useCheckSdkIsLastVersion } from "../hooks/useCheckSdkIsLastVersion";
import { TxManagerProvider } from "../context/TxManagerContext";

export const Web3Provider = ({
  children,
  config,
}: PropsWithChildren & {
  config: RealTokenWeb3ProviderProps;
}) => {
  return (
    <TxManagerProvider>
      <Web3ProviderInner config={config}>{children}</Web3ProviderInner>
    </TxManagerProvider>
  );
};

const Web3ProviderInner = ({
  children,
  config,
}: PropsWithChildren & {
  config: RealTokenWeb3ProviderProps;
}) => {
  useListenNewTx(config.listenNewWcTx);
  useListenAaTx(config.listenNewAaTx);
  useCheckSdkIsLastVersion();
  return <>{children}</>;
};
