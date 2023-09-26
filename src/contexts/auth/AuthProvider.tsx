import Cookies from "js-cookie";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { User } from "src/types/api/user";
import { clientAxios } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import {
  ACCESS_COOKIE_NAME,
  ACCESS_MAX_AGE,
  REFRESH_COOKIE_NAME,
  REFRESH_INTERVAL,
  REFRESH_MAX_AGE,
} from "src/constants/jwt";
import useNotification from "src/contexts/notification/useNotfication";

interface AuthContextValue {
  user: User | null;
  login: (access: string, refresh: string, remember: boolean) => void;
  logout: () => void;
  refresh: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingCookie, setIsLoadingCookie] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { api } = useNotification();

  const fetchAndSetUser = useCallback(
    async (token: string) => {
      setIsLoadingUser(true);
      try {
        const { data } = await clientAxios.get<User>(API_ROUTES.users.my(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        //@TODO: 에러 핸들링
        api.error({ message: "인증 오류", description: "알 수 없는 인증 오류 입니다" });
      } finally {
        setIsLoadingUser(false);
      }
    },
    [api]
  );

  useEffect(() => {
    const storedValue = Cookies.get(ACCESS_COOKIE_NAME);
    if (storedValue) {
      clientAxios.defaults.headers["Authorization"] = `Bearer ${storedValue}`;
      fetchAndSetUser(storedValue);
    }
  }, [fetchAndSetUser]);

  const login = (access: string, refresh: string, remember: boolean) => {
    setIsLoadingCookie(true);
    clientAxios.defaults.headers["Authorization"] = `Bearer ${access}`;
    localStorage.setItem("remember", String(remember));
    Cookies.set(ACCESS_COOKIE_NAME, access, { "max-age": String(ACCESS_MAX_AGE) });
    Cookies.set(REFRESH_COOKIE_NAME, refresh, {
      "max-age": remember ? String(REFRESH_MAX_AGE) : undefined,
    });
    fetchAndSetUser(access);
    setIsLoadingCookie(false);
  };

  const logout = () => {
    setIsLoadingCookie(true);
    setUser(null);
    Cookies.remove(ACCESS_COOKIE_NAME);
    Cookies.remove(REFRESH_COOKIE_NAME);
    setIsLoadingCookie(false);
    window.location.replace("/");
  };

  const refresh = useCallback(async () => {
    try {
      const refreshValue = Cookies.get(REFRESH_COOKIE_NAME);
      if (refreshValue) {
        const response = await clientAxios.post(API_ROUTES.token.refresh(), {
          refresh: refreshValue,
        });
        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;
        clientAxios.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        Cookies.set(ACCESS_COOKIE_NAME, newAccessToken, { "max-age": String(ACCESS_MAX_AGE) });
        Cookies.set(REFRESH_COOKIE_NAME, newRefreshToken, {
          "max-age":
            localStorage.getItem("remember") === "true" ? String(REFRESH_MAX_AGE) : undefined,
        });
      } else {
        logout();
      }
    } catch (error) {
      api.error({
        message: "로그인이 만료되었습니다.",
        description: "다시 로그인해주세요.",
      });
      logout();
    }
  }, [api, logout]);

  useEffect(() => {
    setIsLoadingCookie(true);
    const refreshInterval = setInterval(() => {
      refresh();
    }, REFRESH_INTERVAL);
    setIsLoadingCookie(false);
    return () => clearInterval(refreshInterval);
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refresh,
        isLoggedIn: !!Cookies.get(ACCESS_COOKIE_NAME),
        isLoading: isLoadingCookie || isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
