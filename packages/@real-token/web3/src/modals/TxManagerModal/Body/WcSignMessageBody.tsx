import { useAA, WalletKitTypes } from "@real-token/aa-core";
import { useMemo } from "react";
import { Flex, Textarea, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import classes from "../WcTxManagerModal.module.css";
import { useTranslation } from "react-i18next";

interface WcSignMessageBodyProps {
  index: number;
  currentTx: WalletKitTypes.SessionRequest;
}
export const WcSignMessageBody = ({
  index,
  currentTx,
}: WcSignMessageBodyProps) => {
  const { t } = useTranslation("modals");

  const { wcTxsToValidate, confirmWcTx, refuseWcTx, confirmAllWcTxs } = useAA();

  const decodedMessage = useMemo(() => {
    return Buffer.from(
      currentTx.params.request.params[0].slice(2),
      "hex"
    ).toString("utf8");
  }, [currentTx]);

  const confirm = () => {
    confirmWcTx(index);
    if (index == 0 && wcTxsToValidate.length == 0) modals.closeAll();
  };

  return (
    <Flex direction={"column"} gap={"md"}>
      <Textarea
        value={decodedMessage}
        readOnly
        styles={{
          input: {
            height: "10rem",
          },
        }}
      />
      <Flex gap={"sm"}>
        <Button color={"red"} onClick={() => refuseWcTx(index)}>
          {t("walletConnect.refuse")}
        </Button>
        <Button color={"green"} onClick={() => confirm()}>
          {t("walletConnect.sign")}
        </Button>
        {wcTxsToValidate.length > 1 ? (
          <Button className={classes.button} onClick={() => confirmAllWcTxs()}>
            {t("walletConnect.confirmAll")}
          </Button>
        ) : undefined}
      </Flex>
    </Flex>
  );
};
