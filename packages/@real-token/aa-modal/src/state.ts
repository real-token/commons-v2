import { atomWithStorage } from "jotai/utils";

export const advancedExternalWalletTermsAcceptedAtom = atomWithStorage<boolean>(
  "AA_advancedExternalWalletTermsAccepted",
  false
);
