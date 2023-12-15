import { clientAxios } from "src/utils/common/clientAxios";
import Cookies from "js-cookie";
import { ACCESS_COOKIE_NAME } from "src/constants/jwt";

export interface FetcherArgs {
  url: string;
  query?: Record<string, unknown>;
}

export async function fetcher({ url, query }: FetcherArgs) {
  return (
    await clientAxios.get(url, {
      params: query,
      headers: {
        Authorization: Cookies.get(ACCESS_COOKIE_NAME)
          ? `Bearer ${Cookies.get(ACCESS_COOKIE_NAME)}`
          : undefined,
      },
    })
  ).data;
}
