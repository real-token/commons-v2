import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";
import { Card, Flex, Text, Tooltip, Avatar } from "@mantine/core";
import { ExplainTxResponse } from "@rabby-wallet/rabby-api/dist/types";
import { TransactionTypeHeader } from "../../../TransactionDecodeView/TransactionTypeHeader";
import { TransactionChainName } from "../../../TransactionDecodeView/TransactionChainName";
import { InteractionContract } from "../../../TransactionDecodeView/InteractionContract";
import { InteractionProtocol } from "../../../TransactionDecodeView/InteractionProtocol";

export const RevokeTokenActionBody = ({
  data,
  explain,
}: {
  data: ParsedTransactionActionData["revokeToken"];
  explain: ExplainTxResponse;
}) => {
  if (!data) return null;
  return (
    <Card withBorder>
      <TransactionTypeHeader type={"Revoke token approval"} />
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
      </Flex>
      <Flex direction={"column"} gap={"sm"} py={"xs"}>
        <InteractionContract
          interactionName={"Revoke from"}
          contractAddress={data.spender}
        />
        {explain.type_cancel_token_approval && (
          <InteractionProtocol
            protocolLogoURL={
              explain.type_cancel_token_approval.spender_protocol_logo_url
            }
            protocolName={
              explain.type_cancel_token_approval.spender_protocol_name
            }
          />
        )}
      </Flex>
    </Card>
  );
};
