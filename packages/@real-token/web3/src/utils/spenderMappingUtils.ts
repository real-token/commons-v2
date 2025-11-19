import { merge } from "lodash";
import {
  SpenderMapping,
  NetworkSpenderMappings,
} from "../context/RealTokenWeb3ConfigContext";
import defaultMappings from "../config/defaultSpenderMappings";

export function mergeSpenderMappings(
  customMappings: NetworkSpenderMappings = {}
): NetworkSpenderMappings {
  const normalizedDefaults: NetworkSpenderMappings = {};
  const normalizedCustom: NetworkSpenderMappings = {};

  // Normaliser les mappings par défaut (par réseau)
  Object.entries(defaultMappings as NetworkSpenderMappings).forEach(
    ([networkId, networkMappings]) => {
      normalizedDefaults[networkId] = {};
      Object.entries(networkMappings).forEach(([address, mapping]) => {
        normalizedDefaults[networkId][address.toLowerCase()] = mapping;
      });
    }
  );

  // Normaliser les mappings personnalisés (par réseau)
  Object.entries(customMappings).forEach(([networkId, networkMappings]) => {
    normalizedCustom[networkId] = {};
    Object.entries(networkMappings).forEach(([address, mapping]) => {
      normalizedCustom[networkId][address.toLowerCase()] = mapping;
    });
  });

  return merge({}, normalizedDefaults, normalizedCustom);
}

export function getDefaultSpenderMappings(): NetworkSpenderMappings {
  return defaultMappings as NetworkSpenderMappings;
}

export function getDefaultSpenderMappingsForNetwork(
  networkId: string
): SpenderMapping {
  const allDefaults = defaultMappings as NetworkSpenderMappings;
  return allDefaults[networkId] || {};
}

export function hasSpenderMapping(
  address: string,
  mappings: SpenderMapping
): boolean {
  return mappings[address.toLowerCase()] !== undefined;
}

export function getSpenderDisplayName(
  address: string,
  mappings: SpenderMapping
): string {
  const mapping = mappings[address.toLowerCase()];
  if (mapping) {
    return mapping.name;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
