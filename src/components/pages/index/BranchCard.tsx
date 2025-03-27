import { Card, Empty } from "antd";
import { BRANCH_LOOKUP_TABLE, BRANCH_SLUGS } from "src/constants/branches";
import BranchCardElement from "src/components/pages/index/BranchCardElement";
import { CommonListResponse } from "src/types/api/common";
import { API_ROUTES } from "src/constants/routes";
import { Link } from "react-router-dom";
import useAuthSWR from "src/hooks/api/useAuthSWR";
import { Branch } from "src/types/api/profile";
import { PostPreview } from "src/types/api/post";

interface Props {
  slug: (typeof BRANCH_SLUGS)[number];
  myBranch?: boolean;
}

function BranchCard({ slug, myBranch }: Props) {
  const { data: postsSummary } = useAuthSWR<CommonListResponse<PostPreview>>({
    url: API_ROUTES.posts.summary(slug),
  });

  return (
    <Card
      size="small"
      title={BRANCH_LOOKUP_TABLE[slug.toUpperCase() as Branch] + (myBranch ? " - 내 지구대" : "")}
      extra={<Link to={`/${slug}`}>더보기</Link>}
    >
      <div className="flex flex-col gap-4">
        {postsSummary?.map((post) => <BranchCardElement key={post.id} post={post} slug={slug} />)}
      </div>
      {!postsSummary?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Card>
  );
}

export default BranchCard;
