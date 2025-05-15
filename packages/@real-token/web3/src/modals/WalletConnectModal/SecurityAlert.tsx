import { Alert } from '@mantine/core';
import {
  IconAlertCircle,
  IconAlertTriangleFilled,
  IconInfoCircle,
} from '@tabler/icons-react';

export const SecurityAlert = ({
  validationStatus,
  isScam,
}: {
  validationStatus: string;
  isScam: boolean;
}) => {
  if (validationStatus == 'VALID') return null;
  const color = validationStatus == 'INVALID' ? 'red' : 'orange';
  const label =
    validationStatus == 'INVALID'
      ? 'This website has a domain that does not match the sender of this request. Approving may lead to loss of funds.'
      : 'This domain cannot be verified. Check the request carefully before approving.';
  const title =
    validationStatus == 'INVALID' ? 'Domain mismatch' : 'Unknown domain';
  const icon =
    validationStatus == 'INVALID' ? (
      <IconAlertCircle size={24} />
    ) : (
      <IconInfoCircle size={24} />
    );
  return (
    <Alert
      color={isScam ? 'red' : color}
      variant={'light'}
      icon={isScam ? <IconAlertTriangleFilled size={24} /> : icon}
      title={isScam ? 'Known security risk' : title}
    >
      {isScam
        ? 'This domain is flagged as unsafe by multiple security providers. Refuse to connect to prevent any potential security risks.'
        : label}
    </Alert>
  );
};
