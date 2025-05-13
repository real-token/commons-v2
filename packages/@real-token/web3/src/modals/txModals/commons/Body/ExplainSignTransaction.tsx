import { Tx } from "@/types/Tx";
import { PermitTokenBody } from "./actions/sign/PermitTokenBody";
import { ParseCommonResponse } from "@/types/TxResponse";
import { TokenOrderBody } from "./actions/sign/TokenOrderBody";

interface ExplainSignTransactionProps {
  parsedCommonTx: ParseCommonResponse | undefined;
  contractInfo: Tx["contractInfo"];
  typedData: string;
}
export const ExplainSignTransaction = ({
  parsedCommonTx,
  contractInfo,
  typedData,
}: ExplainSignTransactionProps) => {
  if (
    !parsedCommonTx ||
    !parsedCommonTx.action ||
    !parsedCommonTx.action.type == null
  )
    return null;

  if (parsedCommonTx.action.type == "permit1_approve_token") {
    return (
      <PermitTokenBody
        data={parsedCommonTx}
        contractInfo={contractInfo}
        typedData={typedData}
      />
    );
  }

  if (parsedCommonTx.action.type == "swap_token_order") {
    return (
      <TokenOrderBody
        data={parsedCommonTx}
        contractInfo={contractInfo}
        typedData={typedData}
      />
    );
  }

  return <div>{parsedCommonTx.action.type}</div>;
};
