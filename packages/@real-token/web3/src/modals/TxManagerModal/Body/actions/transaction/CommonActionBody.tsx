import { Card, Flex, Text } from "@mantine/core";
import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";
import { TransactionTypeHeader } from "@/components/module/transactionDecodeView/common/TransactionTypeHeader";
import { TransactionChainName } from "@/components/module/transactionDecodeView/common/TransactionChainName";
import { InteractionContract } from "@/components/module/transactionDecodeView/common/InteractionContract";
import { ExplainTxResponse } from "@/types/transactions/TxResponse";
import { InteractionProtocol } from "@/components/module/transactionDecodeView/common/InteractionProtocol";
import { BalanceChange } from "@/components/module/transactionDecodeView/common/BalanceChange";

export const CommonActionBody = ({
  data,
  explain,
}: {
  data: ParsedTransactionActionData["common"];
  explain: ExplainTxResponse;
}) => {
  return (
    <Flex direction={"column"} gap={"md"}>
      <BalanceChange balanceChange={explain.balance_change} />
      <Card withBorder>
        <TransactionTypeHeader type={data?.title ?? "Unknown"} />
        <Flex direction={"column"} gap={"md"} py={"xs"} w={"100%"}>
          <TransactionChainName chainName={"Gnosis"} />
          {explain.type_call ? (
            <>
              <InteractionContract
                interactionName={"Interact contract"}
                contractAddress={explain.type_call.contract}
              />
              <InteractionProtocol
                protocolLogoURL={explain.type_call.contract_protocol_logo_url}
                protocolName={explain.type_call.contract_protocol_name}
              />
            </>
          ) : null}
          <Flex justify={"space-between"} align={"center"} w={"100%"}>
            <Text>{"Description"}</Text>
            <Text>{data?.desc}</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
