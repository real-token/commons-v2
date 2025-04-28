import {
  ParseCommonResponse,
  PermitAction,
} from "@rabby-wallet/rabby-api/dist/types";
import { Tx } from "@/types/transactions/Tx";
import { Card, Flex, Tooltip, Avatar, Text, Textarea } from "@mantine/core";
import { InteractionContract } from "@/components/module/transactionDecodeView/common/InteractionContract";
import { InteractionProtocol } from "@/components/module/transactionDecodeView/common/InteractionProtocol";
import { TransactionTypeHeader } from "@/components/module/transactionDecodeView/common/TransactionTypeHeader";
import { TransactionChainName } from "@/components/module/transactionDecodeView/common/TransactionChainName";
import { useEffect, useState } from "react";

export const PermitTokenBody = ({
  data,
  contractInfo,
  typedData,
}: {
  data: ParseCommonResponse;
  contractInfo: Tx["contractInfo"];
  typedData: string;
}) => {
  const action = data.action?.data as PermitAction;

  const [parsedMessage, setParsedMessage] = useState<JSON | null>(null);
  useEffect(() => {
    try {
      setParsedMessage(JSON.parse(typedData).message);
    } catch (error) {
      console.error(error);
    }
  }, [typedData]);

  return (
    <Flex direction={"column"} gap={"md"}>
      <Card withBorder>
        <TransactionTypeHeader type={"Permit token"} />
        <Flex direction={"column"} gap={"sm"} py={"xs"} w={"100%"}>
          <TransactionChainName chainName={"Gnosis"} />
          <Flex justify={"space-between"} align={"center"} w={"100%"}>
            <Text>{"Token"}</Text>
            <Tooltip label={action.token.name}>
              <Flex gap={4} align={"center"}>
                <Avatar
                  src={action.token.logo_url}
                  alt={action.token.name}
                  size={20}
                />
                <Text>{action.token.optimized_symbol}</Text>
              </Flex>
            </Tooltip>
          </Flex>
          <Flex justify={"space-between"} align={"center"} w={"100%"}>
            <Text>{"Expire time"}</Text>
            {/* @ts-ignore */}
            <Text>{data.action.expire_at}</Text>
          </Flex>
          <Flex justify={"space-between"} align={"center"} w={"100%"}>
            <Text>{"Amount"}</Text>
            <Text>{action.token.amount}</Text>
          </Flex>
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
