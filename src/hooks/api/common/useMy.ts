import useAuthSWR from "src/hooks/api/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { MyUser } from "src/types/api/user";

function useMy(isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<MyUser>(
    !isDisabled
      ? {
          url: API_ROUTES.users.my(),
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

export default useMy;
