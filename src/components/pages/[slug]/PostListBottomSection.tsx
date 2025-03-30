import { Button, Pagination } from "antd";
import { PAGE_SIZE } from "src/constants/pagination";
import { Link, useParams } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";

interface Props {
  page: number;
  setPage: (page: number) => void;
  total?: number;
}

function PostListBottomSection({ page, setPage, total }: Props) {
  const { slug } = useParams();
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col mt-2 items-end gap-2">
      {isLoggedIn && (
        <Link to={`/${slug}/write`}>
          <Button type="primary" className="bg-blue-600">
            글쓰기
          </Button>
        </Link>
      )}
      <div className="flex justify-center w-full">
        <Pagination
          current={page}
          onChange={setPage}
          defaultPageSize={PAGE_SIZE}
          total={total}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default PostListBottomSection;
