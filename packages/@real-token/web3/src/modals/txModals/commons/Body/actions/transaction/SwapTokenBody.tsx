import { Avatar, Card, Flex, Text } from "@mantine/core";
import { ExplainTxResponse } from "@rabby-wallet/rabby-api/dist/types";
import { TransactionTypeHeader } from "../../../TransactionDecodeView/TransactionTypeHeader";
import { TransactionChainName } from "../../../TransactionDecodeView/TransactionChainName";
import { TokenAmount } from "../../../TransactionDecodeView/TokenAmount";
import { InteractionContract } from "../../../TransactionDecodeView/InteractionContract";
import { InteractionProtocol } from "../../../TransactionDecodeView/InteractionProtocol";
import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";

export const SwapTokenBody = ({
  data,
  explain,
}: {
  data: ParsedTransactionActionData["swap"];
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
        <TransactionTypeHeader type={"Swap token"} />
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
              <InteractionProtocol
                protocolLogoURL={explain.type_call.contract_protocol_logo_url}
                protocolName={explain.type_call.contract_protocol_name}
              />
            </Flex>
          </>
        )}
      </Card>
    </Flex>
  );
};
