import { Board } from "@/types/api/board";
import { CommonListResponse } from "@/types/api/common";

export const boards: CommonListResponse<Board> = [
  {
    name: "게시판",
    slug: "basic",
    categories: [],
    children: [
      {
        name: "회칙",
        slug: "rules",
        categories: [],
        children: null,
      },
      {
        name: "공지사항",
        slug: "notice",
        categories: [],
        children: null,
      },
      {
        name: "갤러리",
        slug: "gallery",
        categories: [],
        children: null,
      },
      {
        name: "신입모집",
        slug: "recruit",
        categories: [],
        children: null,
      },
    ],
  },
  {
    name: "지구대",
    slug: "branch",
    categories: [],
    children: [
      {
        name: "그린",
        slug: "green",
        categories: [
          {
            name: "공지",
          },
          {
            name: "벙개",
          },
          {
            name: "기타",
          },
        ],
        children: null,
      },
      {
        name: "동아",
        slug: "donga",
        categories: [
          {
            name: "공지",
          },
          {
            name: "벙개",
          },
          {
            name: "기타",
          },
        ],
        children: null,
      },
      {
        name: "시티",
        slug: "city",
        categories: [
          {
            name: "공지",
          },
          {
            name: "벙개",
          },
          {
            name: "기타",
          },
        ],
        children: null,
      },
      {
        name: "유니온",
        slug: "union",
        categories: [
          {
            name: "공지",
          },
          {
            name: "벙개",
          },
          {
            name: "기타",
          },
        ],
        children: null,
      },
      {
        name: "잠실",
        slug: "jamsil",
        categories: [
          {
            name: "공지",
          },
          {
            name: "벙개",
          },
          {
            name: "기타",
          },
        ],
        children: null,
      },
      {
        name: "정산",
        slug: "jungsan",
        categories: [],
        children: null,
      },
    ],
  },
  {
    name: "소모임",
    slug: "crew",
    categories: [],
    children: [
      {
        name: "보드",
        slug: "snowboard",
        categories: [
          {
            name: "공지",
          },
          {
            name: "기타",
          },
        ],
        children: null,
      },
    ],
  },
  {
    name: "임원",
    slug: "staff",
    categories: [],
    children: [
      {
        name: "그린",
        slug: "staff-green",
        categories: [],
        children: null,
      },
      {
        name: "동아",
        slug: "staff-donga",
        categories: [],
        children: null,
      },
      {
        name: "시티",
        slug: "staff-city",
        categories: [],
        children: null,
      },
      {
        name: "유니온",
        slug: "staff-union",
        categories: [],
        children: null,
      },
      {
        name: "잠실",
        slug: "staff-jamsil",
        categories: [],
        children: null,
      },
      {
        name: "정산",
        slug: "staff-jungsan",
        categories: [],
        children: null,
      },
    ],
  },
  {
    name: "총단",
    slug: "club-staff",
    categories: [],
    children: [
      {
        name: "회의록",
        slug: "club-meeting",
        categories: [],
        children: null,
      },
      {
        name: "회계록",
        slug: "club-account-book",
        categories: [],
        children: null,
      },
    ],
  },
];
