import { Card, Empty } from "antd";
import { BRANCH_LOOKUP_TABLE, BRANCH_SLUGS } from "src/constants/branches";
import BranchCardElement from "src/components/pages/index/BranchCardElement";
import { CommonListResponse } from "src/types/api/common";
import { BoardSummary } from "src/types/api/summary";
import { API_ROUTES } from "src/constants/routes";
import { Link } from "react-router-dom";
import useAuthSWR from "src/hooks/useAuthSWR";
import { Branch } from "src/types/api/profile";

interface Props {
  slug: (typeof BRANCH_SLUGS)[number];
}

function BranchCard({ slug }: Props) {
  const { data: postsResponse } = useAuthSWR<CommonListResponse<BoardSummary>>({
    url: API_ROUTES.boards.summary(),
    query: {
      slug,
    },
  });
  const boardSummary = postsResponse?.at(0)?.posts;

  return (
    <Card
      size="small"
      title={BRANCH_LOOKUP_TABLE[slug.toUpperCase() as Branch]}
      extra={<Link to={`/${slug}`}>더보기</Link>}
    >
      <div className="flex flex-col gap-4">
        {boardSummary?.map((post) => <BranchCardElement key={post.id} post={post} slug={slug} />)}
      </div>
      {!boardSummary?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Card>
  );
}

export default BranchCard;
