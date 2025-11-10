import React from "react";
import { Button, Stack, Text, Progress, Alert, Code } from "@mantine/core";
import { useSendTransactions, Transaction } from "@real-token/web3";
import { IconInfoCircle } from "@tabler/icons-react";
import { encodeFunctionData } from "viem";

export function UseSendTransactionsWithContextExample() {
  const {
    isPending,
    isError,
    isSuccess,
    currentTransactionIndex,
    totalTransactions,
    sendTransactions,
    sendTransactionsAsync,
  } = useSendTransactions({
    initialContext: {
      userAddress: "0x1234567890123456789012345678901234567890",
      tokenAddress: "0x0987654321098765432109876543210987654321",
    },
    onStart: (context) => {
      console.log("🚀 Début du batch avec contexte:", context);
    },
    onTransactionComplete: (index, transaction, result, context) => {
      console.log(`✅ TX ${index + 1} réussie:`, result);
      console.log("Contexte mis à jour:", context);
    },
    onAllComplete: (results, finalContext) => {
      console.log("🏁 Toutes les transactions terminées");
      console.log("Résultats finaux:", results);
      console.log("Contexte final:", finalContext);
    },
  });

  // Exemple avec permit + transaction utilisant le permit
  const permitAndTransferTransactions: Transaction[] = [
    {
      // TX 1: Signature de permit (off-chain)
      txDatas: {
        type: "signMessage",
        message: {
          domain: {
            name: "MyToken",
            version: "1",
            chainId: 1,
            verifyingContract: "0x0987654321098765432109876543210987654321",
          },
          types: {
            Permit: [
              { name: "owner", type: "address" },
              { name: "spender", type: "address" },
              { name: "value", type: "uint256" },
              { name: "nonce", type: "uint256" },
              { name: "deadline", type: "uint256" },
            ],
          },
          primaryType: "Permit",
          message: {
            owner: "0x1234567890123456789012345678901234567890",
            spender: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
            value: "1000000000000000000000", // 1000 tokens
            nonce: 0,
            deadline: Math.floor(Date.now() / 1000) + 3600, // 1 heure
          },
        },
        signatureKey: "permitSignature",
      },
      onResult: async (result, context) => {
        if (result.success && result.contextData?.signature) {
          // Stocker les données du permit dans le contexte
          context.permitSignature = result.contextData.signature;
          context.permitDeadline = Math.floor(Date.now() / 1000) + 3600;
          context.permitValue = "1000000000000000000000";
          console.log("Permit signé, signature stockée dans le contexte");
        }
      },
      notifications: {
        id: "permit-signature",
        onSent: {
          title: "Signature Permit",
          message: "Veuillez signer le permit dans votre wallet...",
        },
        onComplete: {
          title: "Permit Signé",
          message: "Permit signé avec succès !",
        },
        onFail: {
          title: "Signature Échouée",
          message: "La signature du permit a échoué",
        },
      },
    },
    {
      // TX 2: Transaction utilisant le permit
      prepareTransaction: async (context) => {
        // Utiliser les données du contexte pour préparer la transaction
        const {
          permitSignature,
          permitDeadline,
          permitValue,
          userAddress,
          tokenAddress,
        } = context;

        if (!permitSignature) {
          throw new Error("Permit signature not found in context");
        }

        // Encoder l'appel à transferWithPermit
        const data = encodeFunctionData({
          abi: [
            {
              name: "transferWithPermit",
              type: "function",
              inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "deadline", type: "uint256" },
                { name: "v", type: "uint8" },
                { name: "r", type: "bytes32" },
                { name: "s", type: "bytes32" },
              ],
              outputs: [],
            },
          ],
          functionName: "transferWithPermit",
          args: [
            "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef", // to
            permitValue, // value
            permitDeadline, // deadline
            27, // v (exemple)
            "0x1234567890123456789012345678901234567890123456789012345678901234", // r (exemple)
            "0x1234567890123456789012345678901234567890123456789012345678901234", // s (exemple)
          ],
        });

        return {
          type: "onchain" as const,
          to: tokenAddress,
          data,
        };
      },
      skipCondition: async ({ context }) => {
        // Skip si pas de signature de permit
        if (!context.permitSignature) {
          console.log("Skip car pas de signature de permit");
          return true;
        }
        return false;
      },
      notifications: {
        id: "transfer-with-permit",
        onSent: {
          title: "Transfer avec Permit",
          message: "Exécution du transfer avec permit...",
        },
        onComplete: {
          title: "Transfer Réussi",
          message: "Transfer avec permit exécuté avec succès !",
        },
        onFail: {
          title: "Transfer Échoué",
          message: "Le transfer avec permit a échoué",
        },
      },
    },
  ];

  // Exemple avec plusieurs signatures
  const multipleSignaturesTransactions: Transaction[] = [
    {
      // Signature simple
      txDatas: {
        type: "signMessage",
        message: "Hello, this is a simple message to sign!",
        signatureKey: "simpleSignature",
      },
      onResult: async (result, context) => {
        if (result.success) {
          context.simpleMessageSigned = true;
          console.log("Message simple signé");
        }
      },
      notifications: {
        onSent: {
          title: "Signature Simple",
          message: "Signature d'un message simple...",
        },
        onComplete: {
          title: "Message Signé",
          message: "Message simple signé !",
        },
      },
    },
    {
      // Signature EIP-712
      txDatas: {
        type: "signMessage",
        message: {
          domain: { name: "MyApp", version: "1", chainId: 1 },
          types: {
            Message: [
              { name: "content", type: "string" },
              { name: "timestamp", type: "uint256" },
            ],
          },
          primaryType: "Message",
          message: {
            content: "This is an EIP-712 message",
            timestamp: Math.floor(Date.now() / 1000),
          },
        },
        signatureKey: "eip712Signature",
      },
      skipCondition: async ({ context }) => {
        // Skip si la signature simple n'a pas été faite
        return !context.simpleMessageSigned;
      },
      notifications: {
        onSent: { title: "Signature EIP-712", message: "Signature EIP-712..." },
        onComplete: {
          title: "EIP-712 Signé",
          message: "Message EIP-712 signé !",
        },
      },
    },
  ];

  const handlePermitAndTransfer = () => {
    sendTransactions(permitAndTransferTransactions);
  };

  const handleMultipleSignatures = () => {
    sendTransactions(multipleSignaturesTransactions);
  };

  const handlePermitAndTransferAsync = async () => {
    try {
      const result = await sendTransactionsAsync(permitAndTransferTransactions);
      console.log("Résultat async:", result);
    } catch (error) {
      console.error("Erreur async:", error);
    }
  };

  const progress =
    totalTransactions > 0
      ? (currentTransactionIndex / totalTransactions) * 100
      : 0;

  return (
    <Stack
      spacing="md"
      style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}
    >
      <Text size="xl" weight={700}>
        Exemple useSendTransactions avec Contexte
      </Text>

      <Alert icon={<IconInfoCircle size={16} />} title="Nouveau !" color="blue">
        Ce hook supporte maintenant :
        <ul style={{ margin: "8px 0", paddingLeft: 20 }}>
          <li>
            <strong>Contexte partagé</strong> : Les données passent entre
            transactions
          </li>
          <li>
            <strong>Signatures off-chain</strong> : Support EIP-712 et messages
            simples
          </li>
          <li>
            <strong>Préparation dynamique</strong> : Les TX peuvent être
            construites avec le contexte
          </li>
          <li>
            <strong>Types différenciés</strong> : "onchain" et "signMessage"
          </li>
        </ul>
      </Alert>

      {isPending && (
        <Stack spacing="xs">
          <Text size="sm">
            Transaction {currentTransactionIndex} sur {totalTransactions}
          </Text>
          <Progress value={progress} size="lg" />
        </Stack>
      )}

      {isSuccess && (
        <Alert color="green" title="Succès">
          Toutes les transactions ont été traitées avec succès !
        </Alert>
      )}

      {isError && (
        <Alert color="red" title="Erreur">
          Une ou plusieurs transactions ont échoué. Consultez la console pour
          plus de détails.
        </Alert>
      )}

      <Stack spacing="sm">
        <Text size="md" weight={600}>
          Exemple 1: Permit + Transfer
        </Text>
        <Text size="sm" color="dimmed">
          1. Signe un permit EIP-712 (off-chain) 2. Utilise le permit pour faire
          un transfer (on-chain)
        </Text>

        <Stack spacing="xs">
          <Button
            onClick={handlePermitAndTransfer}
            loading={isPending}
            disabled={isPending}
            size="sm"
          >
            Permit + Transfer (sync)
          </Button>

          <Button
            onClick={handlePermitAndTransferAsync}
            loading={isPending}
            disabled={isPending}
            variant="outline"
            size="sm"
          >
            Permit + Transfer (async)
          </Button>
        </Stack>
      </Stack>

      <Stack spacing="sm">
        <Text size="md" weight={600}>
          Exemple 2: Signatures Multiples
        </Text>
        <Text size="sm" color="dimmed">
          1. Signature d'un message simple 2. Signature EIP-712 (conditionnelle
          à la première)
        </Text>

        <Button
          onClick={handleMultipleSignatures}
          loading={isPending}
          disabled={isPending}
          size="sm"
          color="teal"
        >
          Signatures Multiples
        </Button>
      </Stack>

      <Stack spacing="xs">
        <Text size="sm" weight={600}>
          Fonctionnalités démontrées :
        </Text>
        <Code block>
          {`// Contexte initial
initialContext: {
  userAddress: "0x...",
  tokenAddress: "0x..."
}

// Transaction de signature
{
  txDatas: {
    type: "signMessage",
    message: { /* EIP-712 */ },
    signatureKey: "permitSignature"
  },
  onResult: async (result, context) => {
    context.permitSignature = result.signature;
  }
}

// Transaction préparée dynamiquement
{
  prepareTransaction: async (context) => {
    return {
      type: "onchain",
      to: context.tokenAddress,
      data: encodeFunctionData({
        // Utilise context.permitSignature
      })
    };
  }
}`}
        </Code>
      </Stack>
    </Stack>
  );
}
