import { initReactI18next } from "react-i18next";
import i18next, { Resource, i18n } from "i18next";
import { resources as localResources } from "./locales";
import { mergeResources } from "i18next-resources-for-ts";
import LanguageDetector from "i18next-browser-languagedetector";
import { Cookies } from "react-cookie";

export const DEFAULT_NS = "common";
export const FALLBACK_LNG = "en";
export const COOKIE_NAME = "react-i18next";

interface InitLanguageProps {
  resources?: Resource;
  debug?: boolean;
}
const initLanguage = ({
  resources,
  debug = false,
}: InitLanguageProps): i18n => {
  const mergedRessources = mergeResources(localResources);

  // Create detection options with cookie detection first, then browser
  const cookies = new Cookies();

  i18next
    .use(initReactI18next)
    // Add language detector
    .use(LanguageDetector)
    .init({
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
    });

  if (resources) {
    // language
    for (const [lng, lngResources] of Object.entries(resources)) {
      // namespace
      for (const [namespace, nsResources] of Object.entries(lngResources)) {
        // console.log(`${namespace}: ${resources}`);
        i18next.addResourceBundle(lng, namespace, nsResources);
      }
    }
  }

  return i18next;
};

export { initLanguage };
