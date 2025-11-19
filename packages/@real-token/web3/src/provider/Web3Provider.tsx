import { useListenNewTx } from "../hooks/useListenWcTx";
import { useListenAaTx } from "../hooks/useListenAaTx";
import { PropsWithChildren } from "react";
import { useCheckSdkIsLastVersion } from "../hooks/useCheckSdkIsLastVersion";
import { TxManagerProvider } from "../context/TxManagerContext";
import { RealTokenWeb3Config } from "../context/RealTokenWeb3ConfigContext";

export const Web3Provider = ({
  children,
  config,
}: PropsWithChildren & {
  config: RealTokenWeb3Config;
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
  config: RealTokenWeb3Config;
}) => {
  useListenNewTx(config.listenNewWcTx);
  useListenAaTx(config.listenNewAaTx);
  useCheckSdkIsLastVersion();
  return <>{children}</>;
};
