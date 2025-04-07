import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonPagedResponse } from "src/types/api/common";
import { API_ROUTES } from "src/constants/routes";
import { Notification } from "src/types/api/notification";

function useNotices(isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonPagedResponse<Notification>>(
    !isDisabled ? { url: API_ROUTES.webNotifications.root() } : null
  );

  return { data, isLoading, mutate, error };
}

export default useNotices;
