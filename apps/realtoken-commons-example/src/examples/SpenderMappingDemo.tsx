import React from "react";
import { useSpenderMapping, useRealTokenWeb3Config } from "@real-token/web3";
import { Stack, Text, Card, Group, Badge } from "@mantine/core";

/**
 * Démonstration du système de mappage des spenders
 * Ce composant montre comment utiliser les nouveaux hooks pour obtenir des noms conviviaux
 */
export const SpenderMappingDemo: React.FC = () => {
  const { getSpenderName, spenderMapping } = useSpenderMapping();
  const { config } = useRealTokenWeb3Config();

  // Exemples d'adresses de spender couramment utilisées
  const commonSpenders = [
    {
      address: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      description: "Uniswap Universal Router",
    },
    {
      address: "0x1111111254EEB25477B68fb85Ed929f73A960582",
      description: "1inch v5 Router",
    },
    {
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      description: "Uniswap V2 Router",
    },
    {
      address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
      description: "Uniswap V3 Router",
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      description: "Adresse non mappée (exemple)",
    },
  ];

  return (
    <Stack
      gap="md"
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <Card withBorder>
        <Stack gap="sm">
          <Text size="xl" fw={700}>
            Configuration du Provider
          </Text>
          <Group>
            <Badge color={config.listenNewWcTx ? "green" : "red"}>
              WC Tx: {config.listenNewWcTx ? "Activé" : "Désactivé"}
            </Badge>
            <Badge color={config.listenNewAaTx ? "green" : "red"}>
              AA Tx: {config.listenNewAaTx ? "Activé" : "Désactivé"}
            </Badge>
            <Badge color="blue">
              Spenders mappés: {Object.keys(spenderMapping).length}
            </Badge>
          </Group>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Text size="lg" fw={600}>
            Résolution des Noms de Spender
          </Text>
          <Text size="sm" c="dimmed">
            Voici comment les adresses de spender sont résolues avec le système
            de mappage :
          </Text>

          <Stack gap="xs">
            {commonSpenders.map((spender) => {
              const resolvedName = getSpenderName(spender.address);
              const isMapped =
                spenderMapping[spender.address.toLowerCase()] !== undefined;

              return (
                <Card
                  key={spender.address}
                  withBorder
                  p="sm"
                  bg={isMapped ? "green.0" : "gray.0"}
                >
                  <Stack gap={4}>
                    <Group justify="space-between">
                      <Text size="sm" fw={500}>
                        {resolvedName}
                      </Text>
                      <Badge size="xs" color={isMapped ? "green" : "gray"}>
                        {isMapped ? "Mappé" : "Non mappé"}
                      </Badge>
                    </Group>
                    <Text size="xs" c="dimmed" ff="monospace">
                      {spender.address}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {spender.description}
                    </Text>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Text size="lg" fw={600}>
            Comment configurer
          </Text>
          <Text size="sm" c="dimmed">
            Pour ajouter des mappings de spender, configurez le
            RealTokenWeb3Provider comme ceci :
          </Text>
          <Card withBorder p="md" bg="gray.0">
            <Text size="xs" ff="monospace" style={{ whiteSpace: "pre-wrap" }}>
              {`const spenderMapping = {
  "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45": {
    name: "Uniswap Universal Router",
    description: "Routeur universel d'Uniswap"
  },
  "0x1111111254EEB25477B68fb85Ed929f73A960582": {
    name: "1inch Router",
    description: "Agrégateur 1inch v5"
  }
};

<RealTokenWeb3Provider
  providerConfig={{
    spenderMapping: spenderMapping
  }}
>
  <App />
</RealTokenWeb3Provider>`}
            </Text>
          </Card>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Text size="lg" fw={600}>
            Impact sur les Notifications
          </Text>
          <Text size="sm">
            Avec ce système, les notifications de transactions approve/permit
            afficheront :
          </Text>
          <Stack gap="xs">
            <Card withBorder p="sm" bg="red.0">
              <Text size="sm" fw={500}>
                ❌ Avant (sans mappage)
              </Text>
              <Text size="xs" ff="monospace">
                "Approving 100 USDC for 0x68b3...5Fc45"
              </Text>
            </Card>
            <Card withBorder p="sm" bg="green.0">
              <Text size="sm" fw={500}>
                ✅ Après (avec mappage)
              </Text>
              <Text size="xs" ff="monospace">
                "Approving 100 USDC for Uniswap Universal Router"
              </Text>
            </Card>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SpenderMappingDemo;

