import { Card, Empty, Space } from "antd";
import { BRANCH_SLUGS } from "src/constants/branches";
import BranchCardElement from "src/components/pages/index/BranchCardElement";
import useSWR from "swr";
import { CommonListResponse } from "src/types/api/common";
import { BoardSummary } from "src/types/api/summary";
import { API_ROUTES } from "src/constants/routes";
import { Link } from "react-router-dom";

interface Props {
  slug: (typeof BRANCH_SLUGS)[number];
}

function BranchCard({ slug }: Props) {
  const { data: postsResponse } = useSWR<CommonListResponse<BoardSummary>>({
    url: API_ROUTES.boards.summary(),
  });
  const branchSummary = postsResponse?.filter((board) => board.slug === slug)?.at(0)?.posts;

  return (
    <Card size="small" title={slug.toUpperCase()} extra={<Link to={`/${slug}`}>더보기</Link>}>
      <Space direction="vertical" size="middle" className="w-full">
        {branchSummary?.map((post) => <BranchCardElement key={post.id} post={post} slug={slug} />)}
      </Space>
      {!branchSummary?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Card>
  );
}

export default BranchCard;
