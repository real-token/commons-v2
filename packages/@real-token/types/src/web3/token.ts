export type NetworkToken = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
  priceFnc:
    | {
        type: "coingecko-api";
      }
    | {
        type: "chainlink";
        contractAddress: string;
      }
    | {
        type: "custom-fnc";
        fnc: () => Promise<number>;
      };
};

export type NetworkTokenChainLink = NetworkToken & {
  priceFnc: {
    type: "chainlink";
    contractAddress: string;
  };
};

export type NetworkTokenCoingecko = NetworkToken & {
  priceFnc: {
    type: "coingecko-api";
    address?: string;
  };
};

export type NetworkTokenCustomFnc = NetworkToken & {
  priceFnc: {
    type: "custom-fnc";
    fnc: () => Promise<number>;
  };
};
