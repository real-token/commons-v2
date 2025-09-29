import { useWeb3Auth } from "@web3auth/modal/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { CONNECTOR_EVENTS } from "@web3auth/modal";

export interface WalletConnect {
  uri: string | undefined;
  isLoading: boolean;
}

export const useWalletConnect = (): WalletConnect => {
  const { web3Auth } = useWeb3Auth();

  const web3authStatus = web3Auth?.status;
  // console.log("web3authStatus", web3authStatus);

  const walletConnectConnector = useMemo(() => {
    return web3Auth?.getConnector("wallet-connect-v2");
  }, [web3Auth]);
  // console.log("walletConnectConnector", walletConnectConnector);

  const { isLoading } = useQuery({
    enabled: web3Auth !== null && web3authStatus === "ready",
    queryKey: ["init-wallet-connect-external", web3authStatus],
    queryFn: async () => {
      if (web3authStatus == "ready") {
        // @ts-expect-error ix this
        await web3Auth.onInitExternalWallets({
          externalWalletsInitialized: false,
        });
        return true;
      }
    },
  });

  const [uri, setUri] = useState<string | undefined>(undefined);
  useEffect(() => {
    const dataUpdated = (data: {
      connectorName: string;
      data: { uri: string };
    }) => {
      console.log("[WC] EVENT CONNECTOR_DATA_UPDATED: ", data);
      setUri(data.data.uri);
    };

    if (walletConnectConnector) {
      walletConnectConnector.on(
        CONNECTOR_EVENTS.CONNECTOR_DATA_UPDATED,
        dataUpdated
      );
    }

    () => {
      if (walletConnectConnector) {
        walletConnectConnector.removeListener(
          CONNECTOR_EVENTS.CONNECTOR_DATA_UPDATED,
          dataUpdated
        );
      }
    };
  }, [walletConnectConnector]);

  return {
    uri: uri,
    isLoading: isLoading || !uri,
  };
};
