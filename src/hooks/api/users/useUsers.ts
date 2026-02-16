import useAuthSWR from "src/hooks/api/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { UsersListUser } from "src/types/api/user";
import { CommonPagedResponse } from "src/types/api/common";
import { Branch, Responsibility } from "src/types/api/profile";

interface UseUsersQuery {
  search?: string;
  branch?: Branch;
  generation?: number;
  responsibility?: Responsibility;
  active_generation?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}

function useUsers(query: UseUsersQuery = {}, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonPagedResponse<UsersListUser>>(
    !isDisabled
      ? {
          url: API_ROUTES.users.root(),
          query: {
            search: query.search,
            branch: query.branch,
            generation: query.generation,
            responsibility: query.responsibility,
            active_generation: query.active_generation,
            ordering: query.ordering,
            page: query.page,
            page_size: query.page_size,
          },
        }
      : null
  );

  return { data, isLoading, mutate, error };
}

export default useUsers;
