import { useConnectors } from "wagmi";
import type { RainbowKitDetails } from "@rainbow-me/rainbowkit/dist/wallets/Wallet";
import { Connector, CreateConnectorFn } from "wagmi";

export type RainbowKitConnectorType = Connector<CreateConnectorFn> & {
  rkDetails?: RainbowKitDetails;
};

export const useGetRkConnectors: () => RainbowKitConnectorType[] = () => {
  const connectors = useConnectors();
  return connectors as unknown as RainbowKitConnectorType[];
};
