import { clientAxios } from "@/utils/clientAxios";

export interface FetcherArgs {
  url: string;
  query?: Record<string, unknown>;
  token?: string | null;
}

export async function fetcher({ url, query, token }: FetcherArgs) {
  return (
    await clientAxios.get(url, {
      params: query,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
  ).data;
}
