import React, { useState } from "react";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
import {
  setReadOnlyAddress,
  setReadOnlyEnsName,
  setReadOnlyStorage,
} from "../connectors/readOnlyConnector";
import { isAddress } from "viem";

/**
 * Exemple d'utilisation du wallet read-only avec un formulaire de saisie
 */
export const ReadOnlyWalletExample = () => {
  const [inputValue, setInputValue] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { connect, connectors } = useConnect();

  // Trouver le connecteur read-only
  const readOnlyConnector = connectors.find((c) => c.id === "readOnly");

  const handleConnect = async () => {
    if (!inputValue.trim()) {
      setError("Veuillez saisir une adresse ou un nom ENS");
      return;
    }

    if (!readOnlyConnector) {
      setError("Connecteur read-only non trouvé");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Configurer le storage (normalement fait une seule fois au démarrage de l'app)
      setReadOnlyStorage({
        getItem: async (key: string) => {
          return localStorage.getItem(key);
        },
        setItem: async (key: string, value: string) => {
          localStorage.setItem(key, value);
        },
        removeItem: async (key: string) => {
          localStorage.removeItem(key);
        },
      });

      // Déterminer si c'est une adresse ou un nom ENS
      if (inputValue.startsWith("0x")) {
        if (!isAddress(inputValue)) {
          throw new Error("Format d'adresse invalide");
        }
        await setReadOnlyAddress(inputValue as `0x${string}`);
      } else if (inputValue.endsWith(".eth")) {
        await setReadOnlyEnsName(inputValue);
      } else {
        throw new Error(
          "Format invalide. Utilisez une adresse (0x...) ou un nom ENS (.eth)"
        );
      }

      // Connecter le wallet
      await connect({ connector: readOnlyConnector });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h3>Connexion Read-Only</h3>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="addressInput"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Adresse ou nom ENS à observer :
        </label>
        <input
          id="addressInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="0x... ou vitalik.eth"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "5px",
          }}
        />
        {error && <div style={{ color: "red", fontSize: "14px" }}>{error}</div>}
      </div>

      <button
        onClick={handleConnect}
        disabled={isConnecting || !inputValue.trim()}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isConnecting ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isConnecting ? "not-allowed" : "pointer",
        }}
      >
        {isConnecting ? "Connexion..." : "Observer ce portefeuille"}
      </button>
    </div>
  );
};

/**
 * Exemple d'utilisation avec WalletButton.Custom
 */
export const ReadOnlyWalletButtonExample = () => {
  return (
    <WalletButton.Custom wallet="readOnly">
      {({ connect, ready, connected }) => {
        const handleClick = async () => {
          try {
            // Exemple avec une adresse fixe
            await setReadOnlyAddress(
              "0x1234567890123456789012345678901234567890"
            );
            await connect();
          } catch (error) {
            console.error("Erreur de connexion:", error);
          }
        };

        return (
          <button
            onClick={handleClick}
            disabled={!ready || connected}
            style={{
              padding: "10px 20px",
              backgroundColor: connected ? "#28a745" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: ready && !connected ? "pointer" : "not-allowed",
            }}
          >
            {connected ? "Connecté" : "Observer un portefeuille"}
          </button>
        );
      }}
    </WalletButton.Custom>
  );
};

/**
 * Exemple d'utilisation avec plusieurs adresses prédéfinies
 */
export const ReadOnlyWalletMultipleExample = () => {
  const predefinedAddresses = [
    { name: "Vitalik Buterin", address: "vitalik.eth" },
    { name: "Ethereum Foundation", address: "ethereum.eth" },
    {
      name: "Example Address",
      address: "0x1234567890123456789012345678901234567890",
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState("");
  const { connect, connectors } = useConnect();

  const readOnlyConnector = connectors.find((c) => c.id === "readOnly");

  const handleConnect = async (addressOrEns: string) => {
    if (!readOnlyConnector) return;

    try {
      setReadOnlyStorage({
        getItem: async (key: string) => localStorage.getItem(key),
        setItem: async (key: string, value: string) =>
          localStorage.setItem(key, value),
        removeItem: async (key: string) => localStorage.removeItem(key),
      });

      if (addressOrEns.startsWith("0x")) {
        await setReadOnlyAddress(addressOrEns as `0x${string}`);
      } else {
        await setReadOnlyEnsName(addressOrEns);
      }

      await connect({ connector: readOnlyConnector });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Portefeuilles prédéfinis</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {predefinedAddresses.map((item, index) => (
          <button
            key={index}
            onClick={() => handleConnect(item.address)}
            style={{
              padding: "10px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <strong>{item.name}</strong>
            <br />
            <small style={{ color: "#6c757d" }}>{item.address}</small>
          </button>
        ))}
      </div>
    </div>
  );
};
