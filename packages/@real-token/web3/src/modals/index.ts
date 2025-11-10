import { DecodeWalletConnectTxModal } from "./txModals/DecodeWalletConnectTxModal/DecodeWalletConnectTxModal";
import { DecodeAaTxModal } from "./txModals/DecodeAaTxModal/DecodeAaTxModal";
import { DecodeAaSignatureModal } from "./txModals/DecodeAaSignatureModal/DecodeAaSignatureModal";
import { WalletConnectModal } from "./WalletConnectModal/WalletConnectModal";
import { NotUsingLastSdkVersion } from "./NotUsingLastSdkVersion/NotUsingLastSdkVersion";

export const modals = {
  walletConnect: WalletConnectModal,
  wcTxManagerModal: DecodeWalletConnectTxModal,
  aaTxManagerModal: DecodeAaTxModal,
  aaSignatureManagerModal: DecodeAaSignatureModal,
  notUsingLastSdkVersion: NotUsingLastSdkVersion,
};
