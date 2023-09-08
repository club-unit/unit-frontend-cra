import { Card, Space } from "antd";
import { BRANCH_SLUGS } from "@/constants/branches";
import { MOCKUP_POST_LIST } from "@/mockups/post";
import BranchCardElement from "@/components/pages/index/BranchCardElement";

interface Props {
  slug: (typeof BRANCH_SLUGS)[number];
}

function BranchCard({ slug }: Props) {
  const postsResponse = MOCKUP_POST_LIST;

  return (
    <Card size="small" title={slug.toUpperCase()} extra={<a href={`/${slug}`}>더보기</a>}>
      <Space direction="vertical" size="middle" className="w-full">
        {postsResponse.map((post) => (
          <BranchCardElement key={post.id} post={post} slug={slug} />
        ))}
      </Space>
    </Card>
  );
}

export default BranchCard;
