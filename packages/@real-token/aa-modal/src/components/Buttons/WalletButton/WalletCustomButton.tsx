import { Avatar, Badge, Text, Flex } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { AaWalletExternal } from "@real-token/web3";
import { ModalButton } from "../ModalButton/ModalButton";
import classes from "./WalletCustomButton.module.css";

export const WalletButtonCustom = ({
  connector,
  handleConnection,
  loading,
}: {
  connector: AaWalletExternal;
  handleConnection: (connector: AaWalletExternal) => void;
  loading: boolean;
}) => {
  const { t } = useTranslation("main", { keyPrefix: "button" });
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleConnection(connector);
  };

  return (
    <>
      <ModalButton
        onClick={(e) => handleClick(e)}
        leftSection={<Avatar src={connector.logo} size={"sm"} />}
        classNames={{
          inner: classes.inner,
          label: classes.label,
        }}
        w={"100%"}
        loading={loading}
      >
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Text fw={500}>{connector.name}</Text>
          {connector.isInstalled ? (
            <Badge color="blue" variant="light" radius={"sm"}>
              {t("installed")}
            </Badge>
          ) : undefined}
        </Flex>
      </ModalButton>
    </>
  );
};
