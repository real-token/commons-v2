import { useCurrentNetwork } from "@real-token/core";
import { useRealTokenWeb3Config } from "../context/RealTokenWeb3ConfigContext";

/**
 * Hook spécialisé pour le mapping des spenders
 * Fournit un accès facile aux fonctionnalités de mappage des adresses de spender
 * Utilise automatiquement le réseau actuel ou permet de spécifier un networkId
 * 
 * @returns {Object} Objet contenant:
 *   - getSpenderName: Fonction pour obtenir le nom convivial d'une adresse de spender
 *   - spenderMapping: L'objet de mappage pour le réseau actuel
 *   - allSpenderMappings: L'objet de mappage complet (tous les réseaux)
 *   - currentNetworkId: L'ID du réseau actuel
 * 
 * @example
 * ```typescript
 * const { getSpenderName, spenderMapping, currentNetworkId } = useSpenderMapping();
 * 
 * // Obtenir le nom convivial d'un spender (réseau actuel)
 * const friendlyName = getSpenderName("0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45");
 * // Résultat: "Uniswap Universal Router" ou "0x68b3...Fc45" si non mappé
 * 
 * // Obtenir le nom pour un réseau spécifique
 * const nameOnPolygon = getSpenderName("0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", "0x89");
 * 
 * // Accéder au mappage du réseau actuel
 * const currentNetworkMappings = Object.keys(spenderMapping).length;
 * ```
 */
export const useSpenderMapping = () => {
  const { getSpenderName, config } = useRealTokenWeb3Config();
  const currentNetwork = useCurrentNetwork();
  
  const currentNetworkId = currentNetwork?.chainId;
  const currentNetworkMappings = currentNetworkId 
    ? config.spenderMapping[currentNetworkId] || {}
    : {};

  return {
    getSpenderName,
    spenderMapping: currentNetworkMappings,
    allSpenderMappings: config.spenderMapping,
    currentNetworkId,
  };
};
