import { useAA } from "@real-token/aa-core";
import { Flex, Textarea, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface WcSignMessageBodyProps {
  index: number;
  signMessage: string;
}
export const WcSignMessageBody = ({
  index,
  signMessage,
}: WcSignMessageBodyProps) => {
  const { t } = useTranslation("modals");

  const { confirmTx, refuseTx } = useAA();

  return (
    <Flex direction={"column"} gap={"md"}>
      <Textarea
        value={signMessage}
        readOnly
        styles={{
          input: {
            height: "10rem",
          },
        }}
      />
      <Flex gap={"sm"}>
        <Button color={"red"} onClick={() => refuseTx(index, "wc")}>
          {t("walletConnect.refuse")}
        </Button>
        <Button color={"green"} onClick={() => confirmTx(index, "wc")}>
          {t("walletConnect.sign")}
        </Button>
        {/* {wcTxsToValidate.length > 1 ? (
          <Button className={classes.button} onClick={() => confirmAllTxs()}>
            {t("walletConnect.confirmAll")}
          </Button>
        ) : undefined} */}
      </Flex>
    </Flex>
  );
};
