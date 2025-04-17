import { AaModal } from "@real-token/aa-modal";

export const modals = {
  aaModal: AaModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
