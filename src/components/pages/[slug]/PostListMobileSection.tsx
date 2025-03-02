import { PostSummary } from "src/types/api/post";
import { Image, List, Typography } from "antd";
import {
  ClockCircleOutlined,
  CommentOutlined,
  EyeOutlined,
  PushpinFilled,
} from "@ant-design/icons";
import BadgeSet from "src/components/common/BadgeSet";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import formatDateString from "src/utils/common/dateToString";
import React from "react";

interface Props {
  posts: PostSummary[];
}

function PostListMobileSection({ posts }: Props) {
  const { slug } = useParams();

  return (
    <List
      size="small"
      dataSource={posts}
      renderItem={(post) => (
        <List.Item className="cursor-pointer focus:bg-gray-200">
          <Link
            to={`/${slug}/${post.id}`}
            className="flex items-center justify-between gap-1 w-full"
          >
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 w-full">
                <PushpinFilled className={post.isPinned ? undefined : "text-white"} />
                <Typography.Text strong>{post.title}</Typography.Text>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <PushpinFilled className="text-white" />
                  <div className="flex gap-1 items-center">
                    <EyeOutlined />
                    {post.views}
                  </div>
                  <div className="flex gap-1 items-center">
                    <CommentOutlined />
                    {post.numComments}
                  </div>
                  <div className="flex gap-1 items-center">
                    <ClockCircleOutlined />
                    <Typography.Text
                      className={
                        dayjs().diff(dayjs(post.created), "hour") < 24 ? "text-red-600" : undefined
                      }
                    >
                      {formatDateString(post.created)}
                    </Typography.Text>
                  </div>
                </div>
                <div className="flex gap-1">
                  <PushpinFilled className="text-white" />
                  <div className="flex gap-1 items-center">
                    <BadgeSet user={post.author} height={20} />
                    <Typography.Text>{post.author.profile.name}</Typography.Text>
                  </div>
                </div>
              </div>
            </div>
            {post.thumbnail && (
              <div>
                <Image
                  src={post.thumbnail}
                  width={50}
                  height={50}
                  className="shrink-0"
                  preview={false}
                />
              </div>
            )}
          </Link>
        </List.Item>
      )}
      className="bg-white rounded-xl"
    />
  );
}

export default PostListMobileSection;
