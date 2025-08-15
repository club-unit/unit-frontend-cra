import useAuthSWR from "src/hooks/api/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { NotificationsNumUnreads } from "src/types/api/notification";

function useNotificationsNumUnreads(isEnabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<NotificationsNumUnreads>(
    isEnabled
      ? {
          url: API_ROUTES.webNotifications.numUnreads(),
        }
      : null
  );

  return { data, isLoading, mutate, error };
}

export default useNotificationsNumUnreads;
