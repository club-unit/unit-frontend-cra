import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BadgeSet from "src/components/common/BadgeSet";
import { User } from "src/types/api/user";
import { Author } from "src/types/api/author";
import { Link } from "react-router-dom";
import useAuth from "src/contexts/auth/useAuth";

interface Props {
  user: User | Author;
}

function UserHeader({ user }: Props) {
  const { user: me } = useAuth();

  return (
    <Link
      to={user && me && user?.id === me?.id ? `/users/me` : `/users/${user.id}`}
      className="hover:bg-gray-200 rounded-lg"
    >
      <div className="flex gap-2 px-1 py-1">
        <Avatar icon={<UserOutlined />} src={user.profile.profilePhoto} />
        <div className="flex gap-1 items-center">
          <BadgeSet user={user} height={20} />
          <Typography.Text>{user.profile.name}</Typography.Text>
        </div>
      </div>
    </Link>
  );
}

export default UserHeader;
