import {
  BaseTransaction,
  DynamicTransaction,
  BaseTransactionContext,
} from "./types";

/**
 * Evaluates the skip condition for a transaction
 * Returns true if the transaction should be skipped
 */
export async function shouldSkipTransaction<T = BaseTransactionContext>(
  transaction: BaseTransaction | DynamicTransaction<T>,
  context?: T
): Promise<boolean> {
  const { skipCondition } = transaction;

  if (skipCondition === undefined) {
    return false; // No skip condition, proceed with transaction
  }

  if (typeof skipCondition === "boolean") {
    return skipCondition;
  }

  if (typeof skipCondition === "function") {
    // Check if function expects context parameter
    if (skipCondition.length > 0 && context !== undefined) {
      // Function expects context parameter
      const result = (skipCondition as any)({ context });
      return await Promise.resolve(result);
    } else {
      // Function expects no parameters
      const result = (skipCondition as any)();
      return await Promise.resolve(result);
    }
  }

  return false;
}
