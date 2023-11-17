import { Image, Typography } from "antd";
import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";
import { BRANCH_SLUGS } from "src/constants/branches";
import { Link } from "react-router-dom";
import { PostSummary } from "src/types/api/post";
import BadgeSet from "src/components/common/BadgeSet";

interface Props {
  post: PostSummary;
  slug: (typeof BRANCH_SLUGS)[number];
}

function BranchCardElement({ post, slug }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Link to={`/${slug}/${post.id}`} className="grid gap-2 grid-cols-7">
        {post.thumbnail && (
          <div className="flex col-span-2 items-center">
            <Image
              src={post.thumbnail}
              height={70}
              width={70}
              className="shrink-0"
              preview={false}
            />
          </div>
        )}
        <div
          className={`flex flex-col h-fit hover:cursor-pointer hover:font-bold gap-1 w-full ${
            post.thumbnail ? "col-span-5" : "col-span-7"
          }`}
        >
          <Typography.Text ellipsis>{post.title}</Typography.Text>
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
            {post.shortenContent}
          </Typography.Paragraph>
        </div>
      </Link>
      <div className="my-0 flex items-center gap-1">
        <BadgeSet user={post.author} height={17} />
        <Typography.Text type="secondary">{post.author.profile.name} | </Typography.Text>
        <div className="flex gap-1">
          <EyeOutlined />
          <Typography.Text>{post.views}</Typography.Text>
        </div>
        <div className="flex gap-1">
          <CommentOutlined />
          <Typography.Text>{post.numComments}</Typography.Text>
        </div>
      </div>
    </div>
  );
}

export default BranchCardElement;
