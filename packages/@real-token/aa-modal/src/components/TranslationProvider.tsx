import i18next from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import { resources } from "../locales";
import { I18nextProvider, initReactI18next } from "react-i18next";

export const COOKIE_NAME = "react-i18next";
const i18nextAaModalInstance = i18next.createInstance();
i18nextAaModalInstance
  .use(initReactI18next)
  // Add language detector
  .use(LngDetector)
  .init({
    resources: resources,
    defaultNS: "en",
    fallbackLng: "en",
    debug: true,
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

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <I18nextProvider i18n={i18nextAaModalInstance}>{children}</I18nextProvider>
  );
};
