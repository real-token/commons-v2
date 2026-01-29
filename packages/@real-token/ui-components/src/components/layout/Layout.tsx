import { ReactNode } from "react";
import { Footer, FooterParam, Header } from "@/components";
import classes from "./Layout.module.css";
import { Website, Websites } from "@/types";

export type HeaderConfig = {
  nav?: React.ReactElement;
  banner?: React.ReactElement;
  buttons?: React.ReactElement;
  currentWebsite?: Websites;
  newWebsite?: Website;
  disableMultisite?: boolean;
  disableWalletConnect?: boolean;
};

type LayoutProps = {
  children: ReactNode;
  header?: HeaderConfig;
  head?: React.ReactElement;
  footerParam?: FooterParam;
  footerCustomLinks?: JSX.Element;
};

export function Layout({
  children,
  header,
  head,
  footerParam,
  footerCustomLinks,
}: LayoutProps) {
  return (
    <div className={classes.container}>
      {head ?? undefined}
      <Header
        currentWebsite={header?.currentWebsite}
        newWebsite={header?.newWebsite}
        headerNav={header?.nav}
        disableHeaderMultisite={header?.disableMultisite}
        disableWalletConnect={header?.disableWalletConnect}
        banner={header?.banner}
        headerButtons={header?.buttons}
      />
      <div className={classes.main}>{children}</div>
      <Footer param={footerParam} customLinks={footerCustomLinks} />
    </div>
  );
}
