import useAuthSWR from "src/hooks/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { PostSummary } from "src/types/api/post";
import { CommonPagedResponse } from "src/types/api/common";

interface UsePostsQuery {
  categoryName?: string;
  ordering?: string;
  page?: number;
}

function usePosts(slug: string, query: UsePostsQuery, isDisabled: boolean) {
  const { data, isLoading, mutate, error } = useAuthSWR<CommonPagedResponse<PostSummary>>(
    !isDisabled && slug
      ? {
          url: API_ROUTES.posts.bySlug(slug),
          query: {
            category__name: query.categoryName,
            ordering: query.ordering,
            page: query.page,
          },
        }
      : null
  );
  return { data, isLoading, mutate, error };
}

export default usePosts;
