import { PublicClient } from "viem";

export async function waitAllTransactionsConfirmed(
  publicClient: PublicClient,
  transactionsHash: `0x${string}`[]
) {
  await Promise.all(
    transactionsHash.map(
      (hash) =>
        new Promise(async (resolve, reject) => {
          const receipt = await publicClient.waitForTransactionReceipt({
            hash,
            confirmations: 3,
          });
          if (receipt.status === "success") return resolve(receipt);
          return reject(new Error("Transaction failed"));
        })
    )
  );
}
