import { useMemo } from "react";

export const useExtractMessageFromTypedData = (typedData: string) => {
  return useMemo(() => {
    try {
      return JSON.parse(typedData).message;
    } catch (error) {
      console.error(error);
    }
  }, [typedData]);
};
