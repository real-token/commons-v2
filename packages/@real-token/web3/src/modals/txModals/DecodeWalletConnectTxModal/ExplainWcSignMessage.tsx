import { WcTransactionType } from "@real-token/aa-core";
import { useMemo } from "react";
import { WcSignMessageBody } from "../commons/Body/WcSignMessageBody";

export const ExplainWcSignMessage = ({
  index,
  tx,
}: {
  index: number;
  tx: WcTransactionType;
}) => {
  const decodedMessage = useMemo(() => {
    return Buffer.from(
      tx.event.params.request.params[0].slice(2),
      "hex"
    ).toString("utf8");
  }, [tx]);

  return <WcSignMessageBody signMessage={decodedMessage} index={index} />;
};
