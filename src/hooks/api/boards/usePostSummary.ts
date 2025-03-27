import useAuthSWR from "src/hooks/api/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { PostPreview } from "src/types/api/post";

function usePostSummary(slug: string, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<PostPreview>(
    !isDisabled && slug
      ? {
          url: API_ROUTES.posts.summary(slug),
        }
      : null
  );
  return { data, isLoading, mutate, error };
}

export default usePostSummary;
