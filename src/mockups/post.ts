import { Post } from "@/types/api/post";

export const posts: Post[] = [
  {
    id: 1,
    title: "title example1",
    content:
      "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
    author: {
      id: 1,
      profile: {
        name: "홍길동",
        branch: "JUNGSAN",
      },
    },
    comments: [
      {
        id: 1,
        content: "content",
        author: {
          id: 1,
          profile: {
            name: "홍길동",
            branch: "JUNGSAN",
          },
        },
      },
    ],
    isNotice: false,
    views: 10,
    likes: 20,
  },
  {
    id: 2,
    title: "title exampl2",
    content:
      "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
    author: {
      id: 1,
      profile: {
        name: "홍길동",
        branch: "JUNGSAN",
      },
    },
    comments: [
      {
        id: 1,
        content: "content",
        author: {
          id: 1,
          profile: {
            name: "홍길동",
            branch: "JUNGSAN",
          },
        },
      },
    ],
    isNotice: false,
    views: 10,
    likes: 20,
  },
  {
    id: 3,
    title: "title exampl3",
    content:
      "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
    author: {
      id: 1,
      profile: {
        name: "홍길동",
        branch: "JUNGSAN",
      },
    },
    comments: [
      {
        id: 1,
        content: "content",
        author: {
          id: 1,
          profile: {
            name: "홍길동",
            branch: "JUNGSAN",
          },
        },
      },
    ],
    isNotice: false,
    views: 10,
    likes: 20,
  },
  {
    id: 4,
    title: "title exampl4",
    content:
      "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
    author: {
      id: 1,
      profile: {
        name: "홍길동",
        branch: "JUNGSAN",
      },
    },
    comments: [
      {
        id: 1,
        content: "content",
        author: {
          id: 1,
          profile: {
            name: "홍길동",
            branch: "JUNGSAN",
          },
        },
      },
    ],
    isNotice: false,
    views: 10,
    likes: 20,
  },
];
