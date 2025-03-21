import { OtherUser } from "src/types/api/user";
import useAuthSWR from "src/hooks/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";

interface Queries {}

function useUser(id: number, isEnabled: boolean, queries?: Queries) {
  const { data: user, isLoading } = useAuthSWR<OtherUser>(
    isEnabled && id
      ? {
          url: API_ROUTES.users.byId(id),
        }
      : null
  );

  return {
    data: user,
    isLoading,
  };
}

export default useUser;
