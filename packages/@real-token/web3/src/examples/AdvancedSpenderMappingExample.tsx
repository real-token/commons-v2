import React from "react";
import { useSpenderMapping } from "../hooks/useSpenderMapping";
import { mergeSpenderMappings, getDefaultSpenderMappings } from "../utils/spenderMappingUtils";
import { NetworkSpenderMappings } from "../context/RealTokenWeb3ConfigContext";

/**
 * Exemple avancé montrant les capacités de fusion avec lodash
 * Démontre comment étendre ou modifier partiellement des mappings existants
 */
export const AdvancedSpenderMappingExample: React.FC = () => {
  const { getSpenderName, spenderMapping } = useSpenderMapping();
  const defaultMappings = getDefaultSpenderMappings();

  // Exemple de mappings personnalisés qui étendent les défauts
  const customMappings: NetworkSpenderMappings = {
    "0x1": {
      // Nouveau mapping personnalisé sur Ethereum
      "0x1234567890123456789012345678901234567890": {
        name: "Mon Contrat Personnalisé",
        description: "Contrat spécifique à mon application"
      },
      // Extension d'un mapping existant (ajout de description)
      "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45": {
        name: "Uniswap Universal Router", // Même nom que le défaut
        description: "Version étendue avec plus d'infos" // Description personnalisée
      }
    }
  };

  // Démonstration de la fusion manuelle
  const manuallyMerged = mergeSpenderMappings(customMappings);

  // Exemples d'adresses pour la démonstration
  const exampleAddresses = [
    "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", // Uniswap (étendu)
    "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch (défaut)
    "0x1234567890123456789012345678901234567890", // Personnalisé
    "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", // Non mappé
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Exemple Avancé de Mappage des Spenders</h2>
      
      <div style={{ marginBottom: "30px" }}>
        <h3>Statistiques des Mappings</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h4>Réseaux par Défaut</h4>
            <p style={{ fontSize: "24px", margin: "5px 0", color: "#2563eb" }}>
              {Object.keys(defaultMappings).length}
            </p>
            <p style={{ fontSize: "12px", color: "#666" }}>Réseaux configurés</p>
          </div>
          
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h4>Réseaux Personnalisés</h4>
            <p style={{ fontSize: "24px", margin: "5px 0", color: "#dc2626" }}>
              {Object.keys(customMappings).length}
            </p>
            <p style={{ fontSize: "12px", color: "#666" }}>Définis dans cet exemple</p>
          </div>
          
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h4>Mappings Réseau Actuel</h4>
            <p style={{ fontSize: "24px", margin: "5px 0", color: "#059669" }}>
              {Object.keys(spenderMapping).length}
            </p>
            <p style={{ fontSize: "12px", color: "#666" }}>Disponibles maintenant</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3>Démonstration de la Fusion Lodash</h3>
        <p style={{ marginBottom: "15px", color: "#666" }}>
          Lodash.merge permet une fusion profonde intelligente des objets, 
          préservant les propriétés existantes tout en permettant les extensions.
        </p>
        
        {exampleAddresses.map((address) => {
          const contextName = getSpenderName(address); // Via contexte (fusionné automatiquement)
          const mapping = spenderMapping[address.toLowerCase()];
          const isDefault = Object.values(defaultMappings).some(networkMappings => 
            networkMappings[address.toLowerCase()] !== undefined
          );
          const isCustom = Object.values(customMappings).some(networkMappings => 
            networkMappings[address.toLowerCase()] !== undefined
          );
          
          return (
            <div 
              key={address} 
              style={{ 
                marginBottom: "15px", 
                padding: "15px", 
                border: "1px solid #e5e7eb", 
                borderRadius: "8px",
                backgroundColor: isCustom ? "#fef3c7" : isDefault ? "#dbeafe" : "#f9fafb"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h4 style={{ margin: 0, fontSize: "16px" }}>{contextName}</h4>
                <div style={{ display: "flex", gap: "8px" }}>
                  {isDefault && (
                    <span style={{ 
                      padding: "2px 8px", 
                      backgroundColor: "#3b82f6", 
                      color: "white", 
                      borderRadius: "12px", 
                      fontSize: "10px" 
                    }}>
                      DÉFAUT
                    </span>
                  )}
                  {isCustom && (
                    <span style={{ 
                      padding: "2px 8px", 
                      backgroundColor: "#f59e0b", 
                      color: "white", 
                      borderRadius: "12px", 
                      fontSize: "10px" 
                    }}>
                      PERSONNALISÉ
                    </span>
                  )}
                </div>
              </div>
              
              <p style={{ margin: "5px 0", fontSize: "12px", fontFamily: "monospace", color: "#6b7280" }}>
                {address}
              </p>
              
              {mapping?.description && (
                <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#4b5563" }}>
                  📝 {mapping.description}
                </p>
              )}
              
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#6b7280" }}>
                <strong>Status:</strong> {mapping ? "✅ Mappé" : "❌ Non mappé"}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f3f4f6", 
        borderRadius: "8px",
        border: "1px solid #d1d5db"
      }}>
        <h3>Avantages de Lodash.merge</h3>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li><strong>Fusion profonde :</strong> Préserve les propriétés existantes</li>
          <li><strong>Priorité intelligente :</strong> Les valeurs personnalisées écrasent les défauts</li>
          <li><strong>Cohérence :</strong> Même logique que le RealTokenWeb3Provider</li>
          <li><strong>Performance :</strong> Optimisé et testé en production</li>
          <li><strong>Robustesse :</strong> Gestion des cas edge automatique</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedSpenderMappingExample;
