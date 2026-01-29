import { Button, Text, Stack, Divider } from "@mantine/core";
// import { useConnectors } from "wagmi";
import { useAA } from "@real-token/aa-core";
import "./App.css";
import { modals } from "@mantine/modals";

function App() {
  // const connectors = useConnectors();
  // console.log(connectors);

  const { ownerWalletAddress } = useAA();

  return (
    <Stack gap="xl" style={{ padding: 20 }}>
      {/* Section connexion */}
      <Stack gap="md">
        <Text size="lg" w={600}>
          Connexion
        </Text>
        <Stack gap="sm">
          <Button
            onClick={() => {
              modals.openContextModal({
                modal: "aaModal",
                innerProps: {},
              });
            }}
          >
            Ouvrir la modal de connexion
          </Button>
          <Text size="sm">Adresse: {ownerWalletAddress}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
