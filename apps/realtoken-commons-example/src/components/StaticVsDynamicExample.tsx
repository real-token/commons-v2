import React from "react";
import { Stack, Text, Button, Alert, Group, Code } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSendTransactions } from "@real-token/web3";
import { encodeFunctionData } from "viem";

// Interface pour le contexte de cet exemple
interface ApprovalContext {
  userAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;

  // Données ajoutées dynamiquement
  currentAllowance?: bigint;
  approvalTxHash?: string;
}

export function StaticVsDynamicExample() {
  const { isPending, isError, isSuccess, sendTransactions } =
    useSendTransactions<ApprovalContext>({
      initialContext: {
        userAddress: "0x1234567890123456789012345678901234567890",
        tokenAddress: "0x0987654321098765432109876543210987654321",
        spenderAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      },
      onTransactionComplete: (index, transaction, result, context) => {
        console.log(`TX ${index + 1} terminée`);
        console.log("Contexte:", context);
      },
    });

  const handleStaticTransactions = () => {
    // ✅ Transactions STATIQUES - données connues à l'avance
    sendTransactions([
      {
        // Transaction statique simple
        txDatas: {
          type: "signMessage",
          message: "Signature statique simple",
        },
        notifications: {
          id: "static-sign",
          onSent: {
            title: "Signature en cours",
            message: "Signature du message statique...",
          },
          onComplete: {
            title: "Signature réussie",
            message: "Message signé avec succès",
          },
          onFail: {
            title: "Erreur de signature",
            message: "La signature a échoué",
          },
        },
      },
      {
        // Transaction on-chain statique
        txDatas: {
          type: "onchain",
          to: "0x0987654321098765432109876543210987654321",
          data: encodeFunctionData({
            abi: [
              {
                name: "approve",
                type: "function",
                inputs: [
                  { name: "spender", type: "address" },
                  { name: "amount", type: "uint256" },
                ],
                outputs: [{ name: "", type: "bool" }],
              },
            ],
            functionName: "approve",
            args: [
              "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
              BigInt("1000000000000000000"), // 1 token
            ],
          }),
        },
        notifications: {
          id: "static-approve",
          onSent: {
            title: "Approbation en cours",
            message: "Approbation statique de 1 token...",
          },
          onComplete: {
            title: "Approbation réussie",
            message: "Token approuvé avec succès",
          },
          onFail: {
            title: "Erreur d'approbation",
            message: "L'approbation a échoué",
          },
        },
      },
    ]);
  };

  const handleDynamicTransactions = () => {
    // ✅ Transactions DYNAMIQUES - données calculées avec le contexte
    sendTransactions([
      {
        // Transaction dynamique qui lit l'allowance actuelle
        prepareTransaction: async (context) => {
          // Simuler un appel pour lire l'allowance actuelle
          console.log("Lecture de l'allowance pour:", context.userAddress);

          // Dans un vrai cas, on ferait :
          // const allowance = await publicClient.readContract({...});
          const currentAllowance = BigInt("500000000000000000"); // 0.5 token

          // Stocker dans le contexte pour la prochaine transaction
          context.currentAllowance = currentAllowance;

          return {
            type: "signMessage",
            message: `Allowance actuelle: ${currentAllowance.toString()}`,
          };
        },
        notifications: {
          id: "dynamic-check",
          onSent: {
            title: "Vérification en cours",
            message: "Lecture de l'allowance actuelle...",
          },
          onComplete: {
            title: "Vérification réussie",
            message: "Allowance lue avec succès",
          },
          onFail: {
            title: "Erreur de vérification",
            message: "Impossible de lire l'allowance",
          },
        },
      },
      {
        // Transaction dynamique qui utilise l'allowance du contexte
        prepareTransaction: async (context) => {
          const { currentAllowance, tokenAddress, spenderAddress } = context;

          if (!currentAllowance) {
            throw new Error("Allowance non disponible dans le contexte");
          }

          // Calculer le nouveau montant (allowance actuelle + 2 tokens)
          const additionalAmount = BigInt("2000000000000000000"); // 2 tokens
          const newAllowance = currentAllowance + additionalAmount;

          console.log(
            `Nouvelle allowance calculée: ${newAllowance.toString()}`
          );

          return {
            type: "onchain",
            to: tokenAddress,
            data: encodeFunctionData({
              abi: [
                {
                  name: "approve",
                  type: "function",
                  inputs: [
                    { name: "spender", type: "address" },
                    { name: "amount", type: "uint256" },
                  ],
                  outputs: [{ name: "", type: "bool" }],
                },
              ],
              functionName: "approve",
              args: [spenderAddress, newAllowance],
            }),
          };
        },
        notifications: {
          id: "dynamic-approve",
          onSent: {
            title: "Approbation dynamique en cours",
            message: "Approbation avec montant calculé...",
          },
          onComplete: {
            title: "Approbation dynamique réussie",
            message: "Allowance mise à jour avec succès",
          },
          onFail: {
            title: "Erreur d'approbation dynamique",
            message: "L'approbation dynamique a échoué",
          },
        },
        onResult: async (result, context) => {
          if (result.success) {
            context.approvalTxHash = result.txHash;
            console.log("Hash de l'approbation stocké:", result.txHash);
          }
        },
      },
    ]);
  };

  return (
    <Stack
      spacing="md"
      style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}
    >
      <Text size="xl" weight={700}>
        Transactions Statiques vs Dynamiques
      </Text>

      <Alert
        icon={<IconInfoCircle size={16} />}
        title="Deux Approches !"
        color="blue"
      >
        Vous pouvez maintenant utiliser <strong>soit</strong>{" "}
        <Code>txDatas</Code> <strong>soit</strong>{" "}
        <Code>prepareTransaction</Code> selon vos besoins !
      </Alert>

      <Stack spacing="xs">
        <Text size="md" weight={600}>
          📋 Comparaison des Approches
        </Text>
        <Stack spacing="xs" style={{ fontSize: "14px" }}>
          <div>
            <strong>🔹 Transactions Statiques (txDatas)</strong>
            <ul style={{ margin: "5px 0", paddingLeft: 20 }}>
              <li>✅ Données connues à l'avance</li>
              <li>✅ Simple et direct</li>
              <li>✅ Pas de logique complexe</li>
              <li>✅ Rétrocompatible</li>
            </ul>
          </div>
          <div>
            <strong>🔹 Transactions Dynamiques (prepareTransaction)</strong>
            <ul style={{ margin: "5px 0", paddingLeft: 20 }}>
              <li>✅ Données calculées avec le contexte</li>
              <li>✅ Appels on-chain pour préparer</li>
              <li>✅ Logique conditionnelle</li>
              <li>✅ Partage de données entre TX</li>
            </ul>
          </div>
        </Stack>
      </Stack>

      <Group grow>
        <Button
          onClick={handleStaticTransactions}
          disabled={isPending}
          variant="outline"
          color="green"
        >
          🔹 Transactions Statiques
        </Button>
        <Button
          onClick={handleDynamicTransactions}
          disabled={isPending}
          variant="outline"
          color="blue"
        >
          🔹 Transactions Dynamiques
        </Button>
      </Group>

      {isPending && (
        <Alert color="blue">
          <Text>Traitement des transactions en cours...</Text>
        </Alert>
      )}

      {isSuccess && (
        <Alert color="green">
          <Text>✅ Toutes les transactions ont été traitées avec succès !</Text>
        </Alert>
      )}

      {isError && (
        <Alert color="red">
          <Text>❌ Une erreur s'est produite lors du traitement.</Text>
        </Alert>
      )}
    </Stack>
  );
}
