import React, { createContext, useContext, ReactNode } from "react";
import { AaModalConfig } from "../types/aaModalConfig";

type AaModalContextType = AaModalConfig;

const AaModalContext = createContext<AaModalContextType | undefined>(undefined);

export const useAaModalConfig = () => {
  const context = useContext(AaModalContext);
  if (context === undefined) {
    throw new Error("useAaModal must be used within an AaModalProvider");
  }
  return context;
};

interface AaModalProviderProps {
  children: ReactNode;
  config: AaModalConfig;
}

export const AaModalProvider: React.FC<AaModalProviderProps> = ({
  children,
  config,
}) => {
  return (
    <AaModalContext.Provider value={config}>{children}</AaModalContext.Provider>
  );
};
