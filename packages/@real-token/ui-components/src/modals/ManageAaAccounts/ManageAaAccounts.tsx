import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "../../styles/Input.module.css";
import { Button, Flex, Loader, Text, TextInput } from "@mantine/core";
import { useAA } from "@real-token/aa-core";

import { AddressPane } from "./AddressPane";
import { useNetworksConfig } from "@real-token/core";
import { NOTIFICATIONS, NotificationsID } from "../../notifications";
import { showNotification } from "@mantine/notifications";
import { DEFAULT_NETWORK_ID } from "@real-token/web3";
import { useReadContract, useChainId, useSwitchChain } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { ContextModalProps } from "@mantine/modals";

export const ManageAaAccountsContent = ({ id }: { id: string }) => {
  const { t } = useTranslation("modals", { keyPrefix: "manageWallet" });

  const networksConfig = useNetworksConfig();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const isOnRightNetwork = useMemo(() => {
    return chainId === Number(DEFAULT_NETWORK_ID);
  }, [networksConfig, chainId]);

  const hasNotDefaultNetworkInConfig = useMemo(() => {
    return networksConfig.some(
      (network) => network.chainId !== DEFAULT_NETWORK_ID
    );
  }, [networksConfig]);

  const [newAddress, setNewAddress] = useState<string>("");

  const { data: isOwner, isLoading: isOwnerLoading } = useReadContract({
    address: "0x0000000000000000000000000000000000000000",
    abi: [
      {
        name: "isOwner",
        type: "function",
        inputs: [{ name: "addr", type: "address" }],
        outputs: [{ name: "", type: "bool" }],
      },
    ],
    functionName: "isOwner",
    args: [newAddress],
    query: {
      enabled: !!newAddress && isOnRightNetwork,
    },
  });

  const { getStoredAccounts, switchAccount, ownerWalletAddress } = useAA();

  const { data: accounts } = useQuery({
    queryKey: ["accounts", ownerWalletAddress],
    queryFn: () => {
      if (!getStoredAccounts) return [];
      const accounts = getStoredAccounts();
      return accounts ? Object.values(accounts)[0] : [];
    },
    enabled: !!ownerWalletAddress,
  });

  const handleSwitchAccount = async (address: string) => {
    if (isOwner) {
      switchAccount(address);
    } else {
      showNotification(NOTIFICATIONS[NotificationsID.notAaOwner]);
    }
  };

  return (
    <Flex direction={"column"} gap={"sm"} px={"md"} pb={"md"}>
      {!accounts ? (
        <Flex gap={"sm"} align={"center"} justify={"center"}>
          <Text>{t("loading")}</Text>
          <Loader size={"sm"} />
        </Flex>
      ) : (
        <Flex direction={"column"} gap={"xl"}>
          <Flex direction={"column"} gap={"sm"}>
            <Text fw={600}>{t("address")}</Text>
            {accounts.map((account) => (
              <AddressPane
                key={account}
                address={account}
                switchAccount={() => handleSwitchAccount(account)}
              />
            ))}
          </Flex>
          {/* <Divider /> */}
          <Flex direction={"column"} gap={"xs"}>
            <Text fw={500} fz={"sm"}>
              {t("manual")}
            </Text>
            <Flex direction={"column"} gap={"sm"}>
              <TextInput
                placeholder="0xfA0e305E0f46AB04f00ae6b5f4560d61a2183E00"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                classNames={{
                  input: classes.input,
                  label: classes.inputLabel,
                }}
              />
              <Button
                onClick={() => {
                  if (isOnRightNetwork) {
                    if (hasNotDefaultNetworkInConfig) {
                      throw new Error(
                        `Default network with id: ${DEFAULT_NETWORK_ID} is not in the config`
                      );
                    }
                    handleSwitchAccount(newAddress);
                  } else {
                    switchChain({ chainId: Number(DEFAULT_NETWORK_ID) });
                  }
                }}
                disabled={!newAddress || isOwnerLoading}
                loading={isOwnerLoading}
              >
                {t("connect")}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export const ManageAaAccountsModal: FC<ContextModalProps> = ({ id }) => {
  return <ManageAaAccountsContent id={id} />;
};
