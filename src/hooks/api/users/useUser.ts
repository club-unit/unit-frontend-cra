import { OtherUser } from "src/types/api/user";
import useAuthSWR from "src/hooks/api/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";

function useUser(id: number | undefined, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<OtherUser>(
    !isDisabled && id
      ? {
          url: API_ROUTES.users.byId(id),
        }
      : null
  );

  return {
    data,
    isLoading,
    mutate,
    error,
  };
}

export default useUser;
