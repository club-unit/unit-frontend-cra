import { Avatar, Card, Descriptions, DescriptionsProps, Typography } from "antd";
import { SEX_LOOKUP_TABLE } from "src/constants/user";
import { withAuth } from "src/components/common/withAuth";
import { UserOutlined } from "@ant-design/icons";
import useAuthSWR from "src/hooks/useAuthSWR";
import { API_ROUTES } from "src/constants/routes";
import { useNavigate, useParams } from "react-router-dom";
import { OtherUser } from "src/types/api/user";
import getActivityItems from "src/utils/users/getActivityItems";
import useAuth from "src/contexts/auth/useAuth";
import { useEffect } from "react";

function ProfilePage() {
  const { id } = useParams();
  const { user: me } = useAuth();
  const navigate = useNavigate();
  const { data: user } = useAuthSWR<OtherUser>(
    id
      ? {
          url: API_ROUTES.users.byId(Number(id)),
        }
      : null
  );

  const othersPersonalItems: DescriptionsProps["items"] = [
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

  const activityItems = user ? getActivityItems(user) : undefined;

  useEffect(() => {
    if (user && me && user?.id === me?.id) {
      navigate("/users/me");
    }
  }, [user, me, navigate]);

  return (
    <div className="flex flex-col gap-2">
      <Typography.Title level={2}>
        {user?.profile.name}({user?.username})님의 프로필
      </Typography.Title>
      <Card title="기본 정보">
        <div className="flex flex-col gap-4 justify-end">
          <Avatar icon={<UserOutlined />} src={user?.profile.profilePhoto} size={200} />
          <Descriptions items={othersPersonalItems} />
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
