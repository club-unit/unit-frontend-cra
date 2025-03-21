import useAuthSWR from "src/hooks/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { MyUser } from "src/types/api/user";

function useMy(isEnabled: boolean) {
  const { data: user, isLoading } = useAuthSWR<MyUser>(
    isEnabled
      ? {
          url: API_ROUTES.users.my(),
        }
      : null
  );

  return {
    data: user,
    isLoading,
  };
}

export default useMy;
