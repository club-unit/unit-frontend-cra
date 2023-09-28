import { useEffect, useState } from "react";
import { Spin } from "antd";
import { Post } from "src/types/api/post";
import { CommonListResponse, CommonPagedResponse } from "src/types/api/common";
import { API_ROUTES } from "src/constants/routes";
import { Category } from "src/types/api/category";
import PostListCategorySection from "src/components/pages/[slug]/PostListCategorySection";
import PostListMainSection from "src/components/pages/[slug]/PostListMainSection";
import PostListBottomSection from "src/components/pages/[slug]/PostListBottomSection";
import { useNavigate, useParams } from "react-router-dom";
import useAuthSWR from "src/hooks/useAuthSWR";
import useNotification from "src/contexts/notification/useNotfication";

function PostListPage() {
  const { slug } = useParams();
  const [currentCategory, setCurrentCategory] = useState<string | number>("전체");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const { api } = useNotification();
  const { data: posts, error } = useAuthSWR<CommonPagedResponse<Post>>(
    slug
      ? {
          url: API_ROUTES.posts.bySlug(slug),
          query: {
            category__name: currentCategory !== "전체" ? currentCategory : undefined,
            page,
          },
        }
      : null
  );
  const { data: categories } = useAuthSWR<CommonListResponse<Category>>(
    slug
      ? {
          url: API_ROUTES.categories.bySlug(slug),
        }
      : null
  );
  const categoryList = categories ? [{ name: "전체" }, ...categories] : [{ name: "전체" }];

  useEffect(() => {
    setPage(1);
  }, [currentCategory]);

  useEffect(() => {
    if (error?.response?.status === 404) {
      api.error({ message: "존재하지 않는 게시판입니다." });
      navigate("/");
    }
  }, [api, error, navigate, slug]);

  return (
    <>
      {!categories || !posts ? (
        <Spin />
      ) : (
        <>
          <PostListCategorySection
            categories={categoryList}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          <PostListMainSection posts={posts.results} />
          <PostListBottomSection page={page} setPage={setPage} total={posts?.count} />
        </>
      )}
    </>
  );
}

export default PostListPage;
