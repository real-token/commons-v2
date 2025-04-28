import { Card, Flex, Text } from "@mantine/core";
import { TransactionTypeHeader } from "@/components/module/transactionDecodeView/common/TransactionTypeHeader";
import { TransactionChainName } from "@/components/module/transactionDecodeView/common/TransactionChainName";
import { InteractionContract } from "@/components/module/transactionDecodeView/common/InteractionContract";
import { InteractionProtocol } from "@/components/module/transactionDecodeView/common/InteractionProtocol";
import { ExplainTxResponse } from "@rabby-wallet/rabby-api/dist/types";

export interface UnknowActionBodyProps {
  data: {
    action: null;
    contract_call: {
      contract: {
        id: string;
        protocol: {
          name: string;
          logo_url: string;
        };
      };
      func: string;
    };
  };
  preExecutedTx: ExplainTxResponse;
}

export const UnknowActionBody = ({
  data,
  preExecutedTx,
}: UnknowActionBodyProps) => {
  const actionName = preExecutedTx.type_call?.action;
  return (
    <Card withBorder>
      <TransactionTypeHeader type={actionName ?? "Unknown"} />
      <Flex direction={"column"} gap={"sm"} py={"xs"} w={"100%"}>
        <TransactionChainName chainName={"Gnosis"} />
        <InteractionContract
          interactionName={"Interact contract"}
          contractAddress={preExecutedTx.type_call?.contract ?? ""}
        />
        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Text>{"Operation"}</Text>
          <Text>{actionName ?? ""}</Text>
        </Flex>
        {preExecutedTx.type_call?.contract_protocol_name ? (
          <InteractionProtocol
            protocolLogoURL={preExecutedTx.type_call.contract_protocol_logo_url}
            protocolName={preExecutedTx.type_call.contract_protocol_name}
          />
        ) : null}
      </Flex>
    </Card>
  );
};
