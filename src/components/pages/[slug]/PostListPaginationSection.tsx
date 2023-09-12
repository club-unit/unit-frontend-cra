import { PAGE_SIZE } from "@/constants/pagination";
import { Pagination } from "antd";
import { Dispatch, SetStateAction } from "react";

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total?: number;
}

function PostListPaginationSection({ page, setPage, total }: Props) {
  return (
    <div className="flex justify-center w-full mt-2">
      <Pagination current={page} onChange={setPage} defaultPageSize={PAGE_SIZE} total={total} />
    </div>
  );
}

export default PostListPaginationSection;
