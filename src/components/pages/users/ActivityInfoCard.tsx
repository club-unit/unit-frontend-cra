import { Card, Descriptions } from "antd";
import getActivityItems from "src/utils/users/getActivityItems";
import { OtherUser } from "src/types/api/user";
import useAuth from "src/contexts/auth/useAuth";

interface Props {
  otherUser?: OtherUser;
}

function ActivityInfoCard({ otherUser }: Props) {
  const { user } = useAuth();

  return (
    <Card title="활동 정보">
      <Descriptions
        items={otherUser ? getActivityItems(otherUser) : user ? getActivityItems(user) : undefined}
      />
    </Card>
  );
}

export default ActivityInfoCard;
