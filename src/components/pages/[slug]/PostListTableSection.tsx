import { Image, Table, Typography } from "antd";
import React from "react";
import { PushpinFilled } from "@ant-design/icons";
import { Post, PostSummary } from "src/types/api/post";
import { Author } from "src/types/api/author";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import BadgeSet from "src/components/common/BadgeSet";
import formatDateString from "src/utils/common/dateToString";

interface Props {
  posts: PostSummary[];
}

function PostListTableSection({ posts }: Props) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const columns = [
    {
      title: "",
      key: "isPinned",
      render: (post: Post) => (
        <div className="flex gap-2">{post.isPinned && <PushpinFilled />}</div>
      ),
      width: 25,
    },
    {
      title: "제목",
      key: "title",
      render: (post: Post) => (
        <div className="flex items-center gap-2">
          {post.thumbnail ? (
            <div>
              <Image
                src={post.thumbnail}
                height={70}
                width={70}
                className="shrink-0"
                preview={false}
              />
            </div>
          ) : (
            <div className="w-[70px]" />
          )}
          <Typography.Text className="whitespace-nowrap text-ellipsis text-sm shrink">
            {post.title}
          </Typography.Text>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "글쓴이",
      dataIndex: "author",
      key: "author",
      render: (author: Author) => {
        return (
          <div className="flex gap-1 align-middle text-sm">
            <BadgeSet user={author} height={20} />
            {author.profile.name}
          </div>
        );
      },
      width: 110,
    },
    {
      title: "작성일",
      dataIndex: "created",
      key: "created",
      render: (created: string) => (
        <Typography.Text
          className={`text-xs md:text-sm ${
            dayjs().diff(dayjs(created), "hour") < 24 && "text-red-600"
          }`}
        >
          {formatDateString(created)}
        </Typography.Text>
      ),
      width: 100,
    },
    {
      title: "댓글",
      dataIndex: "numComments",
      key: "numComments",
      width: 50,
    },
    {
      title: "조회",
      dataIndex: "views",
      key: "views",
      width: 60,
    },
  ];

  const postList = posts.map((post) => ({ ...post, key: post.id }));

  return (
    <div className="mt-2">
      <Table
        dataSource={postList}
        columns={columns}
        pagination={false}
        size="small"
        onRow={(post) => {
          return {
            onClick: () => navigate(`/${slug}/${post.id}`),
            className: "hover:cursor-pointer",
          };
        }}
      />
    </div>
  );
}

export default PostListTableSection;
