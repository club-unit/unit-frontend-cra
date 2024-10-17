import { Avatar, Card, Popover } from "antd";
import { OtherUser } from "src/types/api/user";
import { TrophyOutlined } from "@ant-design/icons";
import useAuth from "src/contexts/auth/useAuth";
import BadgeText from "src/components/pages/users/BadgeText";

interface Props {
  otherUser?: OtherUser;
}

function BadgeCard({ otherUser }: Props) {
  const { user } = useAuth();
  const badges = otherUser ? otherUser?.profile.badges : user?.profile.badges;

  return (
    <Card title="뱃지">
      <div className="flex gap-5 flex-wrap">
        {badges?.length ? (
          badges?.map((badge) => (
            <Popover content={<BadgeText name={badge.name} description={badge.description} />}>
              <Avatar icon={<TrophyOutlined />} src={badge.image} size={70} />
            </Popover>
          ))
        ) : (
          <p className="text-gray-500">뱃지가 없습니다</p>
        )}
      </div>
    </Card>
  );
}

export default BadgeCard;
