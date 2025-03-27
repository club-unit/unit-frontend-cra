import { Typography } from "antd";
import { withAuth } from "src/components/common/withAuth";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";
import ActivityInfoCard from "src/components/pages/users/ActivityInfoCard";
import BasicInfoCard from "src/components/pages/users/BasicInfoCard";
import BadgeCard from "src/components/pages/users/BadgeCard";
import { useLayoutEffect } from "react";
import useUser from "src/hooks/api/users/useUser";

function ProfilePage() {
  const { id } = useParams();
  const { user: me } = useAuth();
  const navigate = useNavigate();
  const { data: user } = useUser(Number(id));

  useLayoutEffect(() => {
    if (user && me && user?.id === me?.id) {
      navigate("/users/me");
    }
  }, [user, me, navigate]);

  return (
    <div className="flex flex-col gap-2">
      <Typography.Title level={2}>
        {user?.profile.name}({user?.username})님의 프로필
      </Typography.Title>
      <BasicInfoCard otherUser={user} />
      <ActivityInfoCard otherUser={user} />
      <BadgeCard otherUser={user} />
    </div>
  );
}

const ProfileWithAuth = withAuth(ProfilePage, true);

export default ProfileWithAuth;
