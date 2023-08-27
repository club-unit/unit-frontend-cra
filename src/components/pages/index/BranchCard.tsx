import { Card, Space } from "antd";
import { branchSlugs } from "@/constants/branches";
import { posts } from "@/mockups/post";
import BranchCardElement from "@/components/pages/index/BranchCardElement";

interface Props {
  slug: (typeof branchSlugs)[number];
}

function BranchCard({ slug }: Props) {
  const postsResponse = posts;

  return (
    <Card size="small" title={slug.toUpperCase()} extra={<a href="#">더보기</a>}>
      <Space direction="vertical" size="middle" className="w-full">
        {postsResponse.map((post) => (
          <BranchCardElement key={post.id} post={post} />
        ))}
      </Space>
    </Card>
  );
}

export default BranchCard;
