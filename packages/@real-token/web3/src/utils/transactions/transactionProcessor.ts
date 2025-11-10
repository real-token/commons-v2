import { parseSignature, SignableMessage } from "viem";
import { SignatureType, TxType } from "@real-token/aa-core";
import { generateId } from "../generateId";
import erc20PermitSignature from "../permit/erc20PermitSignature";
import coinBridgeTokenPermitSignature from "../permit/coinBridgeTokenPermitSignature";
import {
  ErrorEvent,
  RealtokenWeb3TxManager,
  SignatureSuccessEvent,
  TransactionSuccessEvent,
  TransactionWaitingBlockchainEvent,
} from "../../class";
import {
  BaseTransaction,
  TransactionResult,
  SignMessageErc20TransactionData,
  SignMessageCoinBridgeTransactionData,
  SignMessageTransactionData,
} from "./types";

export interface TransactionProcessorDependencies {
  txManager: RealtokenWeb3TxManager;
  publicClient: any;
  isAA: boolean;
  blockExplorerUrl?: string;
}

/**
 * Processeur générique pour traiter une transaction (signature ou on-chain)
 */
export async function processTransaction(
  txData: BaseTransaction,
  dependencies: TransactionProcessorDependencies,
  notificationContext?: {
    notificationId: string;
    notifications: any;
    updateWaitingBlockchain: (txHash: string) => void;
  }
): Promise<TransactionResult> {
  const { txManager, publicClient, isAA } = dependencies;

  if (
    txData.type === "signMessage-erc20" ||
    txData.type === "signMessage-coinBridge"
  ) {
    return new Promise(async (resolve) => {
      // Signature ERC20 permit
      try {
        const permitDataToSign =
          txData.type === "signMessage-erc20"
            ? await erc20PermitSignature(
                txData.owner,
                txData.spender,
                txData.amount,
                txData.deadline,
                txData.contractAddress,
                publicClient!,
                txData.noncesFunctionName
              )
            : await coinBridgeTokenPermitSignature(
                txData.owner,
                txData.spender,
                txData.amount,
                txData.deadline,
                txData.contractAddress,
                publicClient!,
                txData.noncesFunctionName
              );

        const transactionId = generateId();
        txManager.emitSignatureAdded({
          transactionId,
          type: isAA ? TxType.AA_SIGNATURES : TxType.EOA_SIGNATURES,
          signatureType: SignatureType.TYPED_DATA,
          data: permitDataToSign,
        });

        let contextData: Record<string, any> = {};

        const handleSuccess = (event: SignatureSuccessEvent) => {
          if (event.transactionId === transactionId) {
            txManager.off("SIGNATURE_SUCCESS", handleSuccess);
            txManager.off("SIGNATURE_ERROR", handleError);

            console.log("signedMessage event", event);

            const { r, s, v } = parseSignature(
              event.signedMessage as `0x${string}`
            );

            console.log("r", r);
            console.log("s", s);
            console.log("v", v);

            const signatureData: Record<string, any> = {
              signature: event.signedMessage as `0x${string}`,
              r,
              s,
              v,
            };

            if (txData.signatureKey) {
              contextData[txData.signatureKey] = signatureData;
              contextData["transactionDeadline"] = txData.deadline;
            } else {
              console.warn(
                "⚠️ signatureKey is missing! Signature will not be stored in context."
              );
            }

            console.log(
              "🎯 Resolving signature with contextData:",
              contextData
            );
            return resolve({
              success: true,
              contextData,
            });
          }
        };

        const handleError = (event: ErrorEvent) => {
          if (event.transactionId === transactionId) {
            txManager.off("SIGNATURE_SUCCESS", handleSuccess);
            txManager.off("SIGNATURE_ERROR", handleError);
            return resolve({
              success: false,
              error: event.error,
            });
          }
        };

        txManager.on("SIGNATURE_SUCCESS", handleSuccess);
        txManager.on("SIGNATURE_ERROR", handleError);
      } catch (error) {
        return resolve({
          success: false,
          error: error as Error,
        });
      }
    });
  } else if (txData.type === "signMessage") {
    return new Promise(async (resolve) => {
      const transactionId = generateId();

      let contextData: Record<string, any> = {};

      const handleSuccess = (event: SignatureSuccessEvent) => {
        if (event.transactionId === transactionId) {
          txManager.off("SIGNATURE_SUCCESS", handleSuccess);
          txManager.off("SIGNATURE_ERROR", handleError);

          const { r, s, v } = parseSignature(
            event.signedMessage as `0x${string}`
          );

          const signatureData: Record<string, any> = {
            signature: event.signedMessage as `0x${string}`,
            r,
            s,
            v,
          };

          if (txData.signatureKey) {
            contextData[txData.signatureKey] = signatureData;
          } else {
            console.warn(
              "⚠️ signatureKey is missing! Signature will not be stored in context."
            );
          }

          console.log(
            "🎯 Resolving signMessage with contextData:",
            contextData
          );
          return resolve({
            success: true,
            contextData,
          });
        }
      };

      const handleError = (event: ErrorEvent) => {
        if (event.transactionId === transactionId) {
          txManager.off("SIGNATURE_SUCCESS", handleSuccess);
          txManager.off("SIGNATURE_ERROR", handleError);
          return resolve({
            success: false,
            error: event.error,
          });
        }
      };

      txManager.on("SIGNATURE_SUCCESS", handleSuccess);
      txManager.on("SIGNATURE_ERROR", handleError);

      txManager.emitSignatureAdded({
        transactionId,
        type: isAA ? TxType.AA_SIGNATURES : TxType.EOA_SIGNATURES,
        signatureType: SignatureType.MESSAGE,
        data: txData.message as SignableMessage,
      });
    });
  } else if (txData.type === "onchain" || txData.type === "native") {
    return new Promise(async (resolve) => {
      const type = isAA ? TxType.AA : TxType.EOA;

      const transactionId = generateId();

      const handleWaitingBlockchain = (event: TransactionWaitingBlockchainEvent) => {
        if (event.transactionId === transactionId && notificationContext) {
          // Mettre à jour la notification pour EOA seulement
          notificationContext.updateWaitingBlockchain(event.txHash);
        }
      };

      const handleSuccess = (event: TransactionSuccessEvent) => {
        if (event.transactionId === transactionId) {
          txManager.off("TX_SUCCESS", handleSuccess);
          txManager.off("TX_ERROR", handleError);
          txManager.off("TX_WAITING_BLOCKCHAIN", handleWaitingBlockchain);
          resolve({
            success: true,
            txHash: event.txHash,
          });
        }
      };

      const handleError = (event: ErrorEvent) => {
        if (event.transactionId === transactionId) {
          txManager.off("TX_SUCCESS", handleSuccess);
          txManager.off("TX_ERROR", handleError);
          txManager.off("TX_WAITING_BLOCKCHAIN", handleWaitingBlockchain);
          resolve({
            success: false,
            error: event.error,
          });
        }
      };

      txManager.on("TX_SUCCESS", handleSuccess);
      txManager.on("TX_ERROR", handleError);
      txManager.on("TX_WAITING_BLOCKCHAIN", handleWaitingBlockchain);

      txManager.emitTransactionAdded({
        transactionId,
        type,
        data: {
          to: txData.to,
          data: txData.type === "native" ? txData.data || "0x" : txData.data,
          value: txData.value,
        },
      });
    });
  } else {
    throw new Error(`Transaction type not supported`);
  }
}
