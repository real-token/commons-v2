import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  AaWalletExternal,
  useWeb3AuthPrivate,
  Web3AuthPrivateAccess,
} from "@real-token/web3";

type UseExternalWallets = (search: string) => {
  isLoading: boolean;
  aaExternalWallets: AaWalletExternal[] | undefined;
  error: Error | null;
};

const processWallets = async (
  web3AuthPrivate: Web3AuthPrivateAccess
): Promise<AaWalletExternal[]> => {
  const availableWalletsId = Object.keys(
    web3AuthPrivate.loginModal.externalWalletsConfig
  );
  const { default: defaultWallets, others } =
    web3AuthPrivate.loginModal.uiConfig.walletRegistry;

  return [...Object.entries(defaultWallets), ...Object.entries(others)]
    .filter(([_, wallet]) =>
      wallet.chains.some((chain) => chain.includes("eip155"))
    )
    .sort((a, b) => {
      const aInstalled = availableWalletsId.includes(a[0]); // Use walletId (a[0]) instead of name
      const bInstalled = availableWalletsId.includes(b[0]); // Use walletId (b[0]) instead of name
      return aInstalled === bInstalled ? 0 : aInstalled ? -1 : 1;
    })
    .map(([walletId, wallet]) => ({
      ...wallet,
      walletId,
      logo: `https://images.web3auth.io/login-${walletId}.${wallet.imgExtension}`,
      isInstalled: availableWalletsId.includes(walletId),
      hasWalletConnect:
        wallet.walletConnect?.sdks?.includes("sign_v2") ?? false,
    }));
};

export const useExternalWallets: UseExternalWallets = (search) => {
  const web3AuthPrivate = useWeb3AuthPrivate();
  const {
    data: allWallets,
    isLoading,
    error,
  } = useQuery<AaWalletExternal[], Error>({
    queryKey: [
      "externalWallets",
      web3AuthPrivate?.loginModal?.uiConfig?.walletRegistry,
    ],
    queryFn: () => processWallets(web3AuthPrivate!),
    enabled:
      !!web3AuthPrivate?.loginModal?.uiConfig?.walletRegistry &&
      !!web3AuthPrivate?.loginModal?.externalWalletsConfig,
    gcTime: 10 * 60 * 1000, // Keep in garbage collection for 10 minutes
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const aaExternalWallets = useMemo(() => {
    if (!allWallets) return undefined;
    if (!search) return allWallets;

    return allWallets.filter((wallet) =>
      wallet.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allWallets, search]);

  return {
    isLoading,
    aaExternalWallets,
    error,
  };
};
