import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { Generation } from "src/types/api/generation";
import { API_ROUTES } from "src/constants/routes";

function useGenerations(isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonListResponse<Generation>>(
    !isDisabled ? { url: API_ROUTES.generations.root() } : null
  );

  return { data, isLoading, mutate, error };
}

export default useGenerations;
