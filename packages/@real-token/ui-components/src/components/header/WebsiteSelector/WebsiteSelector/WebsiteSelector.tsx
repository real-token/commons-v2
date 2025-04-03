import { Flex, Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { Website, Websites } from "@/types";
import { availableWebsites } from "@/config";
import { WebsitePane } from "../WebsitePane/WebsitePane";
import classes from "./WebsiteSelector.module.css";

interface WebsiteSelectorProps {
  current?: Websites;
  newWebsite?: Website;
  isDisabled?: boolean;
}
export const WebsiteSelector = ({
  current,
  newWebsite,
  isDisabled = false,
}: WebsiteSelectorProps) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const currentWebsite =
    newWebsite ?? (current ? availableWebsites.get(current) : undefined);

  if (!currentWebsite) return <></>;

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => {
        if (!isDisabled) setMenuOpened(true);
      }}
      onMouseLeave={() => {
        if (!isDisabled) setMenuOpened(false);
      }}
    >
      <Flex
        align={"center"}
        justify={"center"}
        p={10}
        pl={0}
        gap={"sm"}
        style={{
          minWidth: "320px",
          backgroundColor:
            menuOpened && !isDisabled
              ? "var(--mantine-color-brand-9)"
              : "transparent",
        }}
        data-disabled={isDisabled}
        className={classes.currentWebsiteContainer}
      >
        {!isDisabled ? (
          <IconChevronRight
            style={{
              transform:
                menuOpened && !isDisabled ? "rotate(90deg)" : "rotate(0)",
              transition: "all 0.3s ease-in-out",
            }}
          />
        ) : undefined}
        {/* { currentWebsite.logo ? React.createElement(currentWebsite.logo) : undefined } */}
        <Title
          order={3}
          className={
            menuOpened ? classes.websiteName_MenuOpened : classes.websiteName
          }
        >
          {currentWebsite.name}
        </Title>
      </Flex>
      <Flex
        direction={"column"}
        className={classes.websiteContainer}
        style={{
          backgroundColor:
            menuOpened && !isDisabled
              ? "var(--mantine-color-brand-9)"
              : "transparent",
          visibility: menuOpened ? "inherit" : "hidden",
          borderTop: `2px solid ${
            menuOpened && !isDisabled ? "black" : "var(--mantine-color-brand-9)"
          }`,
        }}
      >
        {Array.from(availableWebsites.values())
          .filter((website) => website.id !== current)
          .map((website) => (
            <WebsitePane key={website.id} website={website} />
          ))}
      </Flex>
    </div>
  );
};
