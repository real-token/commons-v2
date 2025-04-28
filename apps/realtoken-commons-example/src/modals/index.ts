import { AaModal } from "@real-token/aa-modal";
import { modals as uiModals } from "@real-token/ui-components";
import { modals as web3Modals } from "@real-token/web3";

export const modals = {
  aaModal: AaModal,
  ...uiModals,
  ...web3Modals,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
