import useSWR from "swr";
import useNotification from "src/contexts/notification/useNotfication";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "src/contexts/auth/useAuth";

interface Params {
  url: string;
  query?: Record<string, unknown>;
}

function useAuthSWR<T>(params: Params | null) {
  const { logout } = useAuth();
  const { api } = useNotification();
  const navigate = useNavigate();
  const { data, mutate, error, isLoading } = useSWR<T>({ ...params });

  useEffect(() => {
    if (error?.response?.status === 403) {
      api.error({ message: "권한이 없습니다." });
      navigate("/");
    } else if (error?.response?.status === 401) {
      if (
        error.response?.data.detail ===
        "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."
      ) {
        api.error({ message: "로그인이 필요합니다." });
        navigate("/");
      } else {
        api.error({ message: "로그인이 만료되었습니다.", description: "다시 시도해주세요" });
        logout();
      }
    }
  }, [api, error, logout, navigate]);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}

export default useAuthSWR;
