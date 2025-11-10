import { Address, PublicClient, SignTypedDataParameters, toHex } from "viem";
import { coinBridgeTokenABI } from "../../abis";

// This function is used for general tokens with permit function
const erc20PermitSignature = async (
  owner: Address,
  spender: Address,
  amount: string,
  transactionDeadline: number,
  contractAddress: Address,
  publicClient: PublicClient,
  noncesFunctionName?: "nonces" | "_nonces"
): Promise<Omit<SignTypedDataParameters, "account" | "connector">> => {
  // const transactionDeadline = Date.now() + 3600; // permit valable during 1h

  let nonce = await publicClient.readContract({
    address: contractAddress,
    abi: coinBridgeTokenABI,
    functionName: noncesFunctionName || "nonces",
    args: [owner],
  });

  let version = undefined;
  try {
    version = await publicClient.readContract({
      address: contractAddress,
      abi: coinBridgeTokenABI,
      functionName: "version",
    });
  } catch (e) {
    console.error(e);
    console.log("No version function in contract.");
    try {
      version = await publicClient.readContract({
        address: contractAddress,
        abi: coinBridgeTokenABI,
        functionName: "eip712Domain",
      });
    } catch (e) {
      console.error(e);
      console.log("No eip712Domain function in contract.");
      throw Error("Cannot get permit version from contract.");
    }
  }

  let VERSION = undefined;
  try {
    VERSION = await publicClient.readContract({
      address: contractAddress,
      abi: coinBridgeTokenABI,
      functionName: "VERSION",
    });
  } catch (e) {
    console.log("No VERSION function in contract.");
  }

  let revision = undefined;
  try {
    revision = await publicClient.readContract({
      address: contractAddress,
      abi: coinBridgeTokenABI,
      functionName: "EIP712_REVISION",
    });
  } catch (e) {
    console.error(e);
    console.log("No EIP712_REVISION function in contract.");
  }

  if (!version && !VERSION && !revision)
    throw Error("Cannot get permit version from contract.");

  const contractName = await publicClient.readContract({
    address: contractAddress,
    abi: coinBridgeTokenABI,
    functionName: "name",
  });
  const rightVersion = version ?? VERSION ?? revision;

  const EIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ];
  const domain = {
    name: contractName,
    version: rightVersion.toString(),
    chainId: publicClient.chain?.id,
    verifyingContract: contractAddress,
  };
  const Permit = [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ];
  const message = {
    owner,
    spender,
    value: amount.toString(),
    nonce: toHex(BigInt(nonce)),
    deadline: transactionDeadline,
  };

  const data = {
    types: {
      EIP712Domain,
      Permit,
    },
    domain,
    primaryType: "Permit",
    message,
  };

  return data;
};

export default erc20PermitSignature;
