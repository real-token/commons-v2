import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { resources } from "./i18next/locales";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { aaClient, networks } from "./aa-config/config";
import { modals } from "./modals";
import React from "react";
import { initLanguage } from "@real-token/i18n-locales";
import { RealTokenUiProvider, SHOW_NETWORKS } from "@real-token/core";
import { MantineProviders, Layout, Logo } from "@real-token/ui-components";
import { RealTokenWeb3Provider } from "@real-token/web3";
import { QueryClient } from "@tanstack/react-query";

initLanguage({ resources, debug: true });

// const showAllNetworks = process.env.NEXT_PUBLIC_SHOW_ONLY_TESTNET == "false";
// const env = process.env.NEXT_PUBLIC_ENV ?? "development";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RealTokenWeb3Provider queryClient={queryClient} aaClientConfig={aaClient}>
      <RealTokenUiProvider
        values={{
          showNetworks: SHOW_NETWORKS.ALL,
          networksConfig: networks,
          defaultNetworkId: "0x64",
        }}
      >
        <MantineProviders modals={modals}>
          <Layout
            header={{
              newWebsite: {
                name: "Realtoken commons example",
                url: "#",
                logo: Logo,
                comingSoon: false,
              },
            }}
          >
            <App />
          </Layout>
        </MantineProviders>
      </RealTokenUiProvider>
    </RealTokenWeb3Provider>
  </React.StrictMode>
);
