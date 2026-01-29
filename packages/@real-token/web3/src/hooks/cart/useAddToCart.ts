import { useCallback } from "react";
import { useTransactionCart } from "../../context/TransactionCartContext";
import type { AddGroupConfig, TransactionGroup } from "../../types/cart";
import type { AddTransactionParams } from "@real-token/aa-core";

interface UseAddToCartReturn {
  /**
   * Add a group of related transactions to the cart
   * @example
   * addGroup({
   *   label: "Create Offer for RealT-123",
   *   transactions: [approveTransaction, createOfferTransaction],
   * });
   */
  addGroup: (config: AddGroupConfig) => Promise<TransactionGroup>;

  /**
   * Add a single transaction as a standalone group
   * @example
   * addSingleTransaction("Approve USDC", approveTransaction);
   */
  addSingleTransaction: (
    label: string,
    transaction: AddTransactionParams,
    options?: { description?: string; source?: string }
  ) => Promise<TransactionGroup>;

  /**
   * Current number of transactions in the cart
   */
  totalCount: number;

  /**
   * Current number of groups in the cart
   */
  groupCount: number;
}

/**
 * Simplified hook for adding transactions to the cart.
 * Use this in your app components to add transactions to the cart.
 *
 * @example
 * ```tsx
 * const { addGroup, addSingleTransaction } = useAddToCart();
 *
 * // Add a group of related transactions
 * const handleCreateOffer = async () => {
 *   await addGroup({
 *     label: t("cart.createOffer", { token: tokenSymbol }),
 *     transactions: [
 *       {
 *         to: tokenAddress,
 *         data: encodeApprove(yamContract, amount),
 *         value: 0n,
 *       },
 *       {
 *         to: yamContract,
 *         data: encodeCreateOffer(tokenAddress, price, amount),
 *         value: 0n,
 *       },
 *     ],
 *     source: "yam",
 *   });
 * };
 *
 * // Add a single transaction
 * const handleSimpleApprove = async () => {
 *   await addSingleTransaction("Approve USDC", approveTransaction);
 * };
 * ```
 */
export function useAddToCart(): UseAddToCartReturn {
  const { addGroup: contextAddGroup, totalCount, groupCount } = useTransactionCart();

  const addGroup = useCallback(
    async (config: AddGroupConfig): Promise<TransactionGroup> => {
      return contextAddGroup(config);
    },
    [contextAddGroup]
  );

  const addSingleTransaction = useCallback(
    async (
      label: string,
      transaction: AddTransactionParams,
      options?: { description?: string; source?: string }
    ): Promise<TransactionGroup> => {
      return contextAddGroup({
        label,
        transactions: [transaction],
        description: options?.description,
        source: options?.source,
      });
    },
    [contextAddGroup]
  );

  return {
    addGroup,
    addSingleTransaction,
    totalCount,
    groupCount,
  };
}
