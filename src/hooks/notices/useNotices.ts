import useAuthSWR from "src/hooks/common/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { Notice } from "src/types/api/notice";
import { API_ROUTES } from "src/constants/routes";

function useNotices(isDisabled?: boolean) {
  const { data, isLoading } = useAuthSWR<CommonListResponse<Notice>>(
    !isDisabled ? { url: API_ROUTES.notices.root() } : null
  );

  return { data, isLoading };
}

export default useNotices;
