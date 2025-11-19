// Contexte partagé entre les transactions (générique)
export interface BaseTransactionContext {
  [key: string]: any; // Fallback pour compatibilité
}

// Type par défaut du contexte
export type TransactionContext<T = BaseTransactionContext> = T;

// Résultat enrichi avec le contexte
export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: Error;
  contextData?: Record<string, any>; // Données à partager avec les TX suivantes
}

// Type de base pour les données de transaction
export interface BaseTransactionData {
  to: `0x${string}`;
  from?: `0x${string}`;
  value?: bigint;
  skipCondition?: boolean | (() => boolean) | (() => Promise<boolean>); // Condition pour ignorer la transaction
  notifications?: TransactionNotifications; // Notifications optionnelles pour chaque transaction
}

// Transaction classique (on-chain)
export interface OnChainTransactionData extends BaseTransactionData {
  type: "onchain";
  data: `0x${string}`;
}

// Transaction native (envoi de jetons natifs)
export interface NativeTransactionData extends BaseTransactionData {
  type: "native";
  // data est optionnel pour les transactions natives (peut être vide pour un simple transfer)
  data?: `0x${string}`;
}

// Transaction de signature (off-chain)
// Signature ERC20 permit générique
export interface SignMessageErc20TransactionData {
  type: "signMessage-erc20";
  owner: `0x${string}`;
  spender: `0x${string}`;
  amount: string;
  deadline: number;
  contractAddress: `0x${string}`;
  noncesFunctionName?: "nonces" | "_nonces";
  signatureKey: string; // Clé pour stocker dans le contexte (obligatoire)
  tokenSymbol?: string; // Will be fetched from blockchain if not provided
  tokenDecimals?: number; // Will be fetched from blockchain if not provided
  skipCondition?: boolean | (() => boolean) | (() => Promise<boolean>); // Condition pour ignorer la transaction
  notifications?: TransactionNotifications; // Notifications optionnelles
}

// Signature CoinBridge permit spécialisée
export interface SignMessageCoinBridgeTransactionData {
  type: "signMessage-coinBridge";
  owner: `0x${string}`;
  spender: `0x${string}`;
  amount: string;
  deadline: number;
  contractAddress: `0x${string}`;
  noncesFunctionName?: "nonces" | "_nonces";
  signatureKey: string; // Clé pour stocker dans le contexte (obligatoire)
  tokenSymbol?: string; // Will be fetched from blockchain if not provided
  tokenDecimals?: number; // Will be fetched from blockchain if not provided
  skipCondition?: boolean | (() => boolean) | (() => Promise<boolean>); // Condition pour ignorer la transaction
  notifications?: TransactionNotifications; // Notifications optionnelles
}

// Signature générique (pour rétrocompatibilité)
export interface SignMessageTransactionData {
  type: "signMessage";
  message: string | object; // Message à signer (EIP-712, etc.)
  signatureKey?: string; // Clé pour stocker la signature dans le contexte
  skipCondition?: boolean | (() => boolean) | (() => Promise<boolean>); // Condition pour ignorer la transaction
  notifications?: TransactionNotifications; // Notifications optionnelles
}

// Transaction d'approbation ERC20
export interface ApproveTransactionData {
  type: "erc20-approve";
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
  amount: string; // Amount in wei/smallest unit
  tokenSymbol?: string; // Will be fetched from blockchain if not provided
  tokenDecimals?: number; // Will be fetched from blockchain if not provided
  skipCondition?: boolean | (() => boolean) | (() => Promise<boolean>); // Condition pour ignorer la transaction
  notifications?: TransactionNotifications; // Notifications optionnelles
}

// Transaction de transfert ERC20
export interface Erc20TransferTransactionData {
  type: "erc20-transfer";
  tokenAddress: `0x${string}`;
  recipientAddress: `0x${string}`;
  amount: string; // Amount in wei/smallest unit
  tokenSymbol?: string; // Will be fetched from blockchain if not provided
  tokenDecimals?: number; // Will be fetched from blockchain if not provided
  skipCondition?: boolean | (() => boolean) | (() => Promise<boolean>); // Condition pour ignorer la transaction
  notifications?: TransactionNotifications; // Notifications optionnelles
}

// Union des types de transactions de base (sans contexte)
export type BaseTransaction =
  | OnChainTransactionData
  | NativeTransactionData
  | ApproveTransactionData
  | Erc20TransferTransactionData
  | SignMessageErc20TransactionData
  | SignMessageCoinBridgeTransactionData
  | SignMessageTransactionData;

// Transaction avec préparation dynamique (utilise le contexte typé)
export interface DynamicTransaction<T = BaseTransactionContext> {
  prepareTransaction: (
    context: TransactionContext<T>
  ) => Promise<BaseTransaction>;
  skipCondition?:
    | boolean
    | (() => boolean)
    | (() => Promise<boolean>)
    | ((params: { context: TransactionContext<T> }) => boolean)
    | ((params: { context: TransactionContext<T> }) => Promise<boolean>); // Condition pour ignorer la transaction
  notifications?: TransactionNotifications;
}

// Union générique des types de transactions (statiques + dynamiques)
export type Transaction<T = BaseTransactionContext> =
  | BaseTransaction
  | DynamicTransaction<T>;

// Type pour une notification individuelle
export interface NotificationConfig {
  title?: React.ReactNode;
  message?: React.ReactNode;
}

// Type pour les notifications personnalisées
export interface TransactionNotifications {
  id?: string;
  onSent?: NotificationConfig;
  onWaitingBlockchain?: NotificationConfig;
  onComplete?: NotificationConfig;
  onFail?: NotificationConfig;
}
