import Cookies from "js-cookie";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { User } from "@/types/api/user";
import { clientAxios } from "@/utils/clientAxios";
import { API_ROUTES } from "@/constants/routes";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "@/constants/jwt";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingCookie, setIsLoadingCookie] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const fetchAndSetUser = useCallback(async (token: string) => {
    setIsLoadingUser(true);

    try {
      const { data } = await clientAxios.get<User>(API_ROUTES.users.my(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    setIsLoadingCookie(true);

    const storedValue = Cookies.get(ACCESS_COOKIE_NAME);
    if (storedValue) {
      setAccess(storedValue);
      clientAxios.defaults.headers["Authorization"] = `Bearer ${access}`;
      fetchAndSetUser(storedValue);
    } else {
      setAccess(null);
      setIsLoadingUser(false);
    }
    setIsLoadingCookie(false);
  }, [fetchAndSetUser, access]);

  const login = (access: string, refresh: string) => {
    setIsLoadingCookie(true);
    setAccess(access);
    setRefresh(refresh);
    clientAxios.defaults.headers["Authorization"] = `Bearer ${access}`;
    Cookies.set(ACCESS_COOKIE_NAME, access);
    Cookies.set(REFRESH_COOKIE_NAME, refresh);
    fetchAndSetUser(access);
    setIsLoadingCookie(false);
  };

  const logout = () => {
    setIsLoadingCookie(true);

    setAccess(null);
    setRefresh(null);
    setUser(null);
    Cookies.remove(ACCESS_COOKIE_NAME);
    Cookies.remove(REFRESH_COOKIE_NAME);
    setIsLoadingCookie(false);
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: access,
        login,
        logout,
        isLoggedIn: !!access,
        isLoading: isLoadingCookie || isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error("AuthProvider 안에서 사용해주세요");
  }

  return context;
}
