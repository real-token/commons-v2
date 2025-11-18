import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";
import { Card, Flex, Text, Tooltip, Avatar } from "@mantine/core";
import { ExplainTxResponse } from "@rabby-wallet/rabby-api/dist/types";
import { TransactionTypeHeader } from "../../../TransactionDecodeView/TransactionTypeHeader";
import { TransactionChainName } from "../../../TransactionDecodeView/TransactionChainName";
import { InteractionContract } from "../../../TransactionDecodeView/InteractionContract";
import { InteractionProtocol } from "../../../TransactionDecodeView/InteractionProtocol";
import { useTranslation } from "react-i18next";

export const ApproveActionBody = ({
  data,
  explain,
}: {
  data: ParsedTransactionActionData["approveToken"];
  explain: ExplainTxResponse;
}) => {
  const { t } = useTranslation("web3", {
    keyPrefix: "explainTransaction",
  });
  if (!data) return null;
  return (
    <Card withBorder>
      <TransactionTypeHeader type={t("approveToken.title")} />
      <Flex direction={"column"} gap={"sm"} py={"xs"} w={"100%"}>
        <TransactionChainName />
        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Text>{t("common.token")}</Text>
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
          <Text>{t("common.amount")}</Text>
          <Text>{data.token.amount}</Text>
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={"sm"} py={"xs"}>
        <InteractionContract
          interactionName={t("approveToken.approveTo")}
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
