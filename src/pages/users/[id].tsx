import { Avatar, Card, Descriptions, DescriptionsProps, Image, Typography } from "antd";
import { SEX_LOOKUP_TABLE } from "src/constants/user";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Branch } from "src/types/api/profile";
import { withAuth } from "src/components/common/withAuth";
import { UserOutlined } from "@ant-design/icons";
import useAuthSWR from "src/hooks/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { useParams } from "react-router-dom";
import { OtherUser } from "src/types/api/user";

function ProfilePage() {
  const { id } = useParams();
  const { data: user } = useAuthSWR<OtherUser>(
    id
      ? {
          url: API_ROUTES.users.byId(Number(id)),
        }
      : null
  );

  const personalItems: DescriptionsProps["items"] = [
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
    {
      key: "3",
      label: "아이디",
      children: <p>{user?.username}</p>,
    },
  ];

  const activityItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "지구대",
      children: <p>{BRANCH_LOOKUP_TABLE[user?.profile.branch as Branch]}</p>,
    },
    {
      key: "2",
      label: "가입기수",
      children: <p>{user?.profile.generation}기</p>,
    },
    {
      key: "3",
      label: "활동학기",
      children: <p>{user?.profile.activityTerm}학기</p>,
    },
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
    ...(user?.profile.responsibility !== "NORMAL"
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

  return (
    <div className="flex flex-col gap-2">
      <Typography.Title level={2}>
        {user?.profile.name}({user?.username})님의 프로필
      </Typography.Title>
      <Card title="기본 정보">
        <div className="flex flex-col gap-4 justify-end">
          <Avatar icon={<UserOutlined />} src={user?.profile.profilePhoto} size={200} />
          <Descriptions items={personalItems} />
        </div>
      </Card>
      <Card title="활동 정보">
        <Descriptions items={activityItems} />
      </Card>
    </div>
  );
}

const ProfileWithAuth = withAuth(ProfilePage, true);

export default ProfileWithAuth;
