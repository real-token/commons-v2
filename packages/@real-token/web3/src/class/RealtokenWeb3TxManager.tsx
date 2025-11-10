import { EventEmitter } from "../utils/EventEmitter";
import { modals } from "@mantine/modals";
import {
  AddTransactionParams,
  ProviderProps,
  TxType,
  SignatureType as AASignatureType,
} from "@real-token/aa-core";
import { SignableMessage, SignTypedDataParameters } from "viem";

export enum TxEvent {
  // Transaction events
  TX_ADDED = "TX_ADDED",
  TX_CONFIRM = "TX_CONFIRM",
  TX_REFUSED = "TX_REFUSED",
  TX_SUCCESS = "TX_SUCCESS",
  TX_ERROR = "TX_ERROR",

  // Signature events
  SIGNATURE_ADDED = "SIGNATURE_ADDED",
  SIGNATURE_CONFIRM = "SIGNATURE_CONFIRM",
  SIGNATURE_REFUSED = "SIGNATURE_REFUSED",
  SIGNATURE_SUCCESS = "SIGNATURE_SUCCESS",
  SIGNATURE_ERROR = "SIGNATURE_ERROR",
}

type TransactionType = TxType.AA | TxType.EOA | TxType.WC;
type SignatureType = TxType.AA_SIGNATURES | TxType.EOA_SIGNATURES;

interface ConfirmEvent {
  transactionId: string;
}
interface SuccessEvent {
  transactionId: string;
}
export interface ErrorEvent {
  transactionId: string;
  error: Error;
}
interface RefusedEvent {
  transactionId: string;
}

export interface TransactionEmitedEvent {
  transactionId: string;
  type: TransactionType;
  data: AddTransactionParams;
}

export interface TransactionAddedEvent {
  transactionId: string;
  type: TransactionType;
  index: number;
  data: AddTransactionParams;
}
export interface TransactionSuccessEvent extends SuccessEvent {
  type: TransactionType;
  txHash: string;
}

export interface SignatureEmitedEventBase {
  transactionId: string;
  type: SignatureType;
}
export interface SignatureMessageEmitedEvent extends SignatureEmitedEventBase {
  signatureType: AASignatureType.MESSAGE;
  data: SignableMessage;
}
export interface SignatureTypedDataEmitedEvent
  extends SignatureEmitedEventBase {
  signatureType: AASignatureType.TYPED_DATA;
  data: Omit<SignTypedDataParameters, "account" | "connector">;
}
export type SignatureEmitedEvent =
  | SignatureMessageEmitedEvent
  | SignatureTypedDataEmitedEvent;

export interface SignatureAddedEvent {
  transactionId: string;
  type: SignatureType;
  signatureType: AASignatureType;
  index: number;
  data?: any; // Données de la signature (message ou typed data)
}
export interface SignatureSuccessEvent extends SuccessEvent {
  type: SignatureType;
  signedMessage: string;
}

export interface TransactionWaitingBlockchainEvent {
  transactionId: string;
  txHash: string;
}

export class RealtokenWeb3TxManager extends EventEmitter {
  private addTransactionFn?: ProviderProps["addTransaction"];
  private addSignatureFn?: ProviderProps["addSignature"];
  private confirmTxFn?: ProviderProps["confirmTx"];
  private refuseTxFn?: ProviderProps["refuseTx"];
  private publicClient?: any;
  private blockExplorerUrl?: string;
  private activeTransactions: Map<string, TransactionAddedEvent> = new Map();
  private activeSignatures: Map<string, SignatureAddedEvent> = new Map();

  constructor() {
    super();
    this.setupEventListeners();
  }

  // Initialisation avec les fonctions aa-core et config réseau
  initialize(config: {
    addTransaction: ProviderProps["addTransaction"];
    addSignature: ProviderProps["addSignature"];
    confirmTx: ProviderProps["confirmTx"];
    refuseTx: ProviderProps["refuseTx"];
    publicClient?: any;
    blockExplorerUrl?: string;
  }) {
    this.addTransactionFn = config.addTransaction;
    this.addSignatureFn = config.addSignature;
    this.confirmTxFn = config.confirmTx;
    this.refuseTxFn = config.refuseTx;
    this.publicClient = config.publicClient;
    this.blockExplorerUrl = config.blockExplorerUrl;
  }

  private setupEventListeners() {
    this.on(TxEvent.TX_ADDED, this.handleTransactionAdded.bind(this));
    this.on(TxEvent.TX_CONFIRM, this.handleTransactionConfirm.bind(this));
    this.on(TxEvent.TX_REFUSED, this.handleTransactionRefused.bind(this));
    this.on(TxEvent.TX_SUCCESS, this.handleTransactionSuccess.bind(this));
    this.on(TxEvent.TX_ERROR, this.handleTransactionError.bind(this));

    this.on(TxEvent.SIGNATURE_ADDED, this.handleSignatureAdded.bind(this));
    this.on(TxEvent.SIGNATURE_CONFIRM, this.handleSignatureConfirm.bind(this));
    this.on(TxEvent.SIGNATURE_REFUSED, this.handleSignatureRefused.bind(this));
    this.on(TxEvent.SIGNATURE_SUCCESS, this.handleSignatureSuccess.bind(this));
    this.on(TxEvent.SIGNATURE_ERROR, this.handleSignatureError.bind(this));
  }

