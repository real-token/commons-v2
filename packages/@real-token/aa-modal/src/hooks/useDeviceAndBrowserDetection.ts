import { useMemo } from "react";

export enum DeviceType {
  IOS = "ios",
  ANDROID = "android",
  DESKTOP = "desktop",
}

export enum BrowserType {
  CHROME = "chrome",
  FIREFOX = "firefox",
  EDGE = "edge",
  OTHER = "other",
}

export interface DeviceAndBrowserInfo {
  deviceType: DeviceType;
  browserType: BrowserType;
  userAgent: string;
}

export const useDeviceAndBrowserDetection = (): DeviceAndBrowserInfo => {
  return useMemo(() => {
    const userAgent = navigator.userAgent;

    // Détection du type d'appareil
    let deviceType: DeviceType;
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      deviceType = DeviceType.IOS;
    } else if (/Android/.test(userAgent)) {
      deviceType = DeviceType.ANDROID;
    } else {
      deviceType = DeviceType.DESKTOP;
    }

    // Détection du type de navigateur
    let browserType: BrowserType;
    if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
      // Chrome (mais pas Edge qui contient aussi "Chrome" dans son user agent)
      browserType = BrowserType.CHROME;
    } else if (/Firefox/.test(userAgent)) {
      browserType = BrowserType.FIREFOX;
    } else if (/Edg/.test(userAgent)) {
      // Safari (mais pas Chrome qui contient aussi "Safari" dans son user agent)
      browserType = BrowserType.EDGE;
    } else {
      browserType = BrowserType.OTHER;
    }

    return {
      deviceType,
      browserType,
      userAgent,
    };
  }, []);
};
