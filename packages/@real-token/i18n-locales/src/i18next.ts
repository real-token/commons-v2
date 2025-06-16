import { initReactI18next } from "react-i18next";
import { Resource, createInstance, i18n } from "i18next";
import { resources as localResources } from "./locales";
import { mergeResources } from "i18next-resources-for-ts";
import LanguageDetector from "i18next-browser-languagedetector";

export const DEFAULT_NS = "common";
export const FALLBACK_LNG = "en";
export const COOKIE_NAME = "commons-v2-locale";

interface InitLanguageProps {
  resources?: Resource;
  debug?: boolean;
}
const initLanguage = ({
  resources,
  debug = false,
}: InitLanguageProps): i18n => {
  const mergedRessources = mergeResources(localResources);

  const i18n = createInstance();
  i18n.init({
    resources: mergedRessources,
    defaultNS: DEFAULT_NS,
    fallbackLng: FALLBACK_LNG,
    debug,
    interpolation: {
      escapeValue: false,
    },

    // Configure language detection
    detection: {
      // Order of detection - check cookie first, then navigator (browser)
      order: ["cookie", "navigator"],
      // Cookie configuration
      lookupCookie: COOKIE_NAME,
      cookieOptions: {
        path: "/",
        sameSite: "strict",
      },
    },
    // Map fr-FR to fr to ensure consistent language handling
    load: "languageOnly",
    // Normalize language codes to handle fr-FR as fr
    nonExplicitSupportedLngs: true,
    supportedLngs: ["en", "fr", "es"],
  });

  if (resources) {
    // language
    for (const [lng, lngResources] of Object.entries(resources)) {
      // namespace
      for (const [namespace, nsResources] of Object.entries(lngResources)) {
        // console.log(`${namespace}: ${resources}`);
        i18n.addResourceBundle(lng, namespace, nsResources);
      }
    }
  }

  i18n.use(initReactI18next).use(LanguageDetector);
  return i18n;
};

export { initLanguage };
