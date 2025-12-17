"use client";

import { Session } from "@/types/session";
import { createContext, useContext } from "react";

export const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children, session }: { children: React.ReactNode, session: Session }) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}