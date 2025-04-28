import { Flex, Text, LoadingOverlay, Button } from "@mantine/core";
import { useAA, WalletKitTypes } from "@real-token/aa-core";
import { useTranslation } from "react-i18next";
import { modals } from "@mantine/modals";
import classes from "../WcTxManagerModal.module.css";
import { shortenString } from "@realtoken/realt-commons";
import { useClipboard } from "@mantine/hooks";
import { useDecodeTransactions } from "../../../hooks/interface/transactions/useDecodeTransactions";

interface WcTransactionBodyProps {
  modalId: string;
  index: number;
  currentTx: WalletKitTypes.SessionRequest;
}
export const WcTransactionBody = ({
  modalId,
  index,
  currentTx,
}: WcTransactionBodyProps) => {
  const { t } = useTranslation("modals");

  const { copy } = useClipboard();

  const {
    wcTxsToValidate,
    confirmWcTx,
    refuseWcTx,
    confirmAllWcTxs,
    networkConfig,
  } = useAA();
  console.log(networkConfig);

  const { decodeData, decodeLoading, isError } = useDecodeTransactions(
    currentTx?.params.request.params[0],
    currentTx?.params.chainId
  );
  console.log({ isError });

  const confirm = () => {
    confirmWcTx(index);
    if (index == 0 && wcTxsToValidate.length == 0) modals.close(modalId);
  };

  return (
    <Flex direction={"column"} gap={"md"}>
      <LoadingOverlay
        visible={decodeLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Flex justify={"space-between"} w={"100%"} className={classes.txInfo}>
        <Flex direction={"column"}>
          <Text>{t("walletConnect.from")}</Text>
          <Text
            component="a"
            className={classes.link}
            href={`https://etherscan.io/address/${currentTx.params.request.params[0].from}`}
            target="_blank"
            fw={500}
          >
            {shortenString(currentTx.params.request.params[0].from, [6, 6])}
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text>{t("walletConnect.contractInteraction")}</Text>
          <Text
            component="a"
            className={classes.link}
            href={`https://etherscan.io/address/${currentTx.params.request.params[0].to}`}
            target="_blank"
            fw={500}
          >
            {shortenString(currentTx.params.request.params[0].to, [6, 6])}
          </Text>
        </Flex>
      </Flex>
      <Flex gap={"sm"}>
        <Button color={"red"} onClick={() => refuseWcTx(index)}>
          {t("walletConnect.refuse")}
        </Button>
        <Button color={"green"} onClick={() => confirm()}>
          {t("walletConnect.confirm")}
        </Button>
        {wcTxsToValidate.length > 1 ? (
          <Button className={classes.button} onClick={() => confirmAllWcTxs()}>
            {t("walletConnect.confirmAll")}
          </Button>
        ) : undefined}
      </Flex>
      {/* {decodeData && !isError ? (
        <Flex direction={"column"} gap={"sm"}>
          <Text fw={600} fz={20}>
            {t("walletConnect.data")}
          </Text>
          <Flex direction={"column"} gap={"md"}>
            <Flex direction={"column"}>
              <Text fw={600}>{t("walletConnect.name")}</Text>
              <Text>{decodedParams?.functionName}</Text>
            </Flex>
            <Flex direction={"column"}>
              <Text fw={600}>{t("walletConnect.params")}</Text>
              <Text>{decodedParams?.paramsValue.join(" ")}</Text>
            </Flex>
          </Flex>
          <Flex gap={"sm"}>
            <Button color={"red"} onClick={() => refuseWcTx(index)}>
              {t("walletConnect.refuse")}
            </Button>
            <Button color={"green"} onClick={() => confirm()}>
              {t("walletConnect.confirm")}
            </Button>
            {wcTxsToValidate.length > 1 ? (
              <Button
                className={classes.button}
                onClick={() => confirmAllWcTxs()}
              >
                {t("walletConnect.confirmAll")}
              </Button>
            ) : undefined}
          </Flex>
        </Flex>
      ) : undefined}
      {error ? (
        <Card>
          <Flex direction={"column"} gap={"lg"} align={"center"}>
            <Flex align={"center"} gap={4}>
              <IconAlertCircle color="red" size={30} />
              <Text fz={16}>{"Error while decoding transaction data"}</Text>
            </Flex>
            <Flex direction={"column"} gap={4}>
              <Button
                size="sm"
                rightSection={<IconRefresh size={16} />}
                onClick={() => decodeData()}
              >
                {"Retry"}
              </Button>
              <Button
                variant="transparent"
                size={"sm"}
                onClick={() => copy(data)}
              >
                {"Copy transaction data"}
              </Button>
            </Flex>
          </Flex>
        </Card>
      ) : undefined} */}
    </Flex>
  );
};