  emitTransactionAdded(event: TransactionEmitedEvent) {
    this.emit(TxEvent.TX_ADDED, event);
  }
  emitSignatureAdded(event: SignatureEmitedEvent) {
    this.emit(TxEvent.SIGNATURE_ADDED, event);
  }

  emitTransactionConfirm(event: ConfirmEvent) {
    this.emit(TxEvent.TX_CONFIRM, event);
  }
  emitSignatureConfirm(event: ConfirmEvent) {
    this.emit(TxEvent.SIGNATURE_CONFIRM, event);
  }

  emitTransactionRefused(event: RefusedEvent) {
    this.emit(TxEvent.TX_REFUSED, event);
  }
  emitSignatureRefused(event: RefusedEvent) {
    this.emit(TxEvent.SIGNATURE_REFUSED, event);
  }

  emitTransactionSuccess(event: TransactionSuccessEvent) {
    this.emit(TxEvent.TX_SUCCESS, event);
  }
  emitSignatureSuccess(event: SignatureSuccessEvent) {
    this.emit(TxEvent.SIGNATURE_SUCCESS, event);
  }

  emitTransactionError(event: ErrorEvent) {
    this.emit(TxEvent.TX_ERROR, event);
  }
  emitSignatureError(event: ErrorEvent) {
    this.emit(TxEvent.SIGNATURE_ERROR, event);
  }

  emitTransactionWaitingBlockchain(event: TransactionWaitingBlockchainEvent) {
    this.emit("TX_WAITING_BLOCKCHAIN", event);
  }

  // Send tx to aa-core
  private async handleTransactionAdded(event: TransactionAddedEvent) {
    try {
      if (!this.addTransactionFn) {
        throw new Error("addTransaction function not initialized");
      }

      // Appeler addTransaction d'aa-core
      const transaction = await this.addTransactionFn({
        to: event.data.to,
        data: event.data.data || "0x",
        value: event.data.value ? BigInt(event.data.value) : BigInt(0),
      });

      console.log("transaction added by manager", transaction);

      this.activeTransactions.set(event.transactionId, {
        transactionId: event.transactionId,
        type: transaction.type,
        index: transaction.index,
        data: event.data,
      });

      if (transaction.type === TxType.EOA) {
        // Pour EOA, auto-confirmer la transaction
        console.log(
          "EOA transaction detected, auto-confirming with index:",
          transaction.index
        );

        // Auto-émettre TX_CONFIRM pour EOA pour déclencher l'exécution
        this.emitTransactionConfirm({
          transactionId: event.transactionId,
        });
      } else if (
        transaction.type === TxType.AA ||
        transaction.type === TxType.WC
      ) {
      } else {
        throw new Error("Invalid transaction type");
      }
    } catch (error) {
      this.emitTransactionError({
        transactionId: event.transactionId,
        error: error as Error,
      });
    }
  }
  private async handleSignatureAdded(
    event: SignatureEmitedEvent
  ): Promise<void> {
    try {
      if (!this.addSignatureFn) {
        throw new Error("addSignature function not initialized");
      }

      const signatureParams = await this.addSignatureFn(
        event.signatureType,
        event.data
      );
      console.log("signature added by manager", signatureParams);

      this.activeSignatures.set(event.transactionId, {
        index: signatureParams.index,
        type: signatureParams.type,
        signatureType: event.signatureType,
        transactionId: event.transactionId,
        data: event.data, // Stocker les données de signature
      });

      if (signatureParams.type === TxType.EOA_SIGNATURES) {
        console.log(
          "EOA signature detected, auto-confirming with index:",
          signatureParams.index
        );

        // Pour les signatures EOA, on auto-confirme immédiatement
        // car le processus de signature est géré par le wallet
        this.emitSignatureConfirm({
          transactionId: event.transactionId,
        });
      } else if (signatureParams.type === TxType.AA_SIGNATURES) {
        console.log("🔐 AA Signature detected, opening modal...", {
          transactionId: event.transactionId,
          signatureParams,
          event,
        });

        // Ouvrir la modale de signature AA
        console.log("📱 Opening AA signature modal...");
        modals.openContextModal({
          modal: "aaSignatureManagerModal",
          innerProps: {},
        });
      } else {
        throw new Error("Invalid signature type");
      }
    } catch (error) {
      this.emitSignatureError({
        transactionId: event.transactionId,
        error: error as Error,
      });
    }
  }

