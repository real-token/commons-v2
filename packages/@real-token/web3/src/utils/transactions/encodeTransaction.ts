import {
  Abi,
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from "abitype";
import { encodeFunctionData } from "viem";

export function encodeTransaction<
  abi extends Abi,
  functionName extends ExtractAbiFunctionNames<abi, "nonpayable" | "payable">,
  abiFunction extends AbiFunction = ExtractAbiFunction<abi, functionName>,
>(params: {
  abi: abi;
  functionName: functionName;
  args: AbiParametersToPrimitiveTypes<abiFunction["inputs"], "inputs">;
}) {
  return encodeFunctionData({
    abi: params.abi as Abi,
    functionName: params.functionName as string,
    args: params.args as any,
  });
}
