import { useCookies } from "react-cookie";
import { FC, PropsWithChildren, useEffect } from "react";
import i18next, { i18n } from "i18next";
import { COOKIE_NAME, FALLBACK_LNG } from "./config";

interface LanguageInitProps extends PropsWithChildren {
  i: i18n;
}
export const LanguageInit: FC<LanguageInitProps> = ({ i, children }) => {
  const [cookies] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    // Check if there's a saved language in cookie
    const savedLanguage = cookies[COOKIE_NAME];

    if (savedLanguage && i.language !== savedLanguage) {
      // If there's a saved language and it's different from current, use it
      i.changeLanguage(savedLanguage);
    } else if (!savedLanguage && i.services?.languageDetector) {
      // If no saved language, let the detector handle it
      const detectedLanguage = i.services.languageDetector.detect();
      if (detectedLanguage && i.language !== detectedLanguage) {
        i.changeLanguage(detectedLanguage);
      }
    }
  }, [i, cookies]);

  return null;
};