  private async handleTransactionConfirm(event: ConfirmEvent): Promise<void> {
    const transaction = this.activeTransactions.get(event.transactionId);
    if (!transaction) {
      throw new Error(`Transaction not found: ${event.transactionId}`);
    }

    try {
      if (!this.confirmTxFn) {
        throw new Error("confirmTx function not initialized");
      }

      // 2 case possible: EOA ou AA
      // EOA: We receive the txHash after confirmTx but the tx is not yet validated on the blockchain
      // AA: We receive the txHash after confirmTx but the tx is already on the blockchain

      let txHash: string;

      if (transaction.type === TxType.EOA) {
        const result = await this.confirmTxFn(
          transaction.index,
          transaction.type
        );
        txHash = result || "";

        // Émettre l'événement pour la notification intermédiaire
        this.emitTransactionWaitingBlockchain({
          transactionId: event.transactionId,
          txHash,
        });

        // Attendre la confirmation pour EOA
        if (this.publicClient) {
          const receipt = await this.publicClient.waitForTransactionReceipt({
            hash: txHash,
            // TODO: get confirmations number needed from network config
            confirmations: 3,
          });

          if (receipt.status !== "success") {
            throw new Error("Transaction failed");
          }
        }
      } else {
        // Pour aa, wc, aaSignatures - appeler confirmTx

        const result = await this.confirmTxFn(
          transaction.index,
          transaction.type
        );
        txHash = result || "";
        console.log("confirmTx result:", txHash);

        if (!txHash) {
          throw new Error("Transaction hash is required");
        }
      }

      this.emitTransactionSuccess({
        transactionId: event.transactionId,
        txHash,
        type: transaction.type,
      });
    } catch (error) {
      console.log("🚨 Transaction confirm failed, emitting TX_ERROR:", {
        transactionId: event.transactionId,
        error: error,
      });
      this.emitTransactionError({
        transactionId: event.transactionId,
        error: error as Error,
      });
    }
  }
  private async handleSignatureConfirm(event: ConfirmEvent) {
    const signature = this.activeSignatures.get(event.transactionId);
    if (!signature) {
      throw new Error(`Signature not found: ${event.transactionId}`);
    }

    try {
      if (!this.confirmTxFn) {
        throw new Error("confirmTxFn function not initialized");
      }

      const messageSigned = await this.confirmTxFn(
        signature.index,
        signature.type
      );
      if (!messageSigned) {
        throw new Error("Message signed is required");
      }

      this.emitSignatureSuccess({
        transactionId: event.transactionId,
        signedMessage: messageSigned,
        type: signature.type,
      });
    } catch (error) {
      this.emitSignatureError({
        transactionId: event.transactionId,
        error: error as Error,
      });
    }
  }

  private handleTransactionRefused(event: RefusedEvent) {
    const signature = this.activeSignatures.get(event.transactionId);
    if (!signature) {
      throw new Error(`Signature not found: ${event.transactionId}`);
    }

    try {
      if (this.refuseTxFn) {
        this.refuseTxFn(signature.index, signature.type as any);
      }

      this.activeSignatures.delete(event.transactionId);
    } catch (error) {
      this.emitTransactionError({
        transactionId: event.transactionId,
        error: error as Error,
      });
    }
  }
  private handleSignatureRefused(event: RefusedEvent) {
    const signature = this.activeSignatures.get(event.transactionId);
    if (!signature) {
      throw new Error(`Signature not found: ${event.transactionId}`);
    }

    try {
      if (this.refuseTxFn) {
        this.refuseTxFn(signature.index, signature.type);
      }

      this.activeSignatures.delete(event.transactionId);
    } catch (error) {
      this.emitSignatureError({
        transactionId: event.transactionId,
        error: error as Error,
      });
    }
  }

  private handleTransactionSuccess(event: TransactionSuccessEvent) {
    const transaction = this.activeTransactions.get(event.transactionId);

    this.activeTransactions.delete(event.transactionId);
  }
  private handleSignatureSuccess(event: SignatureSuccessEvent) {
    const signature = this.activeSignatures.get(event.transactionId);
    if (!signature) {
      throw new Error(`Signature not found: ${event.transactionId}`);
    }

    this.activeSignatures.delete(event.transactionId);
  }

  private handleTransactionError(event: ErrorEvent) {
    console.log("🔥 handleTransactionError called:", {
      transactionId: event.transactionId,
      error: event.error,
    });
    console.error("Transaction error:", event.error);

    const transaction = this.activeTransactions.get(event.transactionId);
    const isUserRejection = event.error.message
      .toLowerCase()
      .includes("user rejected the request");

    this.activeTransactions.delete(event.transactionId);
  }
  private handleSignatureError(event: ErrorEvent) {
    const signature = this.activeSignatures.get(event.transactionId);
    if (!signature) {
      throw new Error(`Signature not found: ${event.transactionId}`);
    }

    console.error("Transaction error:", event.error);

    this.activeSignatures.delete(event.transactionId);
  }

  // Méthode pour récupérer les signatures actives
  getActiveSignatures(): SignatureAddedEvent[] {
    return Array.from(this.activeSignatures.values());
  }

  // Méthode pour récupérer les transactions actives
  getActiveTransactions(): TransactionAddedEvent[] {
    return Array.from(this.activeTransactions.values());
  }
}
