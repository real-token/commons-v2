import { Button } from "@mantine/core";

import "./App.css";

import { modals } from "@mantine/modals";
import { CONNECTION_MODE } from "@real-token/aa-modal";

function App() {
  return (
    <Button
      onClick={() => {
        modals.openContextModal({
          modal: "aaModal",
          innerProps: {
            connectionMode: {
              [CONNECTION_MODE.aa]: {
                connectorsName: ["metaMask", "rabby", "walletConnect"],
                socialConnectorsName: ["google"],
                showEmailPasswordless: false,
              },
              [CONNECTION_MODE.external]: {
                connectorsName: [
                  "metaMask",
                  "rabby",
                  "walletConnect",
                  "coinbase",
                  "ledger",
                  "trust",
                  "frame",
                ],
              },
            },
          },
        });
      }}
    >
      {"open"}
    </Button>
  );
}

export default App;
