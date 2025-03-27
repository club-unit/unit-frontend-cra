import useAuthSWR from "src/hooks/common/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { PostPreview } from "src/types/api/post";
import { CommonPagedResponse } from "src/types/api/common";

interface PostListQuery {
  categoryName?: string;
  ordering?: string;
  page?: number;
}

function usePosts(slug: string, query: PostListQuery, isDisabled: boolean) {
  const { data, isLoading } = useAuthSWR<CommonPagedResponse<PostPreview>>(
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
  return { data, isLoading };
}

export default usePosts;
