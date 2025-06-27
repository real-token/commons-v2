import { createConnector } from "wagmi";
import { createPublicClient, http, isAddress, getAddress } from "viem";
import type { Address, Chain, PublicClient } from "viem";

type ReadOnlyConnectorStorage = {
  "readOnly.address"?: Address;
  "readOnly.pendingAddress"?: Address;
  "readOnly.pendingEnsName"?: string;
};

/**
 * Crée un connecteur Wagmi en mode read-only pour visualiser les données blockchain
 * sans possibilité de signer des transactions.
 *
 * @param options Configuration du connecteur (adresse ou nom ENS)
 * @returns Connecteur Wagmi configuré en mode read-only
 *
 * @example
 * ```typescript
 * // Avec une adresse directe
 * const connector = readOnlyConnector({
 *   address: "0x1234567890123456789012345678901234567890"
 * });
 *
 * // Avec un nom ENS
 * const connector = readOnlyConnector({
 *   ensName: "vitalik.eth"
 * });
 * ```
 */
export function readOnlyConnector() {
  return createConnector<PublicClient>((config) => ({
    id: "readOnly",
    name: "Read Only",
    type: "readOnly",

    async setup() {
      // Configuration initiale du connecteur
    },

    async connect({ chainId, isReconnecting } = {}) {
      // Trouver la chaîne cible
      let targetChain: Chain = config.chains[0];

      if (chainId) {
        for (let i = 0; i < config.chains.length; i++) {
          if (config.chains[i].id === chainId) {
            targetChain = config.chains[i];
            break;
          }
        }
      }

      // Créer un client public pour la chaîne cible
      const client = createPublicClient({
        chain: targetChain,
        transport: http(),
      });

      let targetAddress: Address;

      // Priorité : 1. Adresse/ENS en attente dans le storage, 2. Adresse stockée précédemment
      const pendingAddress = await config.storage?.getItem(
        "readOnly.pendingAddress"
      );
      const pendingEnsName = await config.storage?.getItem(
        "readOnly.pendingEnsName"
      );

      if (
        pendingAddress &&
        typeof pendingAddress === "string" &&
        isAddress(pendingAddress)
      ) {
        targetAddress = getAddress(pendingAddress);
        // Nettoyer les données en attente
        await config.storage?.removeItem("readOnly.pendingAddress");
        await config.storage?.removeItem("readOnly.pendingEnsName");
      } else if (pendingEnsName && typeof pendingEnsName === "string") {
        // Résoudre le nom ENS
        try {
          const resolvedAddress = await client.getEnsAddress({
            name: pendingEnsName,
          });
          if (!resolvedAddress) {
            throw new Error(`ENS name ${pendingEnsName} could not be resolved`);
          }
          targetAddress = getAddress(resolvedAddress);
          // Nettoyer les données en attente
          await config.storage?.removeItem("readOnly.pendingAddress");
          await config.storage?.removeItem("readOnly.pendingEnsName");
        } catch (error) {
          throw new Error(
            `Failed to resolve ENS name: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      } else {
        // Récupérer depuis le storage (adresse précédemment connectée)
        const storedAddress = await config.storage?.getItem("readOnly.address");
        if (
          storedAddress &&
          typeof storedAddress === "string" &&
          isAddress(storedAddress)
        ) {
          targetAddress = getAddress(storedAddress);
        } else {
          throw new Error(
            "No address configured for read-only connector. Please set an address or ENS name first."
          );
        }
      }

      // Vérifier que l'adresse est valide
      if (!isAddress(targetAddress)) {
        throw new Error("Invalid address format");
      }

      // Stocker l'adresse dans le storage du connecteur
      await config.storage?.setItem("readOnly.address", targetAddress);

      return {
        accounts: [targetAddress],
        chainId: targetChain.id,
      };
    },

    async disconnect() {
      await config.storage?.removeItem("readOnly.address");
    },

    async getAccounts(): Promise<readonly Address[]> {
      const address = await config.storage?.getItem("readOnly.address");
      if (address && typeof address === "string" && isAddress(address)) {
        return [getAddress(address)] as readonly Address[];
      }
      return [] as readonly Address[];
    },

    async getChainId() {
      return config.chains[0].id;
    },

    async getProvider({ chainId }: { chainId?: number } = {}) {
      // Trouver la chaîne cible
      let targetChain: Chain = config.chains[0];

      if (chainId) {
        for (let i = 0; i < config.chains.length; i++) {
          if (config.chains[i].id === chainId) {
            targetChain = config.chains[i];
            break;
          }
        }
      }

      return createPublicClient({
        chain: targetChain,
        transport: http(),
      }) as PublicClient;
    },

    async isAuthorized() {
      const address = await config.storage?.getItem("readOnly.address");
      return !!(address && typeof address === "string" && isAddress(address));
    },

    async switchChain({ chainId }: { chainId: number }) {
      for (let i = 0; i < config.chains.length; i++) {
        if (config.chains[i].id === chainId) {
          return config.chains[i];
        }
      }
      return config.chains[0];
    },

    onAccountsChanged() {
      // Les comptes ne changent pas pour un connecteur read-only
    },

    onChainChanged() {
      // Gérer le changement de chaîne si nécessaire
    },

    onConnect() {
      // Événement de connexion
    },

    onDisconnect() {
      // Événement de déconnexion
    },

    onMessage() {
      // Gérer les messages si nécessaire
    },
  }));
}

/**
 * Fonction utilitaire pour créer le connecteur read-only avec une adresse spécifique.
 * Identique à `readOnlyConnector` mais avec un nom plus explicite.
 *
 * @returns Connecteur Wagmi configuré en mode read-only
 */
export function createReadOnlyConnector() {
  return readOnlyConnector();
}

/**
 * Configuration globale pour le connecteur read-only
 */
let globalReadOnlyConfig: {
  storage?: {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
} = {};

/**
 * Définit le storage global pour le connecteur read-only
 * Cette fonction doit être appelée avant d'utiliser setReadOnlyAddress ou setReadOnlyEnsName
 */
export function setReadOnlyStorage(storage: {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}) {
  globalReadOnlyConfig.storage = storage;
}

/**
 * Définit l'adresse à utiliser pour la prochaine connexion read-only
 *
 * @param address Adresse Ethereum à utiliser
 */
export async function setReadOnlyAddress(address: Address) {
  if (!globalReadOnlyConfig.storage) {
    throw new Error("Storage not configured. Call setReadOnlyStorage first.");
  }

  if (!isAddress(address)) {
    throw new Error("Invalid address format");
  }

  await globalReadOnlyConfig.storage.removeItem("readOnly.pendingEnsName");
  await globalReadOnlyConfig.storage.setItem(
    "readOnly.pendingAddress",
    address
  );
}

/**
 * Définit le nom ENS à résoudre pour la prochaine connexion read-only
 *
 * @param ensName Nom ENS à résoudre
 */
export async function setReadOnlyEnsName(ensName: string) {
  if (!globalReadOnlyConfig.storage) {
    throw new Error("Storage not configured. Call setReadOnlyStorage first.");
  }

  if (!ensName) {
    throw new Error("ENS name cannot be empty");
  }

  await globalReadOnlyConfig.storage.removeItem("readOnly.pendingAddress");
  await globalReadOnlyConfig.storage.setItem(
    "readOnly.pendingEnsName",
    ensName
  );
}
