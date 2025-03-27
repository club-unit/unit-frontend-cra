import useAuthSWR from "src/hooks/api/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { Post } from "src/types/api/post";

function usePost(slug: string, id: number, isDisabled?: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<Post>(
    !isDisabled && slug && id
      ? {
          url: API_ROUTES.posts.bySlugAndId(slug, id),
        }
      : null
  );
  return { data, isLoading, mutate, error };
}

export default usePost;
