import { SEX_LOOKUP_TABLE } from "src/constants/user";
import dayjs from "dayjs";
import { DescriptionsProps } from "antd";
import { MyUser, OtherUser } from "src/types/api/user";
import { MyProfile, OtherProfile } from "src/types/api/profile";

function isProfileDetail(profile: MyProfile | OtherProfile): profile is MyProfile {
  return (profile as MyProfile).birthDate !== undefined;
}

function getPersonalItems<T extends boolean>(
  user: T extends true ? MyUser : OtherUser,
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
      children: <p>{user?.profile.sex && SEX_LOOKUP_TABLE[user?.profile.sex]}</p>,
    },
    { key: "3", label: "이메일", children: <p>{user?.profile.email}</p> },
    ...(isMine && isProfileDetail(user.profile)
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
            label: "아이디",
            children: <p>{user.username}</p>,
          },
        ]),
  ];
}

export default getPersonalItems;
