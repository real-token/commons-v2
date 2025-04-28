import { Avatar, Card, Flex, Text } from "@mantine/core";
import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";
import { ExplainTxResponse } from "@rabby-wallet/rabby-api/dist/types";
import { TransactionTypeHeader } from "@/components/module/transactionDecodeView/common/TransactionTypeHeader";
import { TransactionChainName } from "@/components/module/transactionDecodeView/common/TransactionChainName";
import { TokenAmount } from "@/components/module/transactionDecodeView/common/TokenAmount";
import { InteractionContract } from "@/components/module/transactionDecodeView/common/InteractionContract";
import { InteractionProtocol } from "@/components/module/transactionDecodeView/common/InteractionProtocol";

export const WrapActionBody = ({
  data,
  explain,
}: {
  data: ParsedTransactionActionData["wrapToken"];
  explain: ExplainTxResponse;
}) => {
  const sendToken = data?.payToken;
  const receiveToken = data?.receiveToken;
  return (
    <Flex direction={"column"} gap={"md"}>
      <Card withBorder>
        {explain?.balance_change ? (
          <Flex direction={"column"} gap={"md"}>
            <Text>{"Simulation results"}</Text>
            <Flex justify={"space-between"}>
              <Flex align={"center"} gap={"xs"}>
                <Avatar
                  src={sendToken?.logo_url}
                  alt={sendToken?.symbol}
                  size={24}
                />
                <Text
                  c={"red"}
                  fw={600}
                >{`- ${sendToken?.amount} ${sendToken?.symbol} `}</Text>
              </Flex>
              {sendToken?.price && (
                <Text>{`≈ $${(sendToken?.price * sendToken?.amount).toFixed(
                  4
                )}`}</Text>
              )}
            </Flex>
            <Flex justify={"space-between"}>
              <Flex align={"center"} gap={"xs"}>
                <Avatar
                  src={receiveToken?.logo_url}
                  alt={receiveToken?.symbol}
                  size={24}
                />
                <Text
                  c={"green"}
                  fw={600}
                >{`+ $${receiveToken?.min_amount.toFixed(4)} ${
                  receiveToken?.symbol
                } `}</Text>
              </Flex>
              {receiveToken?.price && (
                <Text>{`≈ $${(
                  receiveToken?.price * receiveToken?.min_amount
                ).toFixed(4)}`}</Text>
              )}
            </Flex>
          </Flex>
        ) : undefined}
      </Card>
      <Card withBorder>
        <TransactionTypeHeader type={"Wrap token"} />
        <Flex direction={"column"} gap={"sm"} py={"xs"} w={"100%"}>
          <TransactionChainName chainName={"Gnosis"} />
          {sendToken && (
            <TokenAmount
              title={"Pay"}
              tokenName={sendToken.name}
              tokenLogoURL={sendToken.logo_url}
              tokenSymbol={sendToken.symbol}
              amount={sendToken.amount.toString()}
            />
          )}
          {receiveToken && (
            <TokenAmount
              title={"Receive"}
              tokenName={receiveToken.name}
              tokenLogoURL={receiveToken.logo_url}
              tokenSymbol={receiveToken.symbol}
              amount={receiveToken.min_amount.toString()}
            />
          )}
        </Flex>
        {explain.type_call && (
          <>
            <Flex direction={"column"} gap={"sm"} py={"xs"}>
              <InteractionContract
                interactionName={"Interact contract"}
                contractAddress={explain.type_call?.contract}
              />
              {explain.type_call.contract_protocol_name ? (
                <InteractionProtocol
                  protocolLogoURL={explain.type_call.contract_protocol_logo_url}
                  protocolName={explain.type_call.contract_protocol_name}
                />
              ) : null}
            </Flex>
          </>
        )}
      </Card>
    </Flex>
  );
};
