import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import { resources } from "../locales";
import { I18nextProvider, initReactI18next } from "react-i18next";

export const COOKIE_NAME = "aa-modal-locale";

const languageDetector = new LngDetector(null, {
  convertDetectedLanguage: "Iso15897",
});

// Singleton implementation
let i18nextAaModalInstance: typeof i18next | null = null;

export const getI18nextInstance = () => {
  if (i18nextAaModalInstance === null) {
    i18nextAaModalInstance = i18next.createInstance();
    i18nextAaModalInstance
      .use(initReactI18next)
      .use(languageDetector)
      .init({
        resources: resources,
        defaultNS: "en",
        fallbackLng: "en",
        debug: false,
        interpolation: {
          escapeValue: false,
        },
        initImmediate: false,
        detection: {
          // Order of detection - check cookie first, then navigator (browser)
          order: ["cookie", "navigator"],
          lookupCookie: COOKIE_NAME,
          cookieOptions: {
            path: "/",
            sameSite: "strict",
          },
        },
        load: "languageOnly",
        nonExplicitSupportedLngs: true,
        supportedLngs: ["en", "fr", "es"],
      });
  }

  return i18nextAaModalInstance;
};

// Initialize the instance
const i18n = getI18nextInstance();

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
