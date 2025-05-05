"use client";

import { createContext, ReactNode, useState } from "react";

interface UserContextType {
  email: string | undefined;
  emailHandler: (email: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const emailHandler = (email: string) => {
    setEmail(email);
  };

  const value = {
    email,
    emailHandler,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
