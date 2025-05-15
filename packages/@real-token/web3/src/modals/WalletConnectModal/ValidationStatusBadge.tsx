import { Badge } from '@mantine/core';
import {
  IconAlertCircle,
  IconAlertTriangleFilled,
  IconInfoCircle,
} from '@tabler/icons-react';

export const ValidationStatusBadge = ({
  validationStatus,
  isScam,
}: {
  validationStatus: string;
  isScam: boolean;
}) => {
  if (validationStatus == 'VALID') return null;

  const color = validationStatus == 'INVALID' ? 'red' : 'orange';
  const label =
    validationStatus == 'INVALID' ? 'Domain mismatch' : 'Cannot verify';
  const icon =
    validationStatus == 'INVALID' ? (
      <IconAlertCircle size={16} />
    ) : (
      <IconInfoCircle size={16} />
    );

  return (
    <Badge
      color={isScam ? 'red' : color}
      leftSection={isScam ? <IconAlertTriangleFilled size={16} /> : icon}
    >
      {isScam ? 'Security risk' : label}
    </Badge>
  );
};
