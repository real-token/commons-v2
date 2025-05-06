import { Text } from "@mantine/core";
import { IconClock, IconExternalLink } from "@tabler/icons-react";
import { FC, useState } from "react";
import { openInNewTab } from "@/utils";
import { Website } from "@/types";
import styles from "./WebsitePane.module.css";
import clsx from "clsx";

export interface WebsitePaneProps {
  website: Website;
}

export const WebsitePane: FC<WebsitePaneProps> = ({ website }) => {
  const comingSoon = website.comingSoon;
  const [hovered, setHovered] = useState<boolean>(false);

  const Logo = website.logo;

  const goTo = () => {
    if (website.comingSoon) return;
    openInNewTab(website.url);
  };

  const setH = (state: boolean) => {
    if (comingSoon) return;
    setHovered(state);
  };

  const containerClassName = clsx(
    styles.container,
    hovered && styles.containerHovered,
    comingSoon && styles.comingSoonContainer
  );

  const websiteNameClassName = clsx(
    styles.websiteName,
    hovered && styles.websiteNameHovered
  );

  return (
    <div
      className={containerClassName}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={() => goTo()}
    >
      {comingSoon ? (
        <div className={styles.comingSoonOverlay}>
          <Text>{"Coming soon"}</Text>
          <IconClock />
        </div>
      ) : undefined}
      {/* { website.chainLogo ? React.createElement(website.chainLogo) : undefined } */}
      <div className={websiteNameClassName} data-title={website.name}>
        {website.name}
      </div>
      <IconExternalLink color={hovered ? "black" : "white"} />
    </div>
  );
};
