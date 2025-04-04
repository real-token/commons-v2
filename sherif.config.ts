import { defineConfig } from "sherif";

export default defineConfig({
  packages: ["packages/@real-token/*"], // or just 'packages/*' if you prefer
  dependencies: [
    "react",
    "react-dom",
    "@mantine/core",
    "@mantine/modals",
    "@mantine/notifications",
    "@types/react",
    "@types/react-dom",
  ],
});
