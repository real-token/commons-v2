import { Flex, Paper, Text } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

const permissionsToText = new Map([
  ['eth_sendTransaction', 'Send transactions'],
  ['personal_sign', 'Sign messages'],
  ['eth_sign', 'Sign transactions'],
  ['eth_signTypedData', 'Sign typed data'],
  ['eth_signTypedData_v4', 'Sign typed data v4'],
]);

export const PermissionsRequested = ({
  permissions,
}: {
  permissions: string[];
}) => {
  return (
    <Paper withBorder p={'xs'} radius={'md'}>
      <Flex direction={'column'} gap={'xs'}>
        <Text fw={600}>{'Permissions requested'}</Text>
        <Flex direction={'column'} gap={'xs'}>
          {permissions.map((permission) => (
            <Flex gap={4} align={'center'}>
              <IconCheck size={16} />
              <Text fz={14}>{permissionsToText.get(permission)}</Text>
            </Flex>
          ))}
          <Flex gap={4} align={'center'}>
            <IconX size={16} color={'var(--mantine-color-dimmed)'} />
            <Text c={'dimmed'} fz={14}>
              {'Move funds whitout permissions'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};
