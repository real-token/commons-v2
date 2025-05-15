import { DecodeWalletConnectTxModal } from "./txModals/DecodeWalletConnectTxModal/DecodeWalletConnectTxModal";
import { DecodeAaTxModal } from "./txModals/DecodeAaTxModal/DecodeAaTxModal";
import { WalletConnectModal } from "./WalletConnectModal/WalletConnectModal";

export const modals = {
  wcTxManagerModal: DecodeWalletConnectTxModal,
  aaTxManagerModal: DecodeAaTxModal,
  walletConnectModal: WalletConnectModal,
  // TODO: add sign aa message modal
};
