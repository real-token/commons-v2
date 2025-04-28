import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";
import { Card, Flex, Text, Tooltip, Avatar } from "@mantine/core";
import { ExplainTxResponse } from "@rabby-wallet/rabby-api/dist/types";
import { TransactionTypeHeader } from "@/components/module/transactionDecodeView/common/TransactionTypeHeader";
import { TransactionChainName } from "@/components/module/transactionDecodeView/common/TransactionChainName";
import { InteractionContract } from "@/components/module/transactionDecodeView/common/InteractionContract";
import { InteractionProtocol } from "@/components/module/transactionDecodeView/common/InteractionProtocol";

export const ApproveActionBody = ({
  data,
  explain,
}: {
  data: ParsedTransactionActionData["approveToken"];
  explain: ExplainTxResponse;
}) => {
  if (!data) return null;
  return (
    <Card withBorder>
      <TransactionTypeHeader type={"Token approval"} />
      <Flex direction={"column"} gap={"sm"} py={"xs"} w={"100%"}>
        <TransactionChainName chainName={"Gnosis"} />
        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Text>{"Token"}</Text>
          <Tooltip label={data.token.name}>
            <Flex gap={4} align={"center"}>
              <Avatar
                src={data.token.logo_url}
                alt={data.token.name}
                size={20}
              />
              <Text>{data.token.optimized_symbol}</Text>
            </Flex>
          </Tooltip>
        </Flex>
        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Text>{"Amount"}</Text>
          <Text>{data.token.amount}</Text>
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={"sm"} py={"xs"}>
        <InteractionContract
          interactionName={"Approve to"}
          contractAddress={data.spender}
        />
        {explain.type_token_approval && (
          <InteractionProtocol
            protocolLogoURL={
              explain.type_token_approval.spender_protocol_logo_url
            }
            protocolName={explain.type_token_approval.spender_protocol_name}
          />
        )}
      </Flex>
    </Card>
  );
};
