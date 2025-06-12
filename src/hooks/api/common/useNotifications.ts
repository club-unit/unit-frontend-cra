import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonPagedResponse } from "src/types/api/common";
import { API_ROUTES } from "src/constants/routes";
import { Notification } from "src/types/api/notification";

interface UseNotificationsQuery {
  page?: number;
}
function useNotifications(query: UseNotificationsQuery, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonPagedResponse<Notification>>(
    !isDisabled
      ? {
          url: API_ROUTES.webNotifications.root(),
          query: {
            page: query.page,
          },
        }
      : null
  );

  return { data, isLoading, mutate, error };
}

export default useNotifications;
