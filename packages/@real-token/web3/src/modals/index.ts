import { DecodeWalletConnectTxModal } from "./txModals/DecodeWalletConnectTxModal/DecodeWalletConnectTxModal";
import { DecodeAaTxModal } from "./txModals/DecodeAaTxModal/DecodeAaTxModal";
import { WalletConnectModal } from "./WalletConnectModal/WalletConnectModal";
import { NotUsingLastSdkVersion } from "./NotUsingLastSdkVersion/NotUsingLastSdkVersion";

export const modals = {
  wcTxManagerModal: DecodeWalletConnectTxModal,
  aaTxManagerModal: DecodeAaTxModal,
  walletConnectModal: WalletConnectModal,
  notUsingLastSdkVersion: NotUsingLastSdkVersion,
  // TODO: add sign aa message modal
};
