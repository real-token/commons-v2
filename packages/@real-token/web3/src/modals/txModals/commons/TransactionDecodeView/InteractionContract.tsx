import { Flex, Paper, Text } from "@mantine/core";
import { useCurrentNetwork } from "@real-token/core";
import { shortenString } from "@/utils/address";

export const InteractionContract = ({
  interactionName,
  contractAddress,
}: {
  interactionName: string;
  contractAddress: string;
}) => {
  const networkConfig = useCurrentNetwork();
  if (!networkConfig) return null;

  return (
    <Flex justify={"space-between"} align={"center"}>
      <Text fw={600} fz={18}>
        {interactionName}
      </Text>
      <Paper withBorder py={4} px={"xs"} radius={"lg"}>
        <Text
          component={"a"}
          href={`${networkConfig.blockExplorerUrl}address/${contractAddress}`}
          target="_blank"
        >
          {shortenString(contractAddress, [6, 6])}
        </Text>
      </Paper>
    </Flex>
  );
};
