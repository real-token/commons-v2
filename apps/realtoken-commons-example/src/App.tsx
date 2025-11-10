import { Button, Text, Stack, Divider } from "@mantine/core";
// import { useConnectors } from "wagmi";
import { useAA } from "@real-token/aa-core";

import "./App.css";

import { modals } from "@mantine/modals";
import { CONNECTION_MODE } from "@real-token/aa-modal";
import { UseSendTransactionsExample } from "./components/UseSendTransactionsExample";
import { UseSendTransactionsWithContextExample } from "./components/UseSendTransactionsWithContextExample";
import { TypedContextExample } from "./components/TypedContextExample";
import { StaticVsDynamicExample } from "./components/StaticVsDynamicExample";
import { PermitSignatureExample } from "./components/PermitSignatureExample";

function App() {
  // const connectors = useConnectors();
  // console.log(connectors);

  const { getUserInfo, ownerWalletAddress } = useAA();

  return (
    <Stack spacing="xl" style={{ padding: 20 }}>
      {/* Section connexion */}
      <Stack spacing="md">
        <Text size="lg" weight={600}>
          Connexion
        </Text>
        <Stack spacing="sm">
          <Button
            onClick={() => {
              modals.openContextModal({
                modal: "aaModal",
                innerProps: {
                  connectionModeVisibility: {
                    [CONNECTION_MODE.aa]: true,
                    [CONNECTION_MODE.external]: true,
                  },
                  connectionModeConfig: {
                    [CONNECTION_MODE.aa]: {
                      showAdvancedWalletConnection: true,
                      showSocialLogins: true,
                      showEmailPasswordless: true,
                    },
                  },
                },
              });
            }}
          >
            Ouvrir la modal de connexion
          </Button>
          <Button
            onClick={async () => {
              const userInfo = await getUserInfo();
              console.log(userInfo);
            }}
          >
            Afficher les infos utilisateur
          </Button>
          <Text size="sm">Adresse: {ownerWalletAddress}</Text>
        </Stack>
      </Stack>

      <Divider />

      {/* Section exemple useSendTransactions basique */}
      <UseSendTransactionsExample />

      <Divider />

      {/* Section exemple useSendTransactions avec contexte */}
      <UseSendTransactionsWithContextExample />

      <Divider />

      {/* Section exemple avec contexte typé */}
      <TypedContextExample />

      <Divider />

      {/* Section exemple statique vs dynamique */}
      <StaticVsDynamicExample />

      <Divider />

      {/* Section exemple signatures permit spécialisées */}
      <PermitSignatureExample />
    </Stack>
  );
}

export default App;
