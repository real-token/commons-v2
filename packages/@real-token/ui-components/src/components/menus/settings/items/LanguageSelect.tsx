import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Combobox,
  Flex,
  Input,
  InputBase,
  Menu,
  Text,
  useCombobox,
} from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useCookies } from "react-cookie";
import { US, FR, ES, FlagComponent } from "country-flag-icons/react/3x2";

interface Language {
  image: FlagComponent;
  label: string;
  value: string;
}

export const LanguageSelect = () => {
  const { i18n, t } = useTranslation("common", { keyPrefix: "settings" });

  const [_, setCookie] = useCookies(["react-i18next"]);

  const updateLocale = useCallback(
    (updatedLocale: string | null) => {
      if (updatedLocale && i18n.language !== updatedLocale) {
        setCookie("react-i18next", updatedLocale);
        i18n.changeLanguage(updatedLocale);
      }
    },
    [i18n]
  );

  const data: Language[] = useMemo(
    () => [
      { value: "en", label: t("english") ?? "", image: US },
      { value: "fr", label: t("french") ?? "", image: FR },
      { value: "es", label: t("spanish") ?? "", image: ES },
    ],
    [t]
  );

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = data.map(({ image: Image, value, label }) => (
    <Combobox.Option value={value} key={value}>
      <Flex gap={10} align={"center"}>
        <Image style={{ width: "1.3rem" }} />
        <Text>{label}</Text>
      </Flex>
    </Combobox.Option>
  ));

  return (
    <>
      <Menu.Label pb={0}>{t("title")}</Menu.Label>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          updateLocale(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type={"button"}
            pointer
            rightSection={<Combobox.Chevron />}
            leftSection={<IconLanguage size={16} />}
            onClick={() => combobox.toggleDropdown()}
          >
            {i18n.language ? (
              <Text>
                {`${i18n.language}`}
                {data.find((lng) => lng.value == i18n.language)?.label ??
                  i18n.language}
              </Text>
            ) : (
              <Input.Placeholder>Pick value</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};
