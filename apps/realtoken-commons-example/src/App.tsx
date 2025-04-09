import { MantineProvider } from "@mantine/core";

import "./App.css";
import { useAA } from "@real-token/aa-core";

import { modals } from "@mantine/modals";
import { ModalsProvider } from "@mantine/modals";
import { AaModal } from "@real-token/aa-modal";

function App() {
  return (
    <MantineProvider>
      <ModalsProvider
        modals={{
          aaModal: AaModal,
        }}
      />
      <button
        onClick={() => {
          modals.openContextModal({
            modal: "aaModal",
            innerProps: {
              forceWallet: {
                walletAddress: "",
                forceVersion: "",
              },
            },
          });
        }}
      >
        {"open"}
      </button>
    </MantineProvider>
  );
}

export default App;
