import { DescriptionsProps, Image } from "antd";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Branch } from "src/types/api/profile";
import { MyUser, OtherUser } from "src/types/api/user";

function getActivityItems(user: MyUser | OtherUser): DescriptionsProps["items"] {
  return [
    ...(user?.profile.rank !== "NONE"
      ? [
          {
            key: "1",
            label: "지구대",
            children: <p>{BRANCH_LOOKUP_TABLE[user?.profile.branch as Branch]}</p>,
          },
          {
            key: "2",
            label: "가입기수",
            children: <p>{user?.profile.generation.number}기</p>,
          },
          {
            key: "3",
            label: "활동학기",
            children: <p>{user?.profile.activityTerm}학기</p>,
          },
        ]
      : []),
    {
      key: "4",
      label: "회원등급",
      children: user && (
        <Image
          height={20}
          width={35}
          src={`/icons/rank/${user.profile.rank}.png`}
          alt={String(user.profile.rank)}
          preview={false}
        />
      ),
    },
    ...(user?.profile.responsibility !== "NORMAL" && user.profile.responsibility !== "NONE"
      ? [
          {
            key: "5",
            label: "직책",
            children: (
              <Image
                height={20}
                width={35}
                src={`/icons/responsibility/${user?.profile.responsibility}.png`}
                alt={String(user?.profile.responsibility)}
                preview={false}
              />
            ),
          },
        ]
      : []),
  ];
}

export default getActivityItems;
