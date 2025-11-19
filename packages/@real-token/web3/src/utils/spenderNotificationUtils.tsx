import React from "react";
import { Anchor, Text } from "@mantine/core";
import { useCurrentNetwork } from "@real-token/core";
import { useSpenderMapping } from "../hooks/useSpenderMapping";

/**
 * Génère un composant React cliquable pour un spender dans les notifications
 * Le composant affiche soit le nom convivial soit l'adresse raccourcie,
 * et redirige vers le block explorer au clic
 */
export function createClickableSpenderComponent(
  spenderAddress: string,
  blockExplorerUrl?: string,
  networkId?: string
): React.ReactElement {
  return <ClickableSpender 
    address={spenderAddress} 
    blockExplorerUrl={blockExplorerUrl}
    networkId={networkId}
  />;
}

interface ClickableSpenderProps {
  address: string;
  blockExplorerUrl?: string;
  networkId?: string;
}

const ClickableSpender: React.FC<ClickableSpenderProps> = ({ 
  address, 
  blockExplorerUrl,
  networkId 
}) => {
  const { getSpenderName } = useSpenderMapping();
  const currentNetwork = useCurrentNetwork();
  
  const displayName = getSpenderName(address, networkId);
  const explorerUrl = blockExplorerUrl || currentNetwork?.blockExplorerUrl;
  
  if (!explorerUrl) {
    // Si pas d'URL d'explorateur, retourner juste le texte
    return <Text component="span">{displayName}</Text>;
  }
  
  const addressUrl = `${explorerUrl}/address/${address}`;
  
  return (
    <Anchor
      href={addressUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        textDecoration: "underline",
        color: "inherit",
        fontWeight: "inherit"
      }}
    >
      {displayName}
    </Anchor>
  );
};

/**
 * Version simplifiée qui retourne directement le JSX pour une utilisation inline
 * Utilise les hooks React pour obtenir les informations de réseau et de mapping
 */
export function useClickableSpender(
  spenderAddress: string,
  blockExplorerUrl?: string,
  networkId?: string
): React.ReactElement {
  const { getSpenderName } = useSpenderMapping();
  const currentNetwork = useCurrentNetwork();
  
  const displayName = getSpenderName(spenderAddress, networkId);
  const explorerUrl = blockExplorerUrl || currentNetwork?.blockExplorerUrl;
  
  if (!explorerUrl) {
    return <Text component="span">{displayName}</Text>;
  }
  
  const addressUrl = `${explorerUrl}/address/${spenderAddress}`;
  
  return (
    <Anchor
      href={addressUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        textDecoration: "underline",
        color: "inherit",
        fontWeight: "inherit"
      }}
    >
      {displayName}
    </Anchor>
  );
}

/**
 * Fonction utilitaire pour créer un spender cliquable sans hooks React
 * Utilisable dans les contextes où les hooks ne sont pas disponibles
 */
export function createSpenderLink(
  spenderAddress: string,
  spenderName: string,
  blockExplorerUrl?: string
): React.ReactElement {
  if (!blockExplorerUrl) {
    return <Text component="span">{spenderName}</Text>;
  }
  
  const addressUrl = `${blockExplorerUrl}/address/${spenderAddress}`;
  
  return (
    <Anchor
      href={addressUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        textDecoration: "underline",
        color: "inherit",
        fontWeight: "inherit"
      }}
    >
      {spenderName}
    </Anchor>
  );
}

