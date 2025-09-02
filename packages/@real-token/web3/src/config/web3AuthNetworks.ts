import { RealTokenUiNetworkConfig } from "@real-token/core";
import { LogoProps, NetworkToken } from "@real-token/types";

export interface ExtendedChainConfig extends RealTokenUiNetworkConfig {
  blockExplorerUrl: string;
  isTestnet: boolean;
  graphPrefix?: {
    realToken: string;
    yam: string;
    aaEtherspot?: string;
  };
  nativeToken: NetworkToken;
  regGovernor?: string;
  tokens: NetworkToken[];
  isVisibleOnInterface: boolean;
  v2Logo?: (props: LogoProps) => React.ReactNode;
  logoUrlNetworkId?: string; // for logo
  color?: string;
  coingeckoNetworkId: string;
  serverChainId: string;
}

// export const networks: ExtendedChainConfig[] = [
//   {
//     blockExplorerUrl: "https://sepolia.etherscan.io/",
//     isTestnet: true,
//     decimals: 18,
//     logo: "",
//     chainLogo: EthereumLogo,
//     chainId: "0xaa36a7",
//     serverChainId: "sepolia",
//     displayName: "Sepolia",
//     chainNamespace: "eip155",
//     ticker: "ETH",
//     tickerName: "Sepolia ETH",
//     graphPrefix: {
//       realToken: "realTokenSepolia",
//       yam: "yamSepolia",
//     },
//     regGovernor: "0x7466Fd3Ce12e6aF2F054E462366318D7D7D63756",
//     nativeToken: {
//       name: "Sepolia ETH",
//       symbol: "ETH",
//       address: ZERO_ADDRESS,
//       logo: "/tokens/eth.svg",
//       decimals: 18,
//       priceFnc: {
//         type: "chainlink",
//         contractAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
//       },
//     },
//     tokens: [
//       {
//         name: "USDCRealT",
//         symbol: "USDCRealT",
//         address: "0x803029DB36f37D130d8A005A62c55D17383f6f15",
//         decimals: 6,
//         logo: "/tokens/usdc.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
//         },
//       },
//       {
//         name: "WETHRealT",
//         symbol: "WETHRealT",
//         address: "0xBDAa060F27D00b9e135C005Ae5Ad0F51C8ba4FD9",
//         decimals: 18,
//         logo: "/tokens/weth.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
//         },
//       },
//       {
//         name: "WXDAIRealT",
//         symbol: "WXDAIRealT",
//         address: "0x292C5840EfE7C3282Ad2EB88a53cDBF2841F0917",
//         decimals: 18,
//         logo: "/tokens/wxdai.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19",
//         },
//       },
//       {
//         name: "REG",
//         symbol: "REG",
//         address: "0x79A55e21ac9332C21c4D190B418Ec0AEBE5916a1",
//         decimals: 18,
//         logo: "/tokens/reg.jpg",
//         priceFnc: {
//           type: "coingecko-api",
//         },
//       },
//     ],
//     isVisibleOnInterface: true,
//     v2Logo: EthereumLogo,
//     color: "#444971",
//     coingeckoNetworkId: "xdai",
//   },
//   {
//     wsTarget: gnosisWssUrl,
//     rpcTarget: gnosisRpcUrl,
//     blockExplorerUrl: "https://gnosisscan.io/",
//     isTestnet: false,
//     decimals: 18,
//     logo: "",
//     chainLogo: GnosisLogo,
//     chainId: gnosisChainId,
//     serverChainId: "xdai",
//     displayName: "Gnosis",
//     chainNamespace: "eip155",
//     ticker: "xDai",
//     tickerName: "xDai",
//     graphPrefix: {
//       realToken: "realTokenGnosis",
//       yam: "yamGnosis",
//       aaEtherspot: "aaEtherspotGnosis",
//     },
//     nativeToken: {
//       name: "xDai",
//       symbol: "xDAI",
//       address: ZERO_ADDRESS,
//       decimals: 18,
//       logo: "/tokens/xdai.svg",
//       priceFnc: {
//         type: "chainlink",
//         contractAddress: "0x678df3415fc31947dA4324eC63212874be5a82f8",
//       },
//     },
//     tokens: [
//       {
//         address: "0x0AA1e96D2a46Ec6beB2923dE1E61Addf5F5f1dce",
//         name: "RealToken Ecosystem Governance",
//         symbol: "REG",
//         decimals: 18,
//         logo: "/tokens/reg.jpg",
//         priceFnc: {
//           type: "coingecko-api",
//         },
//       },
//       {
//         name: "RealToken Ecosystem USD",
//         symbol: "REUSD",
//         address: "0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9",
//         logo: "/tokens/realt-token.svg",
//         decimals: 18,
//         priceFnc: {
//           type: "custom-fnc",
//           fnc: () => Promise.resolve(1.0),
//         },
//       },
//       {
//         address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
//         name: "USD//C on xDai",
//         symbol: "USDC",
//         decimals: 6,
//         logo: "/tokens/usdc.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x26C31ac71010aF62E6B486D1132E266D6298857D",
//         },
//       },
//       {
//         address: "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
//         name: "Wrapped XDAI",
//         symbol: "WXDAI",
//         decimals: 18,
//         logo: "/tokens/wxdai.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x678df3415fc31947dA4324eC63212874be5a82f8",
//         },
//       },
//       {
//         address: "0x0cA4f5554Dd9Da6217d62D8df2816c82bba4157b",
//         name: "RealT RMM V3 WXDAI",
//         symbol: "armmv3WXDAI",
//         decimals: 18,
//         logo: "/tokens/armmwxdai.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x678df3415fc31947dA4324eC63212874be5a82f8",
//         },
//       },
//       {
//         address: "0xeD56F76E9cBC6A64b821e9c016eAFbd3db5436D1",
//         name: "RealT RMM V3 USDC",
//         symbol: "armmv3USDC",
//         decimals: 6,
//         logo: "/tokens/usdc.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x26C31ac71010aF62E6B486D1132E266D6298857D",
//         },
//       },
//     ],
//     isVisibleOnInterface: true,
//     v2Logo: GnosisLogo,
//     color: "#81D48A",
//     coingeckoNetworkId: "xdai",
//     logoUrlNetworkId: "gnosis-chain",
//   },
//   {
//     wsTarget: ethWssUrl,
//     rpcTarget: ethRpcUrl,
//     blockExplorerUrl: "https://etherscan.io/",
//     isTestnet: false,
//     decimals: 18,
//     logo: "",
//     chainLogo: EthereumLogo,
//     chainId: "0x1",
//     serverChainId: "eth",
//     displayName: "Ethereum",
//     chainNamespace: "eip155",
//     ticker: "eth",
//     tickerName: "ETH",
//     graphPrefix: {
//       realToken: "realTokenEth",
//       yam: "yamEth",
//     },
//     nativeToken: {
//       name: "eth",
//       symbol: "ETH",
//       address: ZERO_ADDRESS,
//       logo: "/tokens/eth.svg",
//       decimals: 18,
//       priceFnc: {
//         type: "chainlink",
//         contractAddress: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
//       },
//     },
//     tokens: [
//       {
//         address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
//         name: "USDC",
//         symbol: "USDC",
//         decimals: 6,
//         logo: "/tokens/usdc.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
//         },
//       },
//       {
//         name: "RealToken Ecosystem USD",
//         symbol: "REUSD",
//         address: "0x3390742Ac0DCe14EA6Fcbd5Ae02e2303C5D62Ad9",
//         logo: "/tokens/realt-token.svg",
//         decimals: 18,
//         priceFnc: {
//           type: "custom-fnc",
//           fnc: () => Promise.resolve(1.0),
//         },
//       },
//       {
//         address: "0x6b175474e89094c44da98b954eedeac495271d0f",
//         name: "DAI",
//         symbol: "DAI",
//         decimals: 18,
//         logo: "/tokens/dai.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
//         },
//       },
//       {
//         address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
//         name: "Wrapped BTC",
//         symbol: "WBTC",
//         decimals: 8,
//         logo: "/tokens/wbtc.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
//         },
//       },
//       {
//         name: "Tether USDT",
//         symbol: "USDT",
//         address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
//         decimals: 6,
//         logo: "",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
//         },
//       },
//       {
//         name: "Liquity USD",
//         symbol: "LUSD",
//         address: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
//         decimals: 18,
//         logo: "",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x3D7aE7E594f2f2091Ad8798313450130d0Aba3a0",
//         },
//       },
//     ],
//     isVisibleOnInterface: true,
//     v2Logo: EthereumLogo,
//     logoUrlNetworkId: "ethereum",
//     coingeckoNetworkId: "eth",
//   },
//   {
//     wsTarget: baseWssUrl,
//     rpcTarget: baseRpcUrl,
//     blockExplorerUrl: "https://basescan.org/",
//     isTestnet: false,
//     decimals: 18,
//     logo: "",
//     chainLogo: BaseLogo,
//     chainId: "0x2105",
//     serverChainId: "base",
//     displayName: "Base",
//     chainNamespace: "eip155",
//     ticker: "eth",
//     tickerName: "ETH",
//     nativeToken: {
//       name: "eth",
//       symbol: "ETH",
//       address: ZERO_ADDRESS,
//       logo: "/tokens/eth.svg",
//       decimals: 18,
//       priceFnc: {
//         type: "chainlink",
//         contractAddress: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
//       },
//     },
//     tokens: [
//       {
//         address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
//         name: "USDC",
//         symbol: "USDC",
//         decimals: 6,
//         logo: "/tokens/usdc.svg",
//         priceFnc: {
//           type: "chainlink",
//           contractAddress: "0x7e860098F58bBFC8648a4311b374B1D669a2bc6B",
//         },
//       },
//     ],
//     isVisibleOnInterface: false,
//     coingeckoNetworkId: "base",
//   },
// ];
