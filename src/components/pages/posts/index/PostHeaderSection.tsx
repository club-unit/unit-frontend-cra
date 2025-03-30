import { Typography } from "antd";
import { ClockCircleOutlined, CommentOutlined, EyeOutlined, TagFilled } from "@ant-design/icons";
import { PostDetail } from "src/types/api/post";
import IconWithText from "src/components/common/IconWithText";
import UserHeader from "src/components/common/UserHeader";
import dateToString from "src/utils/common/dateToString";

interface Props {
  post: PostDetail;
}

function PostHeaderSection({ post }: Props) {
  return (
    <div className="w-full py-4">
      <Typography.Paragraph>{post.title}</Typography.Paragraph>
      <div className="flex w-full h-fit justify-between flex-wrap gap-2 font-medium">
        <div className="flex gap-2 flex-wrap">
          <UserHeader user={post.author} />
          <div className="flex gap-2">
            <IconWithText icon={<TagFilled />} text={post.category?.name} />
            <IconWithText icon={<CommentOutlined />} text={post.numComments} />
            <IconWithText icon={<EyeOutlined />} text={post.views} />
          </div>
        </div>
        <IconWithText
          icon={<ClockCircleOutlined />}
          text={dateToString(post.createdDatetime, { absolute: true, full: true })}
        />
      </div>
    </div>
  );
}

export default PostHeaderSection;
