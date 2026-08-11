import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { CurrentUser } from "../types/auth.types";
import { login as loginApi } from "../api/authApi";
import { tokenStorage } from "../../../utils/token";
import {
  getUserFromToken,
  isTokenExpired,
} from "../../../utils/jwt";

interface AuthContextValue {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = tokenStorage.getToken();

    if (!token || isTokenExpired(token)) {
      tokenStorage.removeToken();
      setUser(null);
      setIsLoading(false);
      return;
    }

    const currentUser = getUserFromToken(token);

    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<void> => {
    const response = await loginApi({
      username,
      password,
    });

    tokenStorage.setToken(response.jwtToken);

    const currentUser = getUserFromToken(response.jwtToken);

    setUser(currentUser);
  };

  const logout = () => {
    tokenStorage.removeToken();
    setUser(null);
  };

  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthProvider"
    );
  }

  return context;
};