import { Typography } from "antd";
import useAuth from "src/contexts/auth/useAuth";
import { withAuth } from "src/components/common/withAuth";
import BasicInfoCard from "src/components/pages/users/BasicInfoCard";
import LoginInfoCard from "src/components/pages/users/LoginInfoCard";
import ActivityInfoCard from "src/components/pages/users/ActivityInfoCard";

function MyPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <Typography.Title level={2}>마이페이지</Typography.Title>
      <BasicInfoCard />
      <LoginInfoCard />
      <ActivityInfoCard />
    </div>
  );
}

const MyWithAuth = withAuth(MyPage, true);

export default MyWithAuth;
