import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BadgeSet from "src/components/common/BadgeSet";
import { User } from "src/types/api/user";
import { Author } from "src/types/api/author";

interface Props {
  user: User | Author;
}

function UserHeader({ user }: Props) {
  return (
    <div className="flex gap-2">
      <Avatar icon={<UserOutlined />} src={user.profile.profilePhoto} />
      <div className="flex gap-1 items-center">
        <BadgeSet user={user} height={20} />
        <Typography.Text>{user.profile.name}</Typography.Text>
      </div>
    </div>
  );
}

export default UserHeader;
