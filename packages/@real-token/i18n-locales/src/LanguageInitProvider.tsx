import { useCookies } from "react-cookie";
import { FC, useEffect } from "react";
import { i18n } from "i18next";

interface LanguageInitProps {
  i: i18n;
}
export const LanguageInit: FC<LanguageInitProps> = ({ i }) => {
  const [cookies] = useCookies(["react-i18next"]);

  const lng = cookies["react-i18next"] || "en";

  useEffect(() => {
    if (i.language !== lng) {
      i.changeLanguage(lng);
    }
  }, [i, lng]);

  return null;
};
