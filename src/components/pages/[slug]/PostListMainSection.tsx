import { Image, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { PushpinFilled } from "@ant-design/icons";
import { Post } from "src/types/api/post";
import { Author } from "src/types/api/author";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

interface Props {
  posts: Post[];
}

function PostListMainSection({ posts }: Props) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });
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
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <Typography.Text className="whitespace-nowrap text-ellipsis text-xs md:text-sm">
          {title}
        </Typography.Text>
      ),
      ellipsis: true,
    },
    {
      title: "글쓴이",
      dataIndex: "author",
      key: "author",
      render: ({ profile }: Author) => {
        return (
          <div className="flex gap-1 align-middle text-xs md:text-sm">
            <Image
              height={innerWidth > 768 ? 20 : 15}
              width={innerWidth > 768 ? 35 : 25}
              src={`/icons/rank/${profile.rank}.png`}
              alt={String(profile.rank)}
              preview={false}
            />
            {profile.responsibility !== "NONE" && profile.responsibility !== "NORMAL" && (
              <Image
                height={innerWidth > 768 ? 20 : 15}
                width={innerWidth > 768 ? 35 : 25}
                src={`/icons/responsibility/${profile.responsibility}.png`}
                alt={String(profile.responsibility)}
                preview={false}
              />
            )}

            {profile.name}
          </div>
        );
      },
      width: innerWidth > 768 ? 150 : 110,
    },
    {
      title: "작성일",
      dataIndex: "created",
      key: "created",
      render: (created: string) => (
        <Typography.Text className="text-xs md:text-sm">
          {dayjs(created).format("MM.DD")}
        </Typography.Text>
      ),
      width: 70,
    },
    {
      title: "조회",
      dataIndex: "views",
      key: "views",
      render: (views: string) => (
        <Typography.Text className="text-xs md:text-sm">{views}</Typography.Text>
      ),
      width: innerWidth > 768 ? 60 : 50,
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

export default PostListMainSection;
