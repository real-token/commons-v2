import en from "./en";
import es from "./es";
import fr from "./fr";

export const resources = [
  {
    name: "en",
    resources: en,
  },
  {
    name: "es",
    resources: es,
  },
  {
    name: "fr",
    resources: fr,
  },
];

export const SUPPORTED_LNG = resources.map((lng) => lng.name);
