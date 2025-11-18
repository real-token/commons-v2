import { Card, Flex, Text } from "@mantine/core";
import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";
import { TransactionTypeHeader } from "../../../TransactionDecodeView/TransactionTypeHeader";
import { TransactionChainName } from "../../../TransactionDecodeView/TransactionChainName";
import { InteractionContract } from "../../../TransactionDecodeView/InteractionContract";
import { ExplainTxResponse } from "@/types/TxResponse";
import { InteractionProtocol } from "../../../TransactionDecodeView/InteractionProtocol";
import { BalanceChange } from "../../../TransactionDecodeView/BalanceChange";
import { useTranslation } from "react-i18next";

export const CommonActionBody = ({
  data,
  explain,
}: {
  data: ParsedTransactionActionData["common"];
  explain: ExplainTxResponse;
}) => {
  const { t } = useTranslation("web3", {
    keyPrefix: "explainTransaction",
  });
  return (
    <Flex direction={"column"} gap={"md"}>
      <BalanceChange balanceChange={explain.balance_change} />
      <Card withBorder>
        <TransactionTypeHeader
          type={data?.title ?? t("commonAction.unknown")}
        />
        <Flex direction={"column"} gap={"md"} py={"xs"} w={"100%"}>
          <TransactionChainName />
          {explain.type_call ? (
            <>
              <InteractionContract
                interactionName={t("common.interactContract")}
                contractAddress={explain.type_call.contract}
              />
              <InteractionProtocol
                protocolLogoURL={explain.type_call.contract_protocol_logo_url}
                protocolName={explain.type_call.contract_protocol_name}
              />
            </>
          ) : null}
          <Flex justify={"space-between"} align={"center"} w={"100%"}>
            <Text>{t("common.description")}</Text>
            <Text>{data?.desc}</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
