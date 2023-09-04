import { MOCKUP_POST_LIST } from "@/mockups/post";
import { MOCKUP_CATEGORIES } from "@/mockups/category";
import PostListCategorySection from "@/components/pages/[slug]/PostListCategorySection";
import { useState } from "react";

function PostListPage() {
  const posts = MOCKUP_POST_LIST;
  const categories = MOCKUP_CATEGORIES;

  const [categoryName, setCategoryName] = useState(categories[0].name);

  return (
    <>
      <PostListCategorySection
        categories={categories}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
      />
    </>
  );
}

export default PostListPage;
