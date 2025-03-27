import useAuthSWR from "src/hooks/common/useAuthSWR";
import { CommonListResponse } from "src/types/api/common";
import { Category } from "src/types/api/category";
import { API_ROUTES } from "src/constants/routes";

function useCategories(slug: string, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonListResponse<Category>>(
    !isDisabled && slug
      ? {
          url: API_ROUTES.categories.bySlug(slug),
        }
      : null
  );

  return { data, isLoading, mutate, error };
}

export default useCategories;
