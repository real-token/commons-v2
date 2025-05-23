import { Website, Websites } from "@/types/websites";
import { Logo } from "../components";

export const availableWebsites: Map<Websites, Website> = new Map([
  [
    Websites.REALT,
    {
      id: Websites.REALT,
      name: "RealT website",
      comingSoon: false,
      url: "https://realt.co/",
      logo: Logo,
    },
  ],
  [
    Websites.YAM,
    {
      id: Websites.YAM,
      name: "YAM",
      comingSoon: false,
      url: "https://yam.realtoken.network/",
      logo: Logo,
    },
  ],
  [
    Websites.RMM,
    {
      id: Websites.RMM,
      name: "RMM",
      comingSoon: false,
      url: "https://rmm.realtoken.network",
      logo: Logo,
    },
  ],
  [
    Websites.VOTE,
    {
      id: Websites.VOTE,
      name: "Vote dashboard",
      comingSoon: false,
      url: "https://vote.realtoken.network",
      logo: Logo,
    },
  ],
  [
    Websites.BRIDGE,
    {
      id: Websites.BRIDGE,
      name: "Bridge",
      comingSoon: false,
      url: "https://bridge.realtoken.network/",
      logo: Logo,
    },
  ],
  [
    Websites.CLAIM,
    {
      id: Websites.CLAIM,
      name: "REG Claim",
      comingSoon: false,
      url: "https://claim.realtoken.network/",
      logo: Logo,
    },
  ],
  [
    Websites.COMMUNITY_DASHBOARD,
    {
      id: Websites.COMMUNITY_DASHBOARD,
      name: "Community Dashboard",
      comingSoon: false,
      url: "https://dashboard.realtoken.network/",
      logo: Logo,
    },
  ],
]);
