import { Tx } from "@/types/transactions/Tx";
import { ApproveActionBody } from "./Body/actions/transaction/ApproveActionBody";
import { SwapTokenBody } from "./Body/actions/transaction/SwapTokenBody";
import { CommonActionBody } from "./Body/actions/transaction/CommonActionBody";
import {
  UnknowActionBody,
  UnknowActionBodyProps,
} from "./Body/actions/transaction/UnknowActionBody";
import { WrapActionBody } from "./Body/actions/transaction/WrapActionBody";
import { RevokeTokenActionBody } from "./Body/actions/transaction/RevokeTokenActionBody";

export const ExplainTransactionBody = ({ tx }: { tx: Tx }) => {
  if (tx.parsedTx.common) {
    return (
      <CommonActionBody data={tx.parsedTx.common} explain={tx.preExecutedTx} />
    );
  }

  if (tx.parsedTx.approveToken) {
    return (
      <ApproveActionBody
        data={tx.parsedTx.approveToken}
        explain={tx.preExecutedTx}
      />
    );
  }

  if (tx.parsedTx.swap) {
    return <SwapTokenBody data={tx.parsedTx.swap} explain={tx.preExecutedTx} />;
  }

  if (tx.parsedTx.wrapToken) {
    return (
      <WrapActionBody data={tx.parsedTx.wrapToken} explain={tx.preExecutedTx} />
    );
  }

  if (tx.parsedTx.revokeToken) {
    return (
      <RevokeTokenActionBody
        data={tx.parsedTx.revokeToken}
        explain={tx.preExecutedTx}
      />
    );
  }
  return (
    <UnknowActionBody
      data={tx.actionData as unknown as UnknowActionBodyProps["data"]}
      preExecutedTx={tx.preExecutedTx}
    />
  );
};
