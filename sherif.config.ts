import { defineConfig } from "sherif";

export default defineConfig({
  packages: ["packages/@real-token/*"],
  dependencies: [
    // External shared deps to sync
    "react",
    "react-dom",
    "@mantine/core",
    "@mantine/modals",
    "@mantine/notifications",
    "@types/react",
    "@types/react-dom",

    // Internal real-token packages
    "@real-token/types",
    "@real-token/aa-core",
    "@real-token/aa-modal", // etc., if you have others
  ],
  dependencyVersionPolicy: {
    "@real-token/types": "workspace:*",
    "@real-token/aa-core": "workspace:*",
    "@real-token/aa-modal": "workspace:*",
  },
});
