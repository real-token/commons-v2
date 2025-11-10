import React from "react";
import { Button, Stack, Text, Alert, Code } from "@mantine/core";
import { useSendTransactions, Transaction } from "@real-token/web3";
import { IconInfoCircle } from "@tabler/icons-react";
import { encodeFunctionData } from "viem";

// 🎯 Définir le type du contexte pour notre cas d'usage
interface PermitTransferContext {
  // Données initiales
  userAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;

  // Données ajoutées par la signature de permit
  permitSignature?: `0x${string}`;
  permitDeadline?: number;
  permitNonce?: number;
  permitValue?: string;

  // Données ajoutées par d'autres transactions
  transferTxHash?: string;
  approvalAmount?: string;
}

export function TypedContextExample() {
  // 🚀 Hook avec contexte typé
  const { isPending, isError, isSuccess, sendTransactions } =
    useSendTransactions<PermitTransferContext>({
      initialContext: {
        userAddress: "0x1234567890123456789012345678901234567890",
        tokenAddress: "0x0987654321098765432109876543210987654321",
        spenderAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      },
      onTransactionComplete: (index, transaction, result, context) => {
        console.log(`TX ${index + 1} terminée`);
        // ✅ TypeScript connaît les propriétés du contexte !
        console.log("User address:", context.userAddress);
        console.log("Permit signature:", context.permitSignature);
        console.log("Transfer hash:", context.transferTxHash);
      },
      onAllComplete: (results, finalContext) => {
        // ✅ Contexte final typé
        console.log("Contexte final typé:", finalContext);
        if (finalContext.permitSignature && finalContext.transferTxHash) {
          console.log("✅ Permit et transfer réussis !");
        }
      },
    });

  // 🎯 Transactions avec contexte typé
  const typedTransactions: Transaction<PermitTransferContext>[] = [
    {
      // TX 1: Signature de permit
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
            value: "1000000000000000000000",
            nonce: 0,
            deadline: Math.floor(Date.now() / 1000) + 3600,
          },
        },
        signatureKey: "permitSignature",
      },
      onResult: async (result, context) => {
        if (result.success && result.contextData?.signature) {
          // ✅ TypeScript sait que context est de type PermitTransferContext
          context.permitSignature = result.contextData
            .signature as `0x${string}`;
          context.permitDeadline = Math.floor(Date.now() / 1000) + 3600;
          context.permitNonce = 0;
          context.permitValue = "1000000000000000000000";

          console.log("✅ Permit signé et stocké dans le contexte typé");
        }
      },
      notifications: {
        onSent: {
          title: "Signature Permit",
          message: "Veuillez signer le permit dans votre wallet...",
        },
        onComplete: {
          title: "Permit Signé",
          message: "Permit signé avec succès !",
        },
      },
    },
    {
      // TX 2: Transfer utilisant le permit
      prepareTransaction: async (context) => {
        // ✅ TypeScript connaît toutes les propriétés du contexte
        const {
          permitSignature,
          permitDeadline,
          permitValue,
          tokenAddress,
          spenderAddress,
        } = context;

        if (!permitSignature || !permitDeadline || !permitValue) {
          throw new Error("Données de permit manquantes dans le contexte");
        }

        // Simuler la décomposition de la signature
        const signature = permitSignature.slice(2); // Remove 0x
        const r = `0x${signature.slice(0, 64)}` as `0x${string}`;
        const s = `0x${signature.slice(64, 128)}` as `0x${string}`;
        const v = parseInt(signature.slice(128, 130), 16);

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
          args: [spenderAddress, permitValue, permitDeadline, v, r, s],
        });

        return {
          type: "onchain" as const,
          to: tokenAddress,
          data,
        };
      },
      skipCondition: async ({ context }) => {
        // ✅ TypeScript connaît le type du contexte
        if (!context.permitSignature) {
          console.log("❌ Skip: Pas de signature de permit");
          return true;
        }
        return false;
      },
      onResult: async (result, context) => {
        if (result.success && result.txHash) {
          // ✅ Ajouter le hash de la transaction au contexte typé
          context.transferTxHash = result.txHash;
        }
      },
      notifications: {
        onSent: {
          title: "Transfer avec Permit",
          message: "Exécution du transfer avec permit...",
        },
        onComplete: {
          title: "Transfer Réussi",
          message: "Transfer avec permit exécuté avec succès !",
        },
      },
    },
  ];

  const handleTypedTransactions = () => {
    sendTransactions(typedTransactions);
  };

  return (
    <Stack
      spacing="md"
      style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}
    >
      <Text size="xl" weight={700}>
        Exemple avec Contexte Typé
      </Text>

      <Alert
        icon={<IconInfoCircle size={16} />}
        title="TypeScript !"
        color="green"
      >
        Le contexte est maintenant <strong>fortement typé</strong> avec
        TypeScript !
      </Alert>

      <Code block>
        {`// 🎯 Définir le type du contexte
interface PermitTransferContext {
  userAddress: \`0x\${string}\`;
  tokenAddress: \`0x\${string}\`;
  spenderAddress: \`0x\${string}\`;
  
  // Ajoutées dynamiquement
  permitSignature?: \`0x\${string}\`;
  permitDeadline?: number;
  transferTxHash?: string;
}

// 🚀 Hook avec contexte typé
const { sendTransactions } = useSendTransactions<PermitTransferContext>({
  initialContext: {
    userAddress: "0x...",
    tokenAddress: "0x...",
    spenderAddress: "0x...",
  },
  onTransactionComplete: (index, transaction, result, context) => {
    // ✅ TypeScript connaît les propriétés !
    console.log(context.userAddress); // ✅ Typé
    console.log(context.permitSignature); // ✅ Typé (optionnel)
  }
});`}
      </Code>

      <Stack spacing="sm">
        <Text size="md" weight={600}>
          Avantages du Typage Fort :
        </Text>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>
            ✅ <strong>Autocomplétion</strong> : IDE suggère les propriétés
          </li>
          <li>
            ✅ <strong>Vérification</strong> : Erreurs TypeScript si propriété
            manquante
          </li>
          <li>
            ✅ <strong>Refactoring</strong> : Renommage sécurisé
          </li>
          <li>
            ✅ <strong>Documentation</strong> : Le type documente la structure
          </li>
        </ul>
      </Stack>

      <Button
        onClick={handleTypedTransactions}
        loading={isPending}
        disabled={isPending}
        size="md"
        color="green"
      >
        Tester le Contexte Typé
      </Button>

      {isSuccess && (
        <Alert color="green" title="Succès">
          Transactions avec contexte typé terminées ! Vérifiez la console.
        </Alert>
      )}

      {isError && (
        <Alert color="red" title="Erreur">
          Une erreur s'est produite. Vérifiez la console.
        </Alert>
      )}
    </Stack>
  );
}
