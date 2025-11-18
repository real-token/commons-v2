import { Flex, Text } from "@mantine/core";
import { useCurrentNetwork } from "@real-token/core";

export const TransactionChainName = () => {
  const networkConfig = useCurrentNetwork();
  if (!networkConfig) return null;

  return (
    <Flex justify={"space-between"} align={"center"} w={"100%"}>
      <Text>{"Chain"}</Text>
      <Flex align={"center"} gap={"xs"}>
        {networkConfig.chainLogo ? (
          <networkConfig.chainLogo
            width={18}
            height={18}
            color={networkConfig.color}
          />
        ) : null}
        <Text>{networkConfig.displayName}</Text>
      </Flex>
    </Flex>
  );
};
