import { Button, Pagination } from "antd";
import { Dispatch, SetStateAction } from "react";
import { PAGE_SIZE } from "src/constants/pagination";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total?: number;
}

function PostListBottomSection({ page, setPage, total }: Props) {
  const navigate = useNavigate();
  const { slug } = useParams();

  return (
    <div className="flex flex-col mt-2 items-end gap-2">
      <Button onClick={() => navigate(`/${slug}/write`)} type="primary" className="bg-blue-600">
        글쓰기
      </Button>
      <div className="flex justify-center w-full">
        <Pagination current={page} onChange={setPage} defaultPageSize={PAGE_SIZE} total={total} />
      </div>
    </div>
  );
}

export default PostListBottomSection;
