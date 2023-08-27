import { Post } from "@/types/api/post";
import { Space, Typography } from "antd";
import { EyeOutlined, HeartFilled } from "@ant-design/icons";

interface Props {
  post: Post;
}

function BranchCardElement({ post }: Props) {
  return (
    <Space direction="vertical" size={0} className="w-full h-fit hover:cursor-pointer">
      <Typography.Text strong>{post.title}</Typography.Text>
      <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
        {post.content}
      </Typography.Paragraph>
      <Space className="my-0" align="center">
        <Typography.Text type="secondary">{post.author.profile.name} | </Typography.Text>
        <Space align="center">
          <EyeOutlined />
          <Typography.Text>{post.views}</Typography.Text>
          <HeartFilled />
          <Typography.Text>{post.likes}</Typography.Text>
        </Space>
      </Space>
    </Space>
  );
}

export default BranchCardElement;
