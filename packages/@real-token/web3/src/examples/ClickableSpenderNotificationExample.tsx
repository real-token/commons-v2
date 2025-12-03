import React, { useState } from "react";
import { Button, Stack, Card, Text, Group, Badge, Code, Alert } from "@mantine/core";
import { IconInfoCircle, IconExternalLink } from "@tabler/icons-react";
import { useSpenderMapping } from "../hooks/useSpenderMapping";
import { createSpenderLink, useClickableSpender } from "../utils/spenderNotificationUtils";

/**
 * Exemple démontrant les liens cliquables pour les spenders dans les notifications
 * Montre comment les noms de protocoles deviennent cliquables et redirigent vers le block explorer
 */
export const ClickableSpenderNotificationExample: React.FC = () => {
  const { getSpenderName, currentNetworkId } = useSpenderMapping();
  const [selectedAddress, setSelectedAddress] = useState("0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45");

  // Exemples d'adresses populaires
  const exampleSpenders = [
    {
      address: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      network: "Ethereum",
      description: "Uniswap Universal Router"
    },
    {
      address: "0x1111111254EEB25477B68fb85Ed929f73A960582",
      network: "Multi-chain",
      description: "1inch Router v5"
    },
    {
      address: "0xA5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      network: "Polygon",
      description: "QuickSwap Router"
    },
    {
      address: "0x1234567890123456789012345678901234567890",
      network: "Custom",
      description: "Adresse d'exemple non mappée"
    }
  ];

  // Simuler différents block explorers
  const blockExplorers = {
    ethereum: "https://etherscan.io",
    polygon: "https://polygonscan.com",
    arbitrum: "https://arbiscan.io"
  };

  return (
    <Stack gap="lg" style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <Card withBorder>
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              Liens Cliquables dans les Notifications
            </Text>
            <Badge color="blue" variant="light">
              Réseau actuel: {currentNetworkId || "Non détecté"}
            </Badge>
          </Group>
          
          <Alert icon={<IconInfoCircle size={16} />} color="blue">
            Les noms de protocoles dans les notifications sont maintenant cliquables et redirigent vers le block explorer.
            Cliquez sur les exemples ci-dessous pour voir le comportement.
          </Alert>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="md">
          <Text size="lg" fw={600}>Exemples de Spenders Cliquables</Text>
          
          <Stack gap="sm">
            {exampleSpenders.map((spender) => {
              const spenderName = getSpenderName(spender.address);
              const isCurrentAddress = selectedAddress === spender.address;
              
              return (
                <Card 
                  key={spender.address} 
                  withBorder 
                  p="sm" 
                  style={{ 
                    cursor: "pointer",
                    backgroundColor: isCurrentAddress ? "#f0f9ff" : undefined,
                    borderColor: isCurrentAddress ? "#3b82f6" : undefined
                  }}
                  onClick={() => setSelectedAddress(spender.address)}
                >
                  <Group justify="space-between">
                    <Stack gap={4}>
                      <Group gap="xs">
                        <Text fw={500}>{spenderName}</Text>
                        <IconExternalLink size={14} color="#666" />
                      </Group>
                      <Text size="xs" c="dimmed" ff="monospace">
                        {spender.address}
                      </Text>
                      <Group gap="xs">
                        <Badge size="xs" color="gray">{spender.network}</Badge>
                        <Text size="xs" c="dimmed">{spender.description}</Text>
                      </Group>
                    </Stack>
                  </Group>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="md">
          <Text size="lg" fw={600}>Simulation de Notification</Text>
          
          <Card withBorder p="md" bg="gray.0">
            <Stack gap="sm">
              <Text fw={600} size="sm">Transaction Approve</Text>
              <Text size="sm">
                Approving 100 USDC for{" "}
                {createSpenderLink(
                  selectedAddress, 
                  getSpenderName(selectedAddress),
                  blockExplorers.ethereum
                )}
              </Text>
            </Stack>
          </Card>

          <Card withBorder p="md" bg="green.0">
            <Stack gap="sm">
              <Text fw={600} size="sm" c="green.8">Transaction Réussie</Text>
              <Text size="sm">
                Successfully approved 100 USDC for{" "}
                {createSpenderLink(
                  selectedAddress, 
                  getSpenderName(selectedAddress),
                  blockExplorers.ethereum
                )}
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="md">
          <Text size="lg" fw={600}>Utilisation dans le Code</Text>
          
          <Code block>
{`// Import des utilitaires
import { createSpenderLink, useClickableSpender } from "@real-token/web3";

// Utilisation avec createSpenderLink (sans hooks)
const clickableSpender = createSpenderLink(
  spenderAddress, 
  spenderName, 
  blockExplorerUrl
);

// Utilisation avec le hook (dans un composant React)
const ClickableSpenderComponent = () => {
  const clickableSpender = useClickableSpender(
    spenderAddress,
    blockExplorerUrl,
    networkId
  );
  
  return (
    <div>
      Approving tokens for {clickableSpender}
    </div>
  );
};`}
          </Code>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="md">
          <Text size="lg" fw={600}>Fonctionnalités</Text>
          
          <Stack gap="xs">
            <Group gap="xs">
              <Badge color="green" size="sm">✅</Badge>
              <Text size="sm">Noms conviviaux automatiques (Uniswap, 1inch, etc.)</Text>
            </Group>
            <Group gap="xs">
              <Badge color="green" size="sm">✅</Badge>
              <Text size="sm">Liens cliquables vers le block explorer</Text>
            </Group>
            <Group gap="xs">
              <Badge color="green" size="sm">✅</Badge>
              <Text size="sm">Fallback vers l'adresse raccourcie si non mappé</Text>
            </Group>
            <Group gap="xs">
              <Badge color="green" size="sm">✅</Badge>
              <Text size="sm">Support multi-réseau avec mappings spécifiques</Text>
            </Group>
            <Group gap="xs">
              <Badge color="green" size="sm">✅</Badge>
              <Text size="sm">Ouverture dans un nouvel onglet (target="_blank")</Text>
            </Group>
            <Group gap="xs">
              <Badge color="green" size="sm">✅</Badge>
              <Text size="sm">Styles cohérents avec les notifications existantes</Text>
            </Group>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default ClickableSpenderNotificationExample;

