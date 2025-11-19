import { NetworkSpenderMappings } from "../context";
import { NetworkId } from "@real-token/core";

const defaultSpenderMappings: NetworkSpenderMappings = {
  [NetworkId.sepolia]: {
    "0x1d27e09c95422629a88b865026bfb270eed7bc18": {
      name: "YAM (You & Me)",
    },
  },
  [NetworkId.ethereum]: {
    "0xC759AA7f9dd9720A1502c104DaE4F9852bb17C14": {
      name: "YAM (You & Me)",
    },
  },
  [NetworkId.gnosis]: {
    "0xC759AA7f9dd9720A1502c104DaE4F9852bb17C14": {
      name: "YAM (You & Me)",
    },
  },
} as const;

export default defaultSpenderMappings;
