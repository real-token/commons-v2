export enum REALTOKEN_AA_GROUP_NAME {
  AA_ADVANCED = "real_token_aa_advanced",
  EXTERNAL = "real_token_external",
  AA_SOCIALS = "Social logins", // key from aa-core package
  AA_ADVANCED_AND_EXTERNAL = "aa_advanced_and_external",
}

export enum CONNECTOR_CATEGORY {
  AA_SOCIALS = "aa_socials",
  AA_ADVANCED = "aa_advanced",
  EXTERNAL = "external",
}

export const ACCEPTED_GROUP_NAMES: string[] = [
  REALTOKEN_AA_GROUP_NAME.AA_ADVANCED,
  REALTOKEN_AA_GROUP_NAME.AA_SOCIALS,
  REALTOKEN_AA_GROUP_NAME.EXTERNAL,
  REALTOKEN_AA_GROUP_NAME.AA_ADVANCED_AND_EXTERNAL,
];
