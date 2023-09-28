import { Typography } from "antd";
import { ClockCircleOutlined, CommentOutlined, EyeOutlined, TagFilled } from "@ant-design/icons";
import { PostDetail } from "src/types/api/post";
import IconWithText from "src/components/common/IconWithText";
import dayjs from "dayjs";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";
import BadgeSet from "src/components/common/BadgeSet";

interface Props {
  post: PostDetail;
}

function PostHeaderSection({ post }: Props) {
  return (
    <div className="w-full">
      <ContentHeaderSection title={post.title} />
      <div className="flex flex-row w-full h-fit border-y-2 p-4 justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1 items-center">
            <BadgeSet user={post.author} height={20} />
            <Typography.Text>{post.author.profile.name}</Typography.Text>
          </div>
          <div className="flex gap-2">
            <IconWithText icon={<TagFilled />} text={post.category} />
            <IconWithText icon={<CommentOutlined />} text={post.comments.length} />
            <IconWithText icon={<EyeOutlined />} text={post.views} />
          </div>
        </div>
        <IconWithText
          icon={<ClockCircleOutlined />}
          text={dayjs(post.created).format("MM/DD hh:mm")}
        />
      </div>
    </div>
  );
}

export default PostHeaderSection;
