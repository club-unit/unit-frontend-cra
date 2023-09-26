import { Space, Typography } from "antd";
import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";
import { BRANCH_SLUGS } from "src/constants/branches";
import { Link } from "react-router-dom";
import { PostSummary } from "src/types/api/post";

interface Props {
  post: PostSummary;
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
          {post.shortenContent}
        </Typography.Paragraph>
        <Space className="my-0" align="center">
          <Typography.Text type="secondary">{post.author.profile.name} | </Typography.Text>
          <div className="flex gap-1">
            <EyeOutlined />
            <Typography.Text>{post.views}</Typography.Text>
          </div>
          <div className="flex gap-1">
            <CommentOutlined />
            <Typography.Text>{post.numComments}</Typography.Text>
          </div>
        </Space>
      </Space>
    </Link>
  );
}

export default BranchCardElement;
