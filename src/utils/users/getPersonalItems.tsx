import { SEX_LOOKUP_TABLE } from "src/constants/user";
import dayjs from "dayjs";
import { DescriptionsProps } from "antd";
import { User } from "src/types/api/user";

function getPersonalItems(user: User, isMine?: boolean): DescriptionsProps["items"] {
  return [
    {
      key: "1",
      label: "이름",
      children: <p>{user?.profile.name}</p>,
    },
    {
      key: "2",
      label: "성별",
      children: <p>{user?.profile.sex && SEX_LOOKUP_TABLE[user?.profile.sex]}</p>,
    },
    { key: "3", label: "이메일", children: <p>{user?.profile.email}</p> },
    ...(isMine
      ? [
          {
            key: "4",
            label: "전화번호",
            children: <p>{user?.profile.phoneNumber}</p>,
          },
          {
            key: "5",
            label: "생년월일",
            children: <p>{dayjs(user?.profile.birthDate).format("YYYY년 MM월 DD일")}</p>,
          },
        ]
      : [
          {
            key: "4",
            label: "성별",
            children: <p>{user?.profile.sex && SEX_LOOKUP_TABLE[user?.profile.sex]}</p>,
          },
        ]),
  ];
}

export default getPersonalItems;
