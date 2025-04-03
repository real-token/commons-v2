import { Website, Websites } from "@/types/index";
import { WebsiteSelector } from "@/components/header/WebsiteSelector";
import { MobileHeaderWrapper } from "@/components/header/MobileHeaderWrapper/MobileHeaderWrapper";
import { HeaderButtons } from "@/components/header/headerComponents/HeaderButtons";
import { Divider } from "@/components/divider";
import { UnsuportedNetworkBanner } from "@/components/unsuportedNetworkBanner/UnsuportedNetworkBanner";

interface HeaderProps {
  headerNav?: React.ReactElement;
  currentWebsite?: Websites;
  newWebsite?: Website;
  disableHeaderMultisite?: boolean;
  banner?: React.ReactElement;
}
export function Header({
  currentWebsite,
  newWebsite,
  headerNav,
  disableHeaderMultisite = false,
  banner,
}: HeaderProps) {
  if (disableHeaderMultisite && !newWebsite)
    throw new Error(
      "Cannot use disableHeaderMultisite whitout setting newWebsite parameter."
    );

  return (
    <>
      {banner ? banner : undefined}
      <UnsuportedNetworkBanner />
      <MobileHeaderWrapper
        selector={
          <WebsiteSelector
            current={currentWebsite}
            newWebsite={newWebsite}
            isDisabled={disableHeaderMultisite}
          />
        }
        nav={headerNav ?? undefined}
        buttons={<HeaderButtons />}
      />
      <Divider />
    </>
  );
}
