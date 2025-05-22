import { useQuery } from "@tanstack/react-query";
import { WalletConnector } from "@rainbow-me/rainbowkit/dist/wallets/useWalletConnectors";
import { Avatar, Button, Text } from "@mantine/core";
import classes from "./WalletCustomButton.module.css";
import { useEffect } from "react";
import { useAA } from "@real-token/aa-core";
import { useAaModalConfig } from "../../AaModalProvider";

export const WalletButtonCustom = ({
  error,
  loading,
  connected,
  ready,
  mounted,
  connector,
  connect,
  isAA = false,
}: {
  error: boolean;
  loading: boolean;
  connected: boolean;
  ready: boolean;
  mounted: boolean;
  connector: WalletConnector;
  connect: () => Promise<void>;
  isAA?: boolean;
}) => {
  const { login } = useAA();
  const config = useAaModalConfig();

  useEffect(() => {
    connector.emitter.on("error", (error: any) => {
      console.error(error);
    });
  }, [connector]);

  const { data: iconUrl, isLoading } = useQuery({
    queryKey: ["iconUrl", connector.id],
    queryFn: async () => {
      if (typeof connector.iconUrl === "function") {
        return await connector.iconUrl();
      }
      return connector.iconUrl;
    },
  });

  const connectorReady = mounted && !loading && !isLoading;
  // console.log(connector.id, ": ", error, loading, connected, ready, mounted);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      console.log("login with provider", connector.id);
      await login({
        toggleAA: isAA,
        forceVersion: config.forceVersion,
        walletAddress: config.walletAddress,
      });
      await connect();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={(e) => handleClick(e)}
        leftSection={<Avatar src={iconUrl} size={"sm"} />}
        color={connector.iconBackground}
        loading={!connectorReady}
        style={{
          "--color": connector.iconAccent,
          "--background-color": connector.iconBackground,
        }}
        classNames={{
          root: classes.root,
        }}
        w={"100%"}
      >
        <Text fw={500} c={connector.iconAccent} className={classes.text}>
          {connector.name}
        </Text>
      </Button>
    </>
  );
};
