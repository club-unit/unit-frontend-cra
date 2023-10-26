import useSWR from "swr";
import useNotification from "src/contexts/notification/useNotfication";
import { useNavigate } from "react-router-dom";

interface Params {
  url: string;
  query?: Record<string, unknown>;
}

function useAuthSWR<T>(params: Params | null) {
  const { api } = useNotification();
  const navigate = useNavigate();
  const { data, mutate, error } = useSWR<T>({ ...params });

  if (error?.response?.status === 403) {
    api.error({ message: "권한이 없습니다." });
    navigate("/");
  } else if (error?.response?.status === 401) {
    api.error({ message: "로그인이 필요합니다." });
    navigate("/");
  }

  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export default useAuthSWR;
