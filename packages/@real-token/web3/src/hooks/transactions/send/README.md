# Transaction Hooks

Ce dossier contient les hooks pour gérer les transactions avec un système unifié de types de transactions.

## Architecture

### Types de transactions supportés

- **`onchain`** : Transaction classique on-chain avec `to`, `data`, et `value`
- **`native`** : Transaction d'envoi de jetons natifs (ETH, MATIC, etc.) avec `to`, `value`, et `data` optionnel
- **`signMessage-erc20`** : Signature ERC20 permit avec gestion automatique des nonces
- **`signMessage-coinBridge`** : Signature CoinBridge permit spécialisée
- **`signMessage`** : Signature générique pour messages ou EIP-712

### Hooks disponibles

#### `useSendTransaction`

Hook pour envoyer une seule transaction avec support des notifications personnalisées.

```typescript
import { useSendTransaction } from "@real-token/web3";
import { parseEther } from "viem";

const {
  sendTransaction,
  sendTransactionData,
  sendNativeTransaction,
  isPending,
} = useSendTransaction({
  onSuccess: (result) => console.log("Transaction réussie:", result),
  onError: (error) => console.error("Erreur:", error),
});

// Méthode classique avec ABI
sendTransaction({
  abi: contractAbi,
  functionName: "transfer",
  args: [to, amount],
  to: contractAddress,
  notifications: {
    onSent: { message: "Transaction en cours..." },
    onComplete: { message: "Transfer réussi!" },
    onFail: { message: "Transfer échoué" },
  },
});

// Envoi de jetons natifs (ETH, MATIC, etc.)
sendNativeTransaction({
  to: "0x...",
  value: parseEther("1.5"), // 1.5 ETH
  notifications: {
    onSent: { message: "Envoi en cours..." },
    onComplete: { message: "ETH envoyé avec succès!" },
    onFail: { message: "Échec de l'envoi" },
  },
});

// Méthode directe avec TransactionData
sendTransactionData(
  {
    type: "native",
    to: "0x...",
    value: parseEther("0.1"),
    data: "0x", // Optionnel pour les transactions natives
  },
  {
    onSent: { message: "Transaction native en cours..." },
    onComplete: { message: "Transaction réussie!" },
  }
);

// Signature ERC20 permit
sendTransactionData(
  {
    type: "signMessage-erc20",
    owner: "0x...",
    spender: "0x...",
    amount: "1000000",
    deadline: Math.floor(Date.now() / 1000) + 3600,
    contractAddress: "0x...",
    signatureKey: "permitSignature",
  },
  {
    onSent: { message: "Signature en cours..." },
    onComplete: { message: "Signature réussie!" },
  }
);
```

#### `useSendTransactions`

Hook pour envoyer plusieurs transactions en séquence avec contexte partagé.

```typescript
import { useSendTransactions } from "@real-token/web3";

interface MyContext {
  permitSignature?: {
    signature: string;
    r: string;
    s: string;
    v: number;
  };
  transactionDeadline?: number;
}

const { sendTransactions, isPending, currentTransactionIndex } =
  useSendTransactions<MyContext>({
    initialContext: {},
    onTransactionComplete: (index, transaction, result, context) => {
      console.log(`Transaction ${index + 1} terminée:`, result);
    },
  });

// Exemple : Permit + Transfer
sendTransactions([
  // 1. Signer le permit
  {
    txDatas: {
      type: "signMessage-erc20",
      owner: userAddress,
      spender: contractAddress,
      amount: "1000000",
      deadline: Math.floor(Date.now() / 1000) + 3600,
      contractAddress: tokenAddress,
      signatureKey: "permitSignature", // Stocké dans le contexte
    },
    notifications: {
      onSent: { message: "Signature du permit..." },
      onComplete: { message: "Permit signé!" },
    },
  },
  // 2. Utiliser le permit pour le transfer
  {
    prepareTransaction: async (context) => ({
      type: "onchain",
      to: contractAddress,
      data: encodeFunctionData({
        abi: contractAbi,
        functionName: "transferWithPermit",
        args: [
          context.permitSignature?.signature,
          context.transactionDeadline,
          // ... autres args
        ],
      }),
    }),
    notifications: {
      onSent: { message: "Transfer en cours..." },
      onComplete: { message: "Transfer réussi!" },
    },
  },
]);

// Exemple : Envoi de jetons natifs + Transaction contract
sendTransactions([
  // 1. Envoyer des ETH
  {
    txDatas: {
      type: "native",
      to: recipientAddress,
      value: parseEther("0.5"),
    },
    notifications: {
      onSent: { message: "Envoi d'ETH en cours..." },
      onComplete: { message: "0.5 ETH envoyé!" },
    },
  },
  // 2. Appeler un contrat
  {
    txDatas: {
      type: "onchain",
      to: contractAddress,
      data: encodeFunctionData({
        abi: contractAbi,
        functionName: "someFunction",
        args: [],
      }),
      value: parseEther("0.1"), // Envoyer aussi des ETH au contrat
    },
    notifications: {
      onSent: { message: "Appel du contrat..." },
      onComplete: { message: "Contrat appelé avec succès!" },
    },
  },
]);
```

### Transactions dynamiques

Les transactions peuvent être préparées dynamiquement en utilisant le contexte :

```typescript
{
  prepareTransaction: async (context) => {
    // Accès aux résultats des transactions précédentes
    const signature = context.permitSignature;

    return {
      type: 'onchain',
      to: contractAddress,
      data: encodeFunctionData({
        abi: contractAbi,
        functionName: 'someFunction',
        args: [signature?.signature, signature?.v, signature?.r, signature?.s],
      }),
    };
  },
}
```

### Skip conditions

Vous pouvez conditionner l'exécution d'une transaction :

```typescript
{
  txDatas: { /* ... */ },
  skipCondition: async ({ publicClient, context, previousResults }) => {
    // Vérifier une condition on-chain
    const balance = await publicClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    });

    return balance < parseEther('1'); // Skip si balance insuffisante
  },
}
```

### Gestion des erreurs

```typescript
{
  txDatas: { /* ... */ },
  failIfFail: false, // Continue même si cette transaction échoue
  onResult: async (result, context) => {
    if (result.success) {
      // Traitement en cas de succès
    } else {
      // Traitement en cas d'échec
      console.error('Transaction échouée:', result.error);
    }
  },
}
```

## Migration depuis l'ancien système

### Avant

```typescript
const { sendTransaction } = useSendTransaction({
  onSuccess: (data) => console.log(data.txHash),
});

sendTransaction({
  abi,
  functionName: "transfer",
  args: [to, amount],
  to: contractAddress,
});
```

### Après

```typescript
const { sendTransaction } = useSendTransaction({
  onSuccess: (result) => console.log(result.txHash),
});

sendTransaction({
  abi,
  functionName: "transfer",
  args: [to, amount],
  to: contractAddress,
  notifications: {
    // Nouveau : notifications optionnelles
    onComplete: { message: "Transfer réussi!" },
  },
});
```

Le système est rétrocompatible, seules les notifications sont nouvelles et optionnelles.
