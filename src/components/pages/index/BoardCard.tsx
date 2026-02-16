import { Card, Empty } from "antd";
import BranchCardElement from "src/components/pages/index/BranchCardElement";
import { Link } from "react-router-dom";
import usePostSummary from "src/hooks/api/index/usePostSummary";

interface Props {
  slug: string;
  title: string;
}

function BoardCard({ slug, title }: Props) {
  const { data: postsSummary } = usePostSummary(slug);

  return (
    <Card size="small" title={title} extra={<Link to={`/${slug}`}>더보기</Link>}>
      <div className="flex flex-col gap-4">
        {postsSummary?.map((post) => (
          <BranchCardElement key={post.id} post={post} slug={slug} />
        ))}
      </div>
      {!postsSummary?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Card>
  );
}

export default BoardCard;
