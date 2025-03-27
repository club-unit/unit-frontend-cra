import useAuthSWR from "src/hooks/api/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { PostPreview } from "src/types/api/post";
import { CommonListResponse } from "src/types/api/common";

function usePostSummary(slug: string | undefined, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonListResponse<PostPreview>>(
    !isDisabled && slug
      ? {
          url: API_ROUTES.posts.summary(slug),
        }
      : null
  );
  return { data, isLoading, mutate, error };
}

export default usePostSummary;
