import { Button, Checkbox, Flex, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClipboard } from "@mantine/hooks";
import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { NOTIFICATIONS, NotificationsID } from "@/notifications";
import { showNotification } from "@mantine/notifications";
import { useNetworksConfig } from "@real-token/core";

export const CopyAddressModalContent = ({
  address,
  id,
  onCopy,
  onClose,
}: {
  address?: string | `0x${string}`;
  id?: string;
  onCopy?: () => void;
  onClose?: () => void;
}) => {
  const { t } = useTranslation("modals", { keyPrefix: "copyAddress" });
  const { copy } = useClipboard({ timeout: 500 });

  const { walletAddress: aaAddress } = useAA();

  const walletAddress = address ?? aaAddress;

  const [agreed, setAgreed] = useState(false);

  const networksConfig = useNetworksConfig();

  const handleCopy = () => {
    if (!walletAddress) return;
    copy(walletAddress);
    showNotification(NOTIFICATIONS[NotificationsID.copyAddress]);
    if (id) {
      modals.closeAll();
    }
    if (onCopy) {
      onCopy();
    }
  };

  return (
    <Flex direction={"column"} gap={"md"}>
      <Text>{t("description")}</Text>
      <Flex direction={"column"} gap={"xs"} mb={"md"}>
        <Text fw={600}>{t("supportedNetworks")}</Text>
        <Flex direction={"column"} gap={"xs"}>
          {networksConfig.map((network) => (
            <Flex
              gap={4}
              align={"center"}
              key={`supported-network-${network.chainId}`}
            >
              {network.logo && <network.logo width={15} height={15} />}
              <Text fw={500}>{network.displayName}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Checkbox
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        label={t("agree")}
      />
      <Flex justify={"space-between"} mt={"md"}>
        <Button
          onClick={() => {
            if (id) {
              modals.close(id);
            }
            if (onClose) {
              onClose();
            }
          }}
          color="red"
        >
          {t("buttons.cancel")}
        </Button>
        <Button onClick={handleCopy} color="green" disabled={!agreed}>
          {t("buttons.confirm")}
        </Button>
      </Flex>
    </Flex>
  );
};

export const CopyAddressModal: FC<ContextModalProps> = ({ id }) => {
  return <CopyAddressModalContent id={id} />;
};
