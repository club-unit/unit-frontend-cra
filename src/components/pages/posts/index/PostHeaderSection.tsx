import { Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Post } from "src/types/api/post";

interface Props {
  post: Post;
}

function PostHeaderSection({ post }: Props) {
  return (
    <div className="w-full">
      <Typography.Title level={2} className="mx-2">
        {post.title}
      </Typography.Title>
      <div className="flex flex-row w-full h-fit border-y-2 p-4 justify-between">
        <Typography.Text>{post.author.profile.name}</Typography.Text>
        <div>
          <EyeOutlined />
          <Typography.Text>{post.views}</Typography.Text>
        </div>
      </div>
    </div>
  );
}

export default PostHeaderSection;
