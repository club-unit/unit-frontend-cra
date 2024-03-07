import { SEX_LOOKUP_TABLE } from "src/constants/user";
import dayjs from "dayjs";
import { DescriptionsProps } from "antd";
import { OtherUser, User } from "src/types/api/user";
import { OtherProfile, ProfileDetail } from "src/types/api/profile";

function isProfileDetail(profile: ProfileDetail | OtherProfile): profile is ProfileDetail {
  return (profile as ProfileDetail).birthDate !== undefined;
}

function getPersonalItems<T extends boolean>(
  user: T extends true ? User : OtherUser,
  isMine?: boolean
): DescriptionsProps["items"] {
  return [
    {
      key: "1",
      label: "이름",
      children: <p>{user?.profile.name}</p>,
    },
    {
      key: "2",
      label: "성별",
      children: <p>{SEX_LOOKUP_TABLE[user?.profile.sex as number]}</p>,
    },
    ...(isMine && isProfileDetail(user.profile)
      ? [
          {
            key: "3",
            label: "전화번호",
            children: <p>{user?.profile.phoneNumber}</p>,
          },
          {
            key: "4",
            label: "생년월일",
            children: <p>{dayjs(user?.profile.birthDate).format("YYYY년 MM월 DD일")}</p>,
          },
        ]
      : [
          {
            key: "3",
            label: "아이디",
            children: <p>{user.username}</p>,
          },
        ]),
  ];
}

export default getPersonalItems;
