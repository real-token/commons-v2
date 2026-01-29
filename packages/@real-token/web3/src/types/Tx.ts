import { ContractInfo } from "@rabby-wallet/rabby-api/dist/types";
import { ExplainTxResponse, ParseCommonResponse } from "./TxResponse";
import { ParsedTransactionActionData } from "@rabby-wallet/rabby-action";

export interface Tx {
  parsedTx: ParsedTransactionActionData;
  preExecutedTx: ExplainTxResponse;

  parsedCommonTx?: ParseCommonResponse;
  contractInfo?: ContractInfo;
  actionData?: any;
}
