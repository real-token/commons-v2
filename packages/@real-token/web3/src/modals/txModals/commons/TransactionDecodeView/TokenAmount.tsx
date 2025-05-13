import { Avatar, Flex, Text, Tooltip } from '@mantine/core';

export const TokenAmount = ({
  title,
  tokenName,
  tokenLogoURL,
  tokenSymbol,
  amount,
}: {
  title: string;
  tokenName: string;
  tokenLogoURL: string;
  tokenSymbol: string;
  amount?: string;
}) => {
  return (
    <Flex justify={'space-between'} align={'center'} w={'100%'}>
      <Text>{title}</Text>
      <Tooltip label={tokenName}>
        <Flex gap={4} align={'center'}>
          <Avatar src={tokenLogoURL} alt={tokenName} size={20} />
          {amount ? (
            <Text>{`${amount} ${tokenSymbol}`}</Text>
          ) : (
            <Text>{`${tokenSymbol}`}</Text>
          )}
        </Flex>
      </Tooltip>
    </Flex>
  );
};
