import React from "react";
import { Button, Stack, Text, Progress, Alert } from "@mantine/core";
import { useSendTransactions, Transaction } from "@real-token/web3";
import { IconInfoCircle } from "@tabler/icons-react";

export function UseSendTransactionsExample() {
  const {
    isPending,
    isError,
    isSuccess,
    currentTransactionIndex,
    totalTransactions,
    sendTransactions,
    sendTransactionsAsync,
  } = useSendTransactions({
    onStart: () => {
      console.log("🚀 Début du batch de transactions");
    },
    onTransactionSent: (index, transaction) => {
      console.log(`📤 Transaction ${index + 1} envoyée:`, transaction);
    },
    onTransactionComplete: (index, transaction, txHash) => {
      console.log(`✅ Transaction ${index + 1} réussie:`, txHash);
    },
    onTransactionSkipped: (index, transaction) => {
      console.log(`⏭️ Transaction ${index + 1} ignorée:`, transaction);
    },
    onTransactionFailed: (index, transaction, error) => {
      console.log(`❌ Transaction ${index + 1} échouée:`, error);
    },
    onAllComplete: (results) => {
      console.log("🏁 Toutes les transactions terminées:", results);
    },
    onError: (error) => {
      console.error("💥 Erreur générale:", error);
    },
  });

  // Exemple de transactions
  const exampleTransactions: Transaction[] = [
    {
      txDatas: {
        to: "0x1234567890123456789012345678901234567890",
        data: "0x",
        value: BigInt(1000000000000000000), // 1 ETH
      },
      // TX 1 : Pas de skipCondition, sera toujours exécutée
      notifications: {
        id: "tx-1",
        onSent: {
          title: "Envoi ETH",
          message: "Envoi de 1 ETH en cours...",
        },
        onComplete: {
          title: "ETH Envoyé",
          message: "1 ETH envoyé avec succès !",
        },
        onFail: {
          title: "Erreur ETH",
          message: "Échec de l'envoi de 1 ETH",
        },
      },
    },
    {
      txDatas: {
        to: "0x0987654321098765432109876543210987654321",
        data: "0xa9059cbb000000000000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcdef0000000000000000000000000000000000000000000000000de0b6b3a7640000", // transfer(address,uint256)
      },
      // TX 2 : skipCondition spécifique pour cette transaction
      skipCondition: async ({ publicClient, previousResults }) => {
        // Skip si c'est un weekend (condition spécifique à cette TX)
        const now = new Date();
        const isWeekend = now.getDay() === 0 || now.getDay() === 6;

        if (isWeekend) {
          console.log("TX 2 - Skip car c'est le weekend");
          return true;
        }

        // Vérifier le balance de tokens avant le transfer
        if (publicClient) {
          try {
            const balance = await publicClient.readContract({
              address: "0x0987654321098765432109876543210987654321",
              abi: [
                {
                  name: "balanceOf",
                  type: "function",
                  stateMutability: "view",
                  inputs: [{ name: "account", type: "address" }],
                  outputs: [{ name: "", type: "uint256" }],
                },
              ],
              functionName: "balanceOf",
              args: ["0x1234567890123456789012345678901234567890"],
            });

            if (balance < BigInt(1000000000000000000)) {
              console.log("TX 2 - Skip car balance insuffisant:", balance);
              return true;
            }
          } catch (error) {
            console.error(
              "TX 2 - Erreur lors de la vérification du balance:",
              error
            );
            return false; // Continuer en cas d'erreur
          }
        }

        return false;
      },
      notifications: {
        id: "tx-2",
        onSent: {
          title: "Transfer Tokens",
          message: "Transfer de tokens en cours...",
        },
        onComplete: {
          title: "Tokens Transférés",
          message: "Tokens transférés avec succès !",
        },
        onFail: {
          title: "Erreur Transfer",
          message: "Échec du transfer de tokens",
        },
      },
    },
    {
      txDatas: {
        to: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
        data: "0x095ea7b3000000000000000000000000123456789012345678901234567890123456789000000000000000000000000000000000000000000000000000000000000000000", // approve(address,uint256)
      },
      failIfFail: false, // Continue même si cette transaction échoue
      // TX 3 : skipCondition différente basée sur les résultats précédents
      skipCondition: async ({ previousResults, transactionIndex }) => {
        console.log(
          `TX 3 - Vérification des résultats précédents:`,
          previousResults
        );

        // Skip si la première transaction (ETH) a échoué
        if (previousResults.length > 0 && !previousResults[0].success) {
          console.log("TX 3 - Skip car l'envoi ETH a échoué");
          return true;
        }

        // Skip si on est après 18h (condition spécifique à l'approbation)
        const now = new Date();
        if (now.getHours() >= 18) {
          console.log("TX 3 - Skip car il est trop tard pour les approbations");
          return true;
        }

        return false;
      },
      notifications: {
        id: "tx-3",
        onSent: {
          title: "Approbation",
          message: "Approbation en cours...",
        },
        onComplete: {
          title: "Approuvé",
          message: "Approbation accordée !",
        },
        onFail: {
          title: "Approbation Échouée",
          message: "Échec de l'approbation (mais on continue)",
        },
      },
    },
  ];

  const handleSendTransactions = () => {
    sendTransactions(exampleTransactions);
  };

  const handleSendTransactionsAsync = async () => {
    try {
      const result = await sendTransactionsAsync(exampleTransactions);
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
      style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}
    >
      <Text size="xl" weight={700}>
        Exemple useSendTransactions
      </Text>

      <Alert
        icon={<IconInfoCircle size={16} />}
        title="Information"
        color="blue"
      >
        Ce hook permet d'envoyer plusieurs transactions en séquence avec des
        conditions de skip, des notifications personnalisées et une gestion
        d'erreur flexible.
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
        <Button
          onClick={handleSendTransactions}
          loading={isPending}
          disabled={isPending}
          size="md"
        >
          Envoyer les transactions (sync)
        </Button>

        <Button
          onClick={handleSendTransactionsAsync}
          loading={isPending}
          disabled={isPending}
          variant="outline"
          size="md"
        >
          Envoyer les transactions (async)
        </Button>
      </Stack>

      <Stack spacing="xs">
        <Text size="sm" weight={600}>
          Détails des transactions d'exemple :
        </Text>
        <Text size="xs" color="dimmed">
          1. Envoi de 1 ETH (pas de skipCondition - toujours exécutée)
        </Text>
        <Text size="xs" color="dimmed">
          2. Transfer de tokens (skip si weekend OU balance insuffisant)
        </Text>
        <Text size="xs" color="dimmed">
          3. Approbation (skip si TX1 échouée OU après 18h, failIfFail: false)
        </Text>
        <Text
          size="xs"
          color="dimmed"
          style={{ marginTop: 8, fontStyle: "italic" }}
        >
          Chaque transaction a sa propre skipCondition personnalisée !
        </Text>
      </Stack>
    </Stack>
  );
}
