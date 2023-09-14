import { Space, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import React from "react";
import { Post } from "src/types/api/post";
import { BRANCH_SLUGS } from "src/constants/branches";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
  slug: (typeof BRANCH_SLUGS)[number];
}

function BranchCardElement({ post, slug }: Props) {
  return (
    <Link to={`/${slug}/${post.id}`}>
      <Space
        direction="vertical"
        size={0}
        className="w-full h-fit hover:cursor-pointer hover:font-bold"
      >
        <Typography.Text strong>{post.title}</Typography.Text>
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
          {post.content}
        </Typography.Paragraph>
        <Space className="my-0" align="center">
          <Typography.Text type="secondary">{post.author.profile.name} | </Typography.Text>
          <Space align="center">
            <EyeOutlined />
            <Typography.Text>{post.views}</Typography.Text>
          </Space>
        </Space>
      </Space>
    </Link>
  );
}

export default BranchCardElement;
