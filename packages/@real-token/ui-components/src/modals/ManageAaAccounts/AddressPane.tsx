import { Flex, Text } from "@mantine/core";
import { useAA } from "@real-token/aa-core";
import classes from "./AddressPane.module.css";
import { IconCheck } from "@tabler/icons-react";
import { shortenString } from "../../utils";

interface AddressPaneProps {
  address: string;
  switchAccount: (address: string) => void;
}
export const AddressPane = ({ address, switchAccount }: AddressPaneProps) => {
  const { walletAddress } = useAA();

  const isWallet = address.toLowerCase() === walletAddress?.toLowerCase();

  return (
    <Flex
      className={`${classes.container} ${isWallet ? classes.isWallet : ""}`}
      onClick={() => switchAccount(address)}
    >
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        <Text fz={"sm"} fw={isWallet ? 600 : 400}>
          {shortenString(address, [8, 8])}
        </Text>
        {isWallet ? <IconCheck size={16} /> : null}
      </Flex>
    </Flex>
  );
};
