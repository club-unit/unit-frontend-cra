import { Post, PostDetail } from "src/types/api/post";
import { CommonPagedResponse } from "src/types/api/common";

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
  created: "",
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
  created: "",
});

export const MOCKUP_POST_LIST: CommonPagedResponse<Post> = {
  count: 20,
  next: "asdf",
  previous: "asdf",
  results: [
    MOCKUP_POST_LIST_ELEMENT(1),
    MOCKUP_POST_LIST_ELEMENT(2),
    MOCKUP_POST_LIST_ELEMENT(3),
    MOCKUP_POST_LIST_ELEMENT(4),
    MOCKUP_POST_LIST_ELEMENT(5),
    MOCKUP_POST_LIST_ELEMENT(6),
    MOCKUP_POST_LIST_ELEMENT(7),
    MOCKUP_POST_LIST_ELEMENT(8),
    MOCKUP_POST_LIST_ELEMENT(9),
    MOCKUP_POST_LIST_ELEMENT(10),
    MOCKUP_POST_LIST_ELEMENT(11),
    MOCKUP_POST_LIST_ELEMENT(12),
    MOCKUP_POST_LIST_ELEMENT(13),
    MOCKUP_POST_LIST_ELEMENT(14),
    MOCKUP_POST_LIST_ELEMENT(15),
    MOCKUP_POST_LIST_ELEMENT(16),
    MOCKUP_POST_LIST_ELEMENT(17),
    MOCKUP_POST_LIST_ELEMENT(18),
    MOCKUP_POST_LIST_ELEMENT(19),
    MOCKUP_POST_LIST_ELEMENT(20),
  ],
};
