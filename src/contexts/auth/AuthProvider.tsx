import Cookies from "js-cookie";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { User } from "src/types/api/user";
import { clientAxios, setupAxiosInterceptors } from "src/utils/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, REFRESH_MAX_AGE } from "src/constants/jwt";
import useNotification from "src/contexts/notification/useNotfication";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (access: string, refresh: string, remember: boolean) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  handleUnauthenticated: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<string | null>(null);
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

  const handleUnauthenticated = useCallback(async () => {
    try {
      const {
        data: { access },
      } = await clientAxios.post<{ access: string }>(API_ROUTES.token.refresh(), {
        refresh: Cookies.get(REFRESH_COOKIE_NAME),
      });
      setIsLoadingCookie(true);
      setAccess(access);
      clientAxios.defaults.headers["Authorization"] = `Bearer ${access}`;
      Cookies.set(ACCESS_COOKIE_NAME, access);
      fetchAndSetUser(access);
      setIsLoadingCookie(false);
    } catch (error) {
      // Router.push("/");
      Cookies.remove(ACCESS_COOKIE_NAME);
      Cookies.remove(REFRESH_COOKIE_NAME);
      api.error({ message: "로그인 만료", description: "로그인이 만료되었습니다." });
    }
  }, [api, fetchAndSetUser]);

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
    setupAxiosInterceptors(handleUnauthenticated);
  }, [fetchAndSetUser, access, handleUnauthenticated]);

  const login = (access: string, refresh: string, remember: boolean) => {
    setIsLoadingCookie(true);
    setAccess(access);
    clientAxios.defaults.headers["Authorization"] = `Bearer ${access}`;
    Cookies.set(ACCESS_COOKIE_NAME, access);
    Cookies.set(REFRESH_COOKIE_NAME, refresh, {
      "max-age": remember ? String(REFRESH_MAX_AGE) : undefined,
    });
    fetchAndSetUser(access);
    setIsLoadingCookie(false);
  };

  const logout = () => {
    setIsLoadingCookie(true);

    setAccess(null);
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
        handleUnauthenticated: handleUnauthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
