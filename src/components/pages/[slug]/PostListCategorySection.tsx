import { Segmented } from "antd";
import { Category } from "@/types/api/category";
import { Dispatch, SetStateAction } from "react";

interface Props {
  categories: Category[];
  currentCategory: string | number;
  setCurrentCategory: Dispatch<SetStateAction<string | number>>;
}

function PostListCategorySection({ categories, currentCategory, setCurrentCategory }: Props) {
  const categoryList = categories.map((category) => category.name);

  return (
    <div className="w-full">
      <Segmented options={categoryList} value={currentCategory} onChange={setCurrentCategory} />
    </div>
  );
}

export default PostListCategorySection;
