import React from "react";
import {
  Stack,
  Text,
  Button,
  Alert,
  Group,
  Code,
  Divider,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSendTransactions } from "@real-token/web3";
import { encodeFunctionData } from "viem";

// Interface pour le contexte des signatures permit
interface PermitSignatureContext {
  userAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
  amount: string;

  // Signatures permit ajoutées dynamiquement
  erc20PermitSignature?: {
    r: `0x${string}`;
    s: `0x${string}`;
    v: bigint | undefined;
  };
  coinBridgePermitSignature?: {
    r: `0x${string}`;
    s: `0x${string}`;
    v: bigint | undefined;
  };

  // Hash des transactions
  transferTxHash?: string;
}

export function PermitSignatureExample() {
  const { isPending, isError, isSuccess, sendTransactions } =
    useSendTransactions<PermitSignatureContext>({
      initialContext: {
        userAddress: "0x1234567890123456789012345678901234567890",
        tokenAddress: "0x0987654321098765432109876543210987654321",
        spenderAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
        amount: "1000000000000000000", // 1 token
      },
      onTransactionComplete: (index, transaction, result, context) => {
        console.log(`TX ${index + 1} terminée`);
        console.log("Contexte:", context);

        // Afficher les signatures permit si disponibles
        if (context.erc20PermitSignature) {
          console.log("ERC20 Permit Signature:", {
            r: context.erc20PermitSignature.r,
            s: context.erc20PermitSignature.s,
            v: context.erc20PermitSignature.v?.toString(),
          });
        }

        if (context.coinBridgePermitSignature) {
          console.log("CoinBridge Permit Signature:", {
            r: context.coinBridgePermitSignature.r,
            s: context.coinBridgePermitSignature.s,
            v: context.coinBridgePermitSignature.v?.toString(),
          });
        }
      },
    });

  const handleErc20PermitFlow = () => {
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 heure

    sendTransactions([
      {
        // TX1: Signature ERC20 permit
        txDatas: {
          type: "signMessage-erc20",
          owner: "0x1234567890123456789012345678901234567890",
          spender: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
          amount: "1000000000000000000",
          deadline,
          contractAddress: "0x0987654321098765432109876543210987654321",
          signatureKey: "erc20PermitSignature",
        },
        notifications: {
          id: "erc20-permit-sign",
          onSent: {
            title: "Signature ERC20 Permit",
            message: "Signature du permit ERC20 en cours...",
          },
          onComplete: {
            title: "Permit ERC20 signé",
            message: "Le permit ERC20 a été signé avec succès",
          },
          onFail: {
            title: "Erreur signature ERC20",
            message: "La signature du permit ERC20 a échoué",
          },
        },
        onResult: async (result, context) => {
          if (result.success && result.contextData?.signature) {
            context.erc20PermitSignature = result.contextData.signature;
            console.log("✅ ERC20 Permit signé et stocké dans le contexte");
          }
        },
      },
      {
        // TX2: Transaction utilisant le permit
        prepareTransaction: async (context) => {
          const { erc20PermitSignature, tokenAddress, spenderAddress, amount } =
            context;

          if (!erc20PermitSignature) {
            throw new Error("Signature ERC20 permit requise");
          }

          return {
            type: "onchain",
            to: tokenAddress,
            data: encodeFunctionData({
              abi: [
                {
                  name: "transferWithPermit",
                  type: "function",
                  inputs: [
                    { name: "to", type: "address" },
                    { name: "amount", type: "uint256" },
                    { name: "deadline", type: "uint256" },
                    { name: "v", type: "uint8" },
                    { name: "r", type: "bytes32" },
                    { name: "s", type: "bytes32" },
                  ],
                  outputs: [{ name: "", type: "bool" }],
                },
              ],
              functionName: "transferWithPermit",
              args: [
                spenderAddress,
                BigInt(amount),
                BigInt(deadline),
                Number(erc20PermitSignature.v || 0),
                erc20PermitSignature.r,
                erc20PermitSignature.s,
              ],
            }),
          };
        },
        notifications: {
          id: "erc20-transfer",
          onSent: {
            title: "Transfer avec permit",
            message: "Exécution du transfer avec permit ERC20...",
          },
          onComplete: {
            title: "Transfer réussi",
            message: "Le transfer avec permit ERC20 a réussi",
          },
          onFail: {
            title: "Erreur transfer",
            message: "Le transfer avec permit ERC20 a échoué",
          },
        },
      },
    ]);
  };

  const handleCoinBridgePermitFlow = () => {
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 heure

    sendTransactions([
      {
        // TX1: Signature CoinBridge permit
        txDatas: {
          type: "signMessage-coinBridge",
          owner: "0x1234567890123456789012345678901234567890",
          spender: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
          amount: "2000000000000000000", // 2 tokens
          deadline,
          contractAddress: "0x0987654321098765432109876543210987654321",
          signatureKey: "coinBridgePermitSignature",
        },
        notifications: {
          id: "coinbridge-permit-sign",
          onSent: {
            title: "Signature CoinBridge Permit",
            message: "Signature du permit CoinBridge en cours...",
          },
          onComplete: {
            title: "Permit CoinBridge signé",
            message: "Le permit CoinBridge a été signé avec succès",
          },
          onFail: {
            title: "Erreur signature CoinBridge",
            message: "La signature du permit CoinBridge a échoué",
          },
        },
        onResult: async (result, context) => {
          if (result.success && result.contextData?.signature) {
            context.coinBridgePermitSignature = result.contextData.signature;
            console.log(
              "✅ CoinBridge Permit signé et stocké dans le contexte"
            );
          }
        },
      },
      {
        // TX2: Transaction utilisant le permit CoinBridge
        prepareTransaction: async (context) => {
          const { coinBridgePermitSignature, tokenAddress, spenderAddress } =
            context;

          if (!coinBridgePermitSignature) {
            throw new Error("Signature CoinBridge permit requise");
          }

          return {
            type: "onchain",
            to: tokenAddress,
            data: encodeFunctionData({
              abi: [
                {
                  name: "approveWithPermit",
                  type: "function",
                  inputs: [
                    { name: "spender", type: "address" },
                    { name: "amount", type: "uint256" },
                    { name: "deadline", type: "uint256" },
                    { name: "v", type: "uint8" },
                    { name: "r", type: "bytes32" },
                    { name: "s", type: "bytes32" },
                  ],
                  outputs: [{ name: "", type: "bool" }],
                },
              ],
              functionName: "approveWithPermit",
              args: [
                spenderAddress,
                BigInt("2000000000000000000"),
                BigInt(deadline),
                Number(coinBridgePermitSignature.v || 0),
                coinBridgePermitSignature.r,
                coinBridgePermitSignature.s,
              ],
            }),
          };
        },
        notifications: {
          id: "coinbridge-approve",
          onSent: {
            title: "Approve avec permit",
            message: "Exécution de l'approve avec permit CoinBridge...",
          },
          onComplete: {
            title: "Approve réussi",
            message: "L'approve avec permit CoinBridge a réussi",
          },
          onFail: {
            title: "Erreur approve",
            message: "L'approve avec permit CoinBridge a échoué",
          },
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
        Signatures Permit Spécialisées
      </Text>

      <Alert
        icon={<IconInfoCircle size={16} />}
        title="Nouveaux Types de Signature !"
        color="blue"
      >
        Support des signatures <Code>signMessage-erc20</Code> et{" "}
        <Code>signMessage-coinBridge</Code> avec les bonnes fonctions sous le
        capot !
      </Alert>

      <Stack spacing="xs">
        <Text size="md" weight={600}>
          🔐 Types de Signatures Permit
        </Text>
        <Stack spacing="xs" style={{ fontSize: "14px" }}>
          <div>
            <strong>🔹 ERC20 Permit (signMessage-erc20)</strong>
            <ul style={{ margin: "5px 0", paddingLeft: 20 }}>
              <li>
                ✅ Utilise <Code>erc20PermitSignature()</Code>
              </li>
              <li>✅ Retourne r, s, v</li>
              <li>✅ Compatible tokens ERC20 standard</li>
            </ul>
          </div>
          <div>
            <strong>🔹 CoinBridge Permit (signMessage-coinBridge)</strong>
            <ul style={{ margin: "5px 0", paddingLeft: 20 }}>
              <li>
                ✅ Utilise <Code>coinBridgeTokenPermitSignature()</Code>
              </li>
              <li>✅ Retourne r, s, v</li>
              <li>✅ Spécialisé pour tokens CoinBridge</li>
            </ul>
          </div>
        </Stack>
      </Stack>

      <Divider />

      <Group grow>
        <Button
          onClick={handleErc20PermitFlow}
          disabled={isPending}
          variant="outline"
          color="green"
        >
          🔹 ERC20 Permit + Transfer
        </Button>
        <Button
          onClick={handleCoinBridgePermitFlow}
          disabled={isPending}
          variant="outline"
          color="orange"
        >
          🔹 CoinBridge Permit + Approve
        </Button>
      </Group>

      {isPending && (
        <Alert color="blue">
          <Text>Traitement des signatures permit en cours...</Text>
        </Alert>
      )}

      {isSuccess && (
        <Alert color="green">
          <Text>
            ✅ Toutes les signatures permit ont été traitées avec succès !
          </Text>
        </Alert>
      )}

      {isError && (
        <Alert color="red">
          <Text>
            ❌ Une erreur s'est produite lors du traitement des signatures.
          </Text>
        </Alert>
      )}
    </Stack>
  );
}
