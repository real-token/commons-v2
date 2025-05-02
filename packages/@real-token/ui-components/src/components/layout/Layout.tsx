import { ReactNode } from "react";
import { Footer, FooterParam, Header } from "@/components";
import classes from "./Layout.module.css";
import { Website, Websites } from "@/types";

type LayoutProps = {
  children: ReactNode;
  headerNav?: React.ReactElement;
  disableHeaderMultisite?: boolean;
  head?: React.ReactElement;
  currentWebsite?: Websites;
  newWebsite?: Website;
  footerParam?: FooterParam;
  footerCustomLinks?: JSX.Element;
  headerBanner?: React.ReactElement;
  headerButtons?: React.ReactElement;
};

export function Layout({
  children,
  currentWebsite,
  newWebsite,
  headerNav,
  head,
  disableHeaderMultisite,
  footerParam,
  footerCustomLinks,
  headerBanner,
  headerButtons,
}: LayoutProps) {
  return (
    <div className={classes.container}>
      {head ?? undefined}
      <Header
        currentWebsite={currentWebsite}
        newWebsite={newWebsite}
        headerNav={headerNav}
        disableHeaderMultisite={disableHeaderMultisite}
        banner={headerBanner}
        headerButtons={headerButtons}
      />
      <div className={classes.main}>{children}</div>
      <Footer param={footerParam} customLinks={footerCustomLinks} />
    </div>
  );
}
