import { MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export const ColorSchemeManager = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const [cookies, setCookie] = useCookies(["mantine-color-scheme"]);

  useEffect(() => {
    const themeColor = (cookies["mantine-color-scheme"] ||
      "dark") as MantineColorScheme;
    setColorScheme(themeColor);
  }, []);

  const toggleColorScheme = (
    nextColorScheme: MantineColorScheme = colorScheme === "dark"
      ? "light"
      : "dark"
  ) => {
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme);
  };

  return null;
};
