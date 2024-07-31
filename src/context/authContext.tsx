import React, { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    return Cookies.get("token") || null;
  });

  const setToken = (token: string | null) => {
    if (token) {
      Cookies.set("token", token, {
        expires: 1,
        secure: import.meta.env.VITE_NODE_ENV === "production",
        sameSite: "Strict",
      });
      setTokenState(token);
    } else {
      Cookies.remove("token");
      setTokenState(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};