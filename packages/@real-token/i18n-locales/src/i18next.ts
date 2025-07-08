import { initReactI18next } from "react-i18next";
import { Resource, i18n as I18nType } from "i18next";
import { resources as localResources, SUPPORTED_LNG } from "./locales";
import { mergeResources } from "i18next-resources-for-ts";
import { COOKIE_NAME, DEFAULT_NS, FALLBACK_LNG } from "./config";
import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";

interface InitLanguageProps {
  lng?: string;
  resources?: Resource;
  debug?: boolean;
  plugins?: any[];
}
const initLanguage = ({
  lng = FALLBACK_LNG,
  resources,
  debug = false,
}: InitLanguageProps): I18nType => {
  if (!i18next.isInitialized) {
    const mergedRessources = mergeResources(localResources);
    const languageDetector = new LngDetector(null);

    i18next
      .use(languageDetector)
      .use(initReactI18next)
      .init({
        lng,
        resources: mergedRessources,
        defaultNS: DEFAULT_NS,
        fallbackLng: FALLBACK_LNG,
        debug,
        interpolation: {
          escapeValue: false,
        },
        load: "languageOnly",
        nonExplicitSupportedLngs: true,
        supportedLngs: SUPPORTED_LNG,
        cleanCode: true,
        initImmediate: false,
        detection: {
          order: ["cookie", "navigator"],
          lookupCookie: COOKIE_NAME,
          cookieOptions: {
            path: "/",
            sameSite: "strict",
            // Cookie expires in 1 year
            maxAge: 365 * 24 * 60 * 60,
          },
          caches: ["cookie"],
          convertDetectedLanguage: (lng: string) => {
            console.log("convertDetectedLanguage", lng);
            return lng.split("-")[0].toLowerCase();
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

    // Debug language detection
    if (debug) {
      i18next.on("languageChanged", (lng) => {
        console.log(`Commons v2 Language changed to: ${lng}`);
      });
    }
  }

  return i18next;
};

export { initLanguage };
