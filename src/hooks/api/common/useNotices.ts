import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { Notice } from "src/types/api/notice";
import { API_ROUTES } from "src/constants/routes";

function useNotices(isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonListResponse<Notice>>(
    !isDisabled ? { url: API_ROUTES.notices.root() } : null
  );

  return { data, isLoading, mutate, error };
}

export default useNotices;
