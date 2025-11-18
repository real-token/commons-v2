import React from "react";

import { Avatar, Card, Flex, Text } from "@mantine/core";
import {
  BalanceChange as BalanceChangeType,
  TokenItem,
} from "@rabby-wallet/rabby-api/dist/types";
import { useTranslation } from "react-i18next";

const TokenLine = ({
  token,
  isSend,
}: {
  token: TokenItem;
  isSend: boolean;
}) => {
  return (
    <Flex justify={"space-between"}>
      <Flex align={"center"} gap={"xs"}>
        <Avatar src={token.logo_url} alt={token.symbol} size={24} />
        <Text c={isSend ? "red" : "green"} fw={600}>{`${isSend ? "-" : "+"} ${
          token.amount
        } ${token.symbol} `}</Text>
      </Flex>
      {token.price && (
        <Text>{`≈ $${(token.price * token.amount).toFixed(4)}`}</Text>
      )}
    </Flex>
  );
};

interface Props {
  balanceChange?: BalanceChangeType;
}

export const BalanceChange: React.FC<Props> = ({ balanceChange }) => {
  const { t } = useTranslation("web3", {
    keyPrefix: "explainTransaction",
  });

  if (balanceChange?.error) {
    return null;
  }

  return (
    <Card withBorder>
      <Flex direction={"column"} gap={"md"}>
        <Text>{t("common.simulationResults")}</Text>
        {balanceChange?.send_token_list.map((token) => (
          <TokenLine key={token.symbol} token={token} isSend={true} />
        ))}
        {balanceChange?.receive_token_list.map((token) => (
          <TokenLine key={token.symbol} token={token} isSend={false} />
        ))}
      </Flex>
    </Card>
  );
};
