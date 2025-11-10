import { PublicClient } from "viem";

// Standard ERC20 ABI for symbol() and decimals() functions
const ERC20_ABI = [
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

export interface TokenMetadata {
  symbol: string;
  decimals: number;
}

/**
 * Fetches ERC20 token symbol from the blockchain
 */
export async function fetchTokenSymbol(
  tokenAddress: `0x${string}`,
  publicClient: PublicClient
): Promise<string> {
  try {
    const symbol = await publicClient.readContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "symbol",
    });
    return symbol as string;
  } catch (error) {
    console.warn(`Failed to fetch symbol for token ${tokenAddress}:`, error);
    return "Unknown";
  }
}

/**
 * Fetches ERC20 token decimals from the blockchain
 */
export async function fetchTokenDecimals(
  tokenAddress: `0x${string}`,
  publicClient: PublicClient
): Promise<number> {
  try {
    const decimals = await publicClient.readContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "decimals",
    });
    return Number(decimals);
  } catch (error) {
    console.warn(`Failed to fetch decimals for token ${tokenAddress}:`, error);
    return 18; // Default to 18 decimals
  }
}

/**
 * Fetches both symbol and decimals for an ERC20 token
 */
export async function fetchTokenMetadata(
  tokenAddress: `0x${string}`,
  publicClient: PublicClient
): Promise<TokenMetadata> {
  try {
    const [symbol, decimals] = await Promise.all([
      fetchTokenSymbol(tokenAddress, publicClient),
      fetchTokenDecimals(tokenAddress, publicClient),
    ]);

    return {
      symbol,
      decimals,
    };
  } catch (error) {
    console.warn(`Failed to fetch metadata for token ${tokenAddress}:`, error);
    return {
      symbol: "Unknown",
      decimals: 18,
    };
  }
}

/**
 * Formats token amount using decimals for human-readable display
 */
export function formatTokenAmount(
  amount: string,
  decimals: number,
  symbol?: string
): string {
  try {
    const divisor = BigInt(10 ** decimals);
    const amountBigInt = BigInt(amount);
    
    // Convert to decimal representation
    const wholePart = amountBigInt / divisor;
    const fractionalPart = amountBigInt % divisor;
    
    let formattedAmount: string;
    
    if (fractionalPart === BigInt(0)) {
      formattedAmount = wholePart.toString();
    } else {
      // Convert fractional part to string with leading zeros
      const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
      // Remove trailing zeros
      const trimmedFractional = fractionalStr.replace(/0+$/, '');
      formattedAmount = trimmedFractional 
        ? `${wholePart.toString()}.${trimmedFractional}`
        : wholePart.toString();
    }
    
    return symbol ? `${formattedAmount} ${symbol}` : formattedAmount;
  } catch (error) {
    console.warn(`Failed to format amount ${amount} with ${decimals} decimals:`, error);
    return symbol ? `${amount} ${symbol}` : amount;
  }
}
