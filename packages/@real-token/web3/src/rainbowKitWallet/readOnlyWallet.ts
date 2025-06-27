import type { Wallet } from "@rainbow-me/rainbowkit";
import { readOnlyConnector } from "../connectors/readOnlyConnector";

/**
 * Icône SVG pour le wallet read-only
 */
const readOnlyIcon = `data:image/svg+xml;base64,${btoa(`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21.5 9H16.5L15.5 8H12.5V6C12.5 5.4 12 5 11.5 5S10.5 5.4 10.5 6V8H7.5L6.5 9H2.5C2.2 9 2 9.2 2 9.5S2.2 10 2.5 10H5L6 11H8V13H6L5 14H2.5C2.2 14 2 14.2 2 14.5S2.2 15 2.5 15H6.5L7.5 16H10.5V18C10.5 18.6 11 19 11.5 19S12.5 18.6 12.5 18V16H15.5L16.5 15H21.5C21.8 15 22 14.8 22 14.5S21.8 14 21.5 14H19L18 13H16V11H18L19 10H21.5C21.8 10 22 9.8 22 9.5S21.8 9 21.5 9ZM14 11V13H10V11H14Z" fill="#6B7280"/>
</svg>
`)}`;

/**
 * Crée un wallet RainbowKit en mode read-only pour visualiser les données blockchain
 * sans possibilité de signer des transactions.
 *
 * L'adresse ou le nom ENS doit être défini avant la connexion en utilisant
 * setReadOnlyAddress() ou setReadOnlyEnsName().
 *
 * @returns Wallet RainbowKit configuré en mode read-only
 *
 * @example
 * ```typescript
 * import { connectorsForWallets } from '@rainbow-me/rainbowkit';
 * import { readOnlyWallet, setReadOnlyAddress } from '@real-token/web3';
 *
 * // Configuration du wallet
 * const connectors = connectorsForWallets([
 *   {
 *     groupName: 'Read Only',
 *     wallets: [readOnlyWallet()],
 *   },
 * ]);
 *
 * // Avant la connexion, définir l'adresse
 * await setReadOnlyAddress("0x1234567890123456789012345678901234567890");
 * // ou avec un nom ENS
 * await setReadOnlyEnsName("vitalik.eth");
 * ```
 */
export const readOnlyWallet = (): Wallet => ({
  id: "readOnly",
  name: "Read Only",
  rdns: "com.realtoken.readonly",
  iconUrl: readOnlyIcon,
  iconAccent: "#6B7280",
  iconBackground: "#F3F4F6",
  installed: true,
  downloadUrls: {},
  createConnector: () => readOnlyConnector(),
});

/**
 * Fonction utilitaire pour créer le wallet read-only.
 * Identique à `readOnlyWallet` mais avec un nom plus explicite.
 *
 * @returns Wallet RainbowKit configuré en mode read-only
 */
export function createReadOnlyWallet(): Wallet {
  return readOnlyWallet();
}
