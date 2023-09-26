import useSWR from "swr";
import Cookies from "js-cookie";
import { ACCESS_COOKIE_NAME } from "src/constants/jwt";

interface Params {
  url: string;
  query?: Record<string, unknown>;
}

function useAuthSWR<T>(params: Params | null) {
  const token = Cookies.get(ACCESS_COOKIE_NAME);

  const { data, mutate, error } = useSWR<T>({ ...params, token });

  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
}

export default useAuthSWR;
