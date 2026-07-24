"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface BootContextValue {
  booted: boolean;
  setBooted: (value: boolean) => void;
}

const BootContext = createContext<BootContextValue | null>(null);

export function BootProvider({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);
  return (
    <BootContext.Provider value={{ booted, setBooted }}>{children}</BootContext.Provider>
  );
}

export function useBooted() {
  const ctx = useContext(BootContext);
  if (!ctx) {
    throw new Error("useBooted debe usarse dentro de <BootProvider>");
  }
  return ctx;
}
