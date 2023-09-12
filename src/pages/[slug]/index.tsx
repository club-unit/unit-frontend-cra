import PostListCategorySection from "@/components/pages/[slug]/PostListCategorySection";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CommonListResponse, CommonPagedResponse } from "@/types/api/common";
import { Post } from "@/types/api/post";
import { API_ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Category } from "@/types/api/category";
import { Spin } from "antd";
import PostListMainSection from "@/components/pages/[slug]/PostListMainSection";
import PostListPaginationSection from "@/components/pages/[slug]/PostListPaginationSection";

function PostListPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [currentCategory, setCurrentCategory] = useState<string | number>("전체");
  const [page, setPage] = useState<number>(1);
  const { data: posts } = useSWR<CommonPagedResponse<Post>>(
    router.query.slug
      ? {
          url: API_ROUTES.posts.bySlug(String(router.query.slug)),
          query: {
            category__name: currentCategory !== "전체" ? currentCategory : undefined,
            page,
          },
          token,
        }
      : null
  );
  const { data: categories } = useSWR<CommonListResponse<Category>>(
    router.query.slug
      ? {
          url: API_ROUTES.categories.bySlug(String(router.query.slug)),
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
      <PostListPaginationSection page={page} setPage={setPage} total={posts?.count} />
    </>
  );
}

export default PostListPage;
