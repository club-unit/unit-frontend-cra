import { Image, Typography } from "antd";
import { ClockCircleOutlined, CommentOutlined, EyeOutlined, TagFilled } from "@ant-design/icons";
import { PostDetail } from "src/types/api/post";
import IconWithText from "src/components/common/IconWithText";
import dayjs from "dayjs";
import ContentHeaderSection from "src/components/common/ContentHeaderSection";

interface Props {
  post: PostDetail;
}

function PostHeaderSection({ post }: Props) {
  return (
    <div className="w-full">
      <ContentHeaderSection title={post.title} />
      <div className="flex flex-row w-full h-fit border-y-2 p-4 justify-between">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <Image
              height={20}
              src={`/icons/rank/${post.author.profile.rank}.png`}
              alt={String(post.author.profile.rank)}
              preview={false}
            />
            {post.author.profile.responsibility !== "NONE" &&
              post.author.profile.responsibility !== "NORMAL" && (
                <Image
                  height={20}
                  src={`/icons/responsibility/${post.author.profile.responsibility}.png`}
                  alt={String(post.author?.profile.responsibility)}
                  preview={false}
                />
              )}
            <Typography.Text>{post.author.profile.name}</Typography.Text>
          </div>
          <IconWithText icon={<TagFilled />} text={post.category} />
          <IconWithText icon={<CommentOutlined />} text={post.comments.length} />
          <IconWithText icon={<EyeOutlined />} text={post.views} />
        </div>
        <IconWithText
          icon={<ClockCircleOutlined />}
          text={dayjs(post.created).format("MM/YY hh:mm")}
        />
      </div>
    </div>
  );
}

export default PostHeaderSection;
