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
    // Si la langue n'est pas correcte (ex: "en" par défaut SSR), i18next la détecte côté client automatiquement
    if (
      !cookies[COOKIE_NAME] &&
      i18next.language !== i18next.services.languageDetector.detect()
    ) {
      i18next.changeLanguage(i18next.services.languageDetector.detect());
    }
  }, [cookies]);

  // useEffect(() => {
  //   const lng = cookies[COOKIE_NAME] || FALLBACK_LNG;
  //   if (i.language !== lng) {
  //     i.changeLanguage(lng);
  //   }
  // }, [i, cookies]);

  return null;
};
