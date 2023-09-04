import { Segmented } from "antd";
import { Category } from "@/types/api/category";
import { Dispatch, SetStateAction } from "react";

interface Props {
  categories: Category[];
  categoryName: string;
  setCategoryName: Dispatch<SetStateAction<string>>;
}

function PostListCategorySection({ categories }: Props) {
  const categoryList = categories.map((category) => category.name);

  return (
    <div className="w-full">
      <Segmented options={categoryList} />
    </div>
  );
}

export default PostListCategorySection;
