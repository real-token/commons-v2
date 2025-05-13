import { Avatar, Flex, Paper, Text } from '@mantine/core';

export const InteractionProtocol = ({
  protocolLogoURL,
  protocolName,
}: {
  protocolLogoURL: string;
  protocolName: string;
}) => {
  return (
    <Paper withBorder p={'sm'}>
      <Flex justify={'space-between'} align={'center'}>
        <Text>{'Protocol'}</Text>
        <Flex gap={4} align={'center'}>
          <Avatar src={protocolLogoURL} alt={protocolName} size={20} />
          <Text>{protocolName}</Text>
        </Flex>
      </Flex>
    </Paper>
  );
};
