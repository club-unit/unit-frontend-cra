import useAuthSWR from "src/hooks/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { MyUser } from "src/types/api/user";

function useMy(isDisabled?: boolean) {
  const { data, isLoading } = useAuthSWR<MyUser>(
    !isDisabled
      ? {
          url: API_ROUTES.users.my(),
        }
      : null
  );

  return {
    data,
    isLoading,
  };
}

export default useMy;
