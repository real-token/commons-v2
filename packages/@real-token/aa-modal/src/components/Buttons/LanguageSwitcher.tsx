import { useMemo, useState } from "react";
import { Combobox, Flex, InputBase, useCombobox } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { COOKIE_NAME, getI18nextInstance } from "../TranslationProvider";

export const LanguageSwitcher = () => {
  const { t } = useTranslation("main");

  const i18n = getI18nextInstance();

  const [value, setValue] = useState<string | null>(i18n.language);

  const languages = useMemo(() => {
    return [
      {
        countryCode: "us",
        lng: "en",
        label: t("languageSwitcher.en"),
      },
      {
        countryCode: "es",
        lng: "es",
        label: t("languageSwitcher.es"),
      },
      {
        countryCode: "fr",
        lng: "fr",
        label: t("languageSwitcher.fr"),
      },
    ];
  }, [t]);

  const selectedItem = languages.find((item) => item.lng === value);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = languages.map((item) => (
    <Combobox.Option
      value={item.countryCode}
      key={item.countryCode}
      onClick={() => {
        i18n.changeLanguage(item.lng);
        document.cookie = `${COOKIE_NAME}=${item.lng}; path=/`;
        combobox.closeDropdown();
      }}
      selected={selectedItem?.lng === item.lng}
    >
      <Flex gap={4}>
        <ReactCountryFlag
          countryCode={item.countryCode}
          style={{
            fontSize: "1.5em",
          }}
        />
        {item.label}
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
      position={"bottom-end"}
      width={"fit-content"}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          onClick={() => {
            combobox.toggleDropdown();
          }}
        >
          <ReactCountryFlag
            countryCode={selectedItem?.countryCode ?? "us"}
            style={{
              fontSize: "1.5em",
            }}
          />
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
