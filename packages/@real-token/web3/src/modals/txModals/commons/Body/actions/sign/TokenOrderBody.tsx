import { Flex, Card, Text, Textarea } from "@mantine/core";
import { TransactionTypeHeader } from "../../../TransactionDecodeView/TransactionTypeHeader";
import { ParseCommonResponse } from "@rabby-wallet/rabby-api/dist/types";
import { Tx } from "@/types/Tx";
import { useExtractMessageFromTypedData } from "@/hooks/transactions/decode/useExtractMessageFromTypedData";
import { TransactionChainName } from "../../../TransactionDecodeView/TransactionChainName";
import { TokenAmount } from "../../../TransactionDecodeView/TokenAmount";
import { SwapTokenOrderAction } from "@/types/TxResponse";
import { InteractionContract } from "../../../TransactionDecodeView/InteractionContract";
import { InteractionProtocol } from "../../../TransactionDecodeView/InteractionProtocol";

export const TokenOrderBody = ({
  data,
  contractInfo,
  typedData,
}: {
  data: ParseCommonResponse;
  contractInfo: Tx["contractInfo"];
  typedData: string;
}) => {
  const parsedMessage = useExtractMessageFromTypedData(typedData);

  const action = data.action?.data as SwapTokenOrderAction;

  return (
    <Flex direction={"column"} gap={"md"}>
      <Card withBorder>
        <TransactionTypeHeader type={"Token order"} />
        <Flex direction={"column"} gap={"sm"} py={"xs"} w={"100%"}>
          <TransactionChainName chainName={"Gnosis"} />
          <TokenAmount
            title={"Pay"}
            tokenName={action.pay_token.name}
            tokenLogoURL={action.pay_token.logo_url}
            tokenSymbol={action.pay_token.symbol}
            amount={action.pay_token.amount.toString()}
          />
          <TokenAmount
            title={"Receive"}
            tokenName={action.receive_token.name}
            tokenLogoURL={action.receive_token.logo_url}
            tokenSymbol={action.receive_token.symbol}
            amount={action.receive_token.amount.toString()}
          />
          {action.expire_at && (
            <Flex justify={"space-between"} align={"center"} w={"100%"}>
              <Text>{"Expire time"}</Text>
              <Text>{action.expire_at}</Text>
            </Flex>
          )}
          {contractInfo && (
            <>
              <InteractionContract
                interactionName={"Permit to"}
                contractAddress={contractInfo.id}
              />
              {contractInfo.protocol && (
                <InteractionProtocol
                  protocolLogoURL={contractInfo.protocol.logo_url}
                  protocolName={contractInfo.protocol.name}
                />
              )}
            </>
          )}
        </Flex>
      </Card>
      <Card withBorder>
        <Flex direction={"column"} gap={"sm"}>
          <Text fw={500} fz={"lg"}>
            {"Permit data"}
          </Text>
          <Textarea
            value={JSON.stringify(parsedMessage, null, 2)}
            readOnly
            h={100}
            w={"100%"}
            styles={{
              wrapper: {
                height: "100%",
              },
              input: {
                height: "100%",
              },
            }}
          />
        </Flex>
      </Card>
    </Flex>
  );
};
