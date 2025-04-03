import { FC } from "react";

export enum Websites {
  REALT,
  COMMUNITY_DASHBOARD,
  VOTE,
  YAM,
  BRIDGE,
  RMM,
  EXAMPLE,
  CLAIM,
}

export interface Website {
  id?: Websites;
  name: string;
  url: string;
  comingSoon: boolean;
  logo: FC<any> | undefined;
}
