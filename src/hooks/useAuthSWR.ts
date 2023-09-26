import useSWR from "swr";
import Cookies from "js-cookie";
import { ACCESS_COOKIE_NAME } from "src/constants/jwt";
import useNotification from "src/contexts/notification/useNotfication";
import { useNavigate } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";

interface Params {
  url: string;
  query?: Record<string, unknown>;
}

function useAuthSWR<T>(params: Params | null) {
  const token = Cookies.get(ACCESS_COOKIE_NAME);
  const { api } = useNotification();
  const navigate = useNavigate();
  const { data, mutate, error } = useSWR<T>({ ...params, token });
  const { refresh } = useAuth();

  if (error?.response?.status === 403) {
    api.error({ message: "권한이 없습니다." });
    navigate("/");
  } else if (error?.response?.status === 401) {
    if (error?.response?.data?.detail === "이 토큰은 모든 타입의 토큰에 대해 유효하지 않습니다") {
      refresh();
    } else if (
      error?.response?.data?.detail ===
      "자격 인증데이터(authentication credentials)가 제공되지 않았습니다."
    ) {
      navigate("/");
      api.error({ message: "로그인이 필요합니다." });
    }
  }

  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export default useAuthSWR;
