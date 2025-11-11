import { Avatar, Button, Flex, Image } from "@mantine/core";
import { CustomDrawer } from "../CustomDrawer/CustomDrawer";
import { AaWalletExternal } from "@real-token/web3";
import { useTranslation } from "react-i18next";
import {
  BrowserType,
  DeviceAndBrowserInfo,
  DeviceType,
} from "../../hooks/useDeviceAndBrowserDetection";

const getBrowserExtensionUrl = (browserType: BrowserType, walletId: string) => {
  if (walletId?.startsWith("https://")) return walletId;
  switch (browserType) {
    case BrowserType.CHROME:
      return `https://chrome.google.com/webstore/detail/${walletId}`;
    case BrowserType.FIREFOX:
      return `https://addons.mozilla.org/firefox/addon/${walletId}`;
    case BrowserType.EDGE:
      return `https://microsoftedge.microsoft.com/addons/detail/${walletId}`;
    default:
      return null;
  }
};

const getMobileInstallLink = (os: DeviceType, appId: string) => {
  if (appId?.includes("https://")) {
    return appId;
  }
  switch (os) {
    case DeviceType.ANDROID:
      return `https://play.google.com/store/apps/details?id=${appId}`;
    case DeviceType.IOS:
      return `https://apps.apple.com/app/safepal-wallet/${appId}`;
    default:
      return "";
  }
};

const mobileApp = [DeviceType.ANDROID, DeviceType.IOS];
const desktopLink = [BrowserType.CHROME, BrowserType.FIREFOX, BrowserType.EDGE];

export const MobileWalletInstallationButton = ({
  wallet,
  device,
  show,
  name,
}: {
  wallet: AaWalletExternal | null;
  device: DeviceAndBrowserInfo;
  show: boolean;
  name: string;
}) => {
  const { t } = useTranslation("main", {
    keyPrefix: "walletInstallationDrawer",
  });
  const type = mobileApp.includes(device.deviceType)
    ? "mobile"
    : desktopLink.includes(device.browserType)
      ? "desktop"
      : undefined;

  const onClick = async () => {
    const app = wallet?.app[name as keyof typeof wallet.app];

    if (!app) return;
    const url =
      type == "mobile"
        ? getMobileInstallLink(device.deviceType, app)
        : type == "desktop"
          ? getBrowserExtensionUrl(device.browserType, app)
          : undefined;
    if (!url) return;
    window.open(url, "_blank");
  };

  if (!show) return null;
  return (
    <Button
      fullWidth
      onClick={onClick}
      leftSection={
        <>
          <Image
            lightHidden
            src={`https://images.web3auth.io/${device}-light.svg`}
          />
          <Image
            darkHidden
            src={`https://images.web3auth.io/${device}-dark.svg`}
          />
        </>
      }
    >
      {type == "mobile"
        ? t("installMobile", { name })
        : t("installDesktop", { name })}
    </Button>
  );
};

export const WalletInstallationDrawer = ({
  opened,
  setOpened,
  wallet,
  device,
}: {
  opened: boolean;
  setOpened: (value: boolean) => void;
  wallet: AaWalletExternal | null;
  device: DeviceAndBrowserInfo;
}) => {
  const { t } = useTranslation("main", {
    keyPrefix: "walletInstallationDrawer",
  });
  if (!wallet) return null;
  return (
    <CustomDrawer
      isOpen={opened}
      onClose={() => setOpened(false)}
      title={t("title")}
    >
      <Flex direction={"column"} gap={"md"} align={"center"}>
        <Avatar src={wallet.logo} size={"xl"} />
        {Object.keys(wallet.app).map((key) => (
          <MobileWalletInstallationButton
            wallet={wallet}
            device={device}
            show={key == device.deviceType || key == device.browserType}
            name={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
      </Flex>
    </CustomDrawer>
  );
};
