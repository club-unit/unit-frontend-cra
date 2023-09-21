import { Card, Divider, Image, Typography } from "antd";
import { BellFilled } from "@ant-design/icons";
import useAuth from "src/contexts/auth/useAuth";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Link } from "react-router-dom";

function UserCard() {
  const { user, logout } = useAuth();

  return (
    <Card size="small" title="Profile">
      {user && (
        <>
          <div className="flex justify-between align-middle mb-2">
            <div className="flex gap-2 align-middle">
              {user && (
                <Image
                  height={27}
                  src={`/icons/rank/${user.profile.rank}.png`}
                  alt={String(user.profile.rank)}
                  preview={false}
                />
              )}
              {user.profile.responsibility !== "NONE" &&
                user.profile.responsibility !== "NORMAL" && (
                  <Image
                    height={27}
                    src={`/icons/responsibility/${user.profile.responsibility}.png`}
                    alt={String(user?.profile.responsibility)}
                    preview={false}
                  />
                )}
              <Typography.Text className="text-lg" strong>
                {user.profile.name}
              </Typography.Text>
            </div>
            <Typography.Text className="text-gray-500 font-light">{user.username}</Typography.Text>
          </div>
          {user.profile.rank !== "NONE" && (
            <div className="flex justify-start gap-1">
              <Typography.Text className="text-blue-500">{`${
                BRANCH_LOOKUP_TABLE[user.profile.branch]
              }지구대에서`}</Typography.Text>
              <Typography.Text className="text-blue-500">{`${user.profile.activityTerm}학기째 활동 중!`}</Typography.Text>
            </div>
          )}
          <Divider className="my-2" />
          <div className="flex justify-between align-middle h-fit">
            <Link to="/">
              <BellFilled />
            </Link>
            <Typography.Text
              className="text-blue-500 hover:cursor-pointer"
              underline
              onClick={logout}
            >
              로그아웃
            </Typography.Text>
          </div>
        </>
      )}
    </Card>
  );
}

export default UserCard;
