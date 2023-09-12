import { Image, Table } from "antd";
import { Post } from "@/types/api/post";
import { Author } from "@/types/api/author";
import dayjs from "dayjs";
import React from "react";
import { PushpinFilled } from "@ant-design/icons";
import { useRouter } from "next/router";

interface Props {
  posts: Post[];
}

function PostListMainSection({ posts }: Props) {
  const router = useRouter();
  const columns = [
    {
      title: "분류",
      key: "category",
      render: (post: Post) => (
        <div className="flex gap-2">
          {post.category}
          {post.isPinned && <PushpinFilled />}
        </div>
      ),
      width: 100,
    },
    { title: "제목", dataIndex: "title", key: "title", ellipsis: true },
    {
      title: "글쓴이",
      dataIndex: "author",
      key: "author",
      render: ({ profile }: Author) => {
        return (
          <div className="flex gap-1 align-middle">
            {profile.responsibility !== "NONE" && profile.responsibility !== "NORMAL" && (
              <Image
                height={20}
                src={`/icons/responsibility/${profile.responsibility}.png`}
                alt={String(profile.responsibility)}
                preview={false}
              />
            )}
            <Image
              height={20}
              src={`/icons/rank/${profile.rank}.png`}
              alt={String(profile.rank)}
              preview={false}
            />
            {profile.name}
          </div>
        );
      },
      width: 150,
    },
    {
      title: "작성일",
      dataIndex: "created",
      key: "created",
      render: (created: string) => dayjs(created).format("MM.DD"),
      width: 70,
    },
    { title: "조회수", dataIndex: "views", key: "views", width: 70 },
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
            onClick: () => router.push(`/${router.query.slug}/${post.id}`),
            className: "hover:cursor-pointer",
          };
        }}
      />
    </div>
  );
}

export default PostListMainSection;
