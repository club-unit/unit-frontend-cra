import { Post, PostDetail } from "@/types/api/post";

export const MOCKUP_POST_DETAIL: PostDetail = {
  id: 1,
  title: "title example1",
  category: "공지",
  content:
    "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
  author: {
    id: 1,
    profile: {
      name: "홍길동",
      branch: "JUNGSAN",
      rank: "asdf",
      responsibility: "asdf",
    },
  },
  comments: [
    {
      id: 1,
      content:
        "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
      author: {
        id: 1,
        profile: {
          name: "홍길동",
          branch: "JUNGSAN",
          rank: "asdf",
          responsibility: "asdf",
        },
      },
      children: [
        {
          id: 1,
          content:
            "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
          author: {
            id: 1,
            profile: {
              name: "홍길동",
              branch: "JUNGSAN",
              rank: "asdf",
              responsibility: "asdf",
            },
          },
          children: [],
          created: "2017-03-16T17:40:00+09:00",
        },
      ],
      created: "2017-03-16T17:40:00+09:00",
    },
  ],
  isPinned: false,
  views: 10,
};

const MOCKUP_POST_LIST_ELEMENT: (num: number) => Post = (num) => ({
  id: num,
  title: "example" + num,
  content:
    "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent",
  category: "string",
  author: {
    id: 1,
    profile: {
      name: "홍길동",
      branch: "JUNGSAN",
      rank: "asdf",
      responsibility: "asdf",
    },
  },
  isPinned: false,
  views: 10,
});

export const MOCKUP_POST_LIST: Post[] = [
  MOCKUP_POST_LIST_ELEMENT(1),
  MOCKUP_POST_LIST_ELEMENT(2),
  MOCKUP_POST_LIST_ELEMENT(3),
  MOCKUP_POST_LIST_ELEMENT(4),
];
