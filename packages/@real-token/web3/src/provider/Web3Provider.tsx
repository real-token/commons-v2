import { useListenNewTx } from "../hooks/useListenWcTx";
import { useListenAaTx } from "../hooks/useListenAaTx";
import { PropsWithChildren } from "react";
import { RealTokenWeb3ProviderProps } from "./RealTokenWeb3Provider";

export const Web3Provider = ({
  children,
  config,
}: PropsWithChildren & {
  config: RealTokenWeb3ProviderProps;
}) => {
  // TODO: add listen to aa sign message
  useListenNewTx(config.listenNewWcTx);
  useListenAaTx(config.listenNewAaTx);
  return children;
};
