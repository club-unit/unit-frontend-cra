import { Typography } from "antd";
import { withAuth } from "src/components/common/withAuth";
import BasicInfoCard from "src/components/pages/users/BasicInfoCard";
import LoginInfoCard from "src/components/pages/users/LoginInfoCard";
import ActivityInfoCard from "src/components/pages/users/ActivityInfoCard";
import BadgeCard from "src/components/pages/users/BadgeCard";

function MyPage() {
  return (
    <div className="flex flex-col gap-2">
      <Typography.Title level={2}>마이페이지</Typography.Title>
      <BasicInfoCard />
      <LoginInfoCard />
      <ActivityInfoCard />
      <BadgeCard />
    </div>
  );
}

const MyWithAuth = withAuth(MyPage, true);

export default MyWithAuth;
