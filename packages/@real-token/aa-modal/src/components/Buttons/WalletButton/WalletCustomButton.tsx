import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Text } from "@mantine/core";
import classes from "./WalletCustomButton.module.css";
import { useEffect } from "react";
import { useAA } from "@real-token/aa-core";
import { useAaModalConfig } from "../../AaModalProvider";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import {
  AUTH_CONNECTION_TYPE,
  AuthConnectionConfig,
  WALLET_CONNECTORS,
  EVM_CONNECTORS,
} from "@web3auth/modal";
import { notifications } from "@mantine/notifications";

export const WalletButtonCustom = ({
  connector,
  isAA = false,
}: {
  connector: AUTH_CONNECTION_TYPE;
  isAA?: boolean;
}) => {
  const { login } = useAA();
  const config = useAaModalConfig();

  const { connectTo, loading, isConnected, error, connectorName } =
    useWeb3AuthConnect();

  useEffect(() => {
    if (!error) return;
    console.error(error);
    notifications.show({
      title: "Error when connecting",
      message: error.message,
      color: "red",
    });
  }, [error]);

  // const { data: iconUrl, isLoading } = useQuery({
  //   queryKey: ["iconUrl", connector.id],
  //   queryFn: async () => {
  //     if (typeof connector.iconUrl === "function") {
  //       return await connector.iconUrl();
  //     }
  //     return connector.iconUrl;
  //   },
  // });

  // const connectorReady = isConnected && !loading && !isLoading;
  const connectorReady = isConnected && !loading;

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      console.log("login with provider", connector);
      await login({
        toggleAA: isAA,
        forceVersion: config.forceVersion,
        walletAddress: config.walletAddress,
      });
      await connectTo(WALLET_CONNECTORS.AUTH, {
        authConnection: connector,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={(e) => handleClick(e)}
        // leftSection={<Avatar src={iconUrl} size={"sm"} />}
        // color={connector.iconBackground}
        loading={!connectorReady}
        // style={{
        //   "--color": connector.iconAccent,
        //   "--background-color": connector.iconBackground,
        // }}
        classNames={{
          root: classes.root,
        }}
        w={"100%"}
      >
        <Text fw={500} className={classes.text}>
          {connectorName}
        </Text>
      </Button>
    </>
  );
};
