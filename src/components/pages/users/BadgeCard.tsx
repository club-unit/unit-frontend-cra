import { Avatar, Card, Popover } from "antd";
import { OtherUser } from "src/types/api/user";
import { MOCKUP_BADGE_LIST } from "src/mockups/badge";
import { TrophyOutlined } from "@ant-design/icons";

interface Props {
  otherUser?: OtherUser;
}

function BadgeCard({ otherUser }: Props) {
  const badges = MOCKUP_BADGE_LIST;

  return (
    <Card title="뱃지">
      <div className="flex gap-5 flex-wrap">
        {badges.map((badge) => (
          <Popover content={badge.description}>
            <Avatar icon={<TrophyOutlined />} src={badge.image} size={70} />
          </Popover>
        ))}
      </div>
    </Card>
  );
}

export default BadgeCard;
