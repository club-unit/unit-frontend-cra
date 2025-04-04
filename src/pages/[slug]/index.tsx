import { useCallback, useEffect, useState } from "react";
import { Spin } from "antd";
import PostListCategorySection from "src/components/pages/[slug]/PostListCategorySection";
import PostListTableSection from "src/components/pages/[slug]/PostListTableSection";
import PostListBottomSection from "src/components/pages/[slug]/PostListBottomSection";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useNotification from "src/contexts/notification/useNotfication";
import PostListMobileSection from "src/components/pages/[slug]/PostListMobileSection";
import usePosts from "src/hooks/api/[slug]/usePosts";
import useCategories from "src/hooks/api/[slug]/useCategories";

function PostListPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // const [currentCategory, setCurrentCategory] = useState<string | number>("전체");
  // console.log(currentCategory);
  // const [page, setPage] = useState<number>(1);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { api } = useNotification();
  const {
    data: posts,
    error,
    mutate,
  } = usePosts(slug, {
    categoryName:
      searchParams.get("category") !== "전체" && searchParams.get("category") !== null
        ? String(searchParams.get("category"))
        : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
  });

  const { data: categories } = useCategories(slug);

  const categoryList = categories
    ? [{ id: 0, name: "전체" }, ...categories]
    : [{ id: 0, name: "전체" }];

  const setPage = useCallback(
    (page: number) => {
      searchParams.set("page", String(page));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const setCurrentCategory = (category: number | string) => {
    searchParams.set("category", String(category));
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (error?.response?.status === 404) {
      api.error({ message: "존재하지 않는 게시판입니다." });
      navigate("/");
    }
  }, [api, error, navigate, slug]);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
    if (!searchParams.get("category")) {
      searchParams.set("category", "전체");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="flex flex-col gap-2">
      {categories && (
        <PostListCategorySection
          categories={categoryList}
          currentCategory={String(searchParams.get("category"))}
          setCurrentCategory={setCurrentCategory}
        />
      )}
      {posts ? (
        <>
          {innerWidth > 900 ? (
            <PostListTableSection posts={posts.results} />
          ) : (
            <PostListMobileSection posts={posts.results} />
          )}
          <PostListBottomSection
            page={Number(searchParams.get("page"))}
            setPage={setPage}
            total={posts?.count}
          />
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default PostListPage;
