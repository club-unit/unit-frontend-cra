import useAuthSWR from "src/hooks/api/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { Application } from "src/types/api/application";
import { API_ROUTES } from "src/constants/routes";

interface UseApplicationsQuery {
  branch?: string;
}

function useApplications(query: UseApplicationsQuery, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonListResponse<Application>>(
    !isDisabled
      ? {
          url: API_ROUTES.applications.root(),
          query: { branch: query.branch },
        }
      : null
  );

  return { data, isLoading, mutate, error };
}

export default useApplications;
