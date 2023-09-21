import { useState } from "react";
import useSWR from "swr";
import { Spin } from "antd";
import { Post } from "src/types/api/post";
import { CommonListResponse, CommonPagedResponse } from "src/types/api/common";
import { API_ROUTES } from "src/constants/routes";
import { Category } from "src/types/api/category";
import PostListCategorySection from "src/components/pages/[slug]/PostListCategorySection";
import PostListMainSection from "src/components/pages/[slug]/PostListMainSection";
import PostListBottomSection from "src/components/pages/[slug]/PostListBottomSection";
import useAuth from "src/contexts/auth/useAuth";
import { useParams } from "react-router-dom";

function PostListPage() {
  const { slug } = useParams();
  const { token } = useAuth();
  const [currentCategory, setCurrentCategory] = useState<string | number>("전체");
  const [page, setPage] = useState<number>(1);
  const { data: posts } = useSWR<CommonPagedResponse<Post>>(
    slug
      ? {
          url: API_ROUTES.posts.bySlug(slug),
          query: {
            category__name: currentCategory !== "전체" ? currentCategory : undefined,
            page,
          },
          token,
        }
      : null
  );
  const { data: categories } = useSWR<CommonListResponse<Category>>(
    slug
      ? {
          url: API_ROUTES.categories.bySlug(slug),
          token,
        }
      : null
  );
  const categoryList = categories ? [{ name: "전체" }, ...categories] : [{ name: "전체" }];

  return (
    <>
      {categories ? (
        <PostListCategorySection
          categories={categoryList}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      ) : (
        <Spin />
      )}
      {posts ? <PostListMainSection posts={posts.results} /> : <Spin />}
      <PostListBottomSection page={page} setPage={setPage} total={posts?.count} />
    </>
  );
}

export default PostListPage;
