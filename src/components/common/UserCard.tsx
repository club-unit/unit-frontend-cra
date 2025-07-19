import { Avatar, Badge, Card, Divider, Image, Typography } from "antd";
import useAuth from "src/contexts/auth/useAuth";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Link, useNavigate } from "react-router-dom";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import NotificationPopup from "src/components/common/NotificationPopup";
import useNotifications from "src/hooks/api/common/useNotifications";
import useNotificationsNumUnreads from "src/hooks/api/common/useNotificationsNumUnreads";

function UserCard() {
  const { user, logout } = useAuth();
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [notiPage, setNotiPage] = useState<number>(1);
  const { data: notiData, mutate: notiMutate } = useNotifications({ page: notiPage });
  const { data: notiUnreadsNumData, mutate: notiUnreadsMutate } = useNotificationsNumUnreads();
  const navigate = useNavigate();

  return (
    <Card size="small" title="내 정보">
      {user && (
        <>
          <div className="flex gap-4">
            <Avatar icon={<UserOutlined />} src={user.profile.profilePhoto} size={60} />
            <div className="flex flex-col gap-2 align-middle flex-wrap mb-2">
              <div className="flex gap-2">
                {user && (
                  <Image
                    height={27}
                    width={45}
                    src={`/icons/rank/${user.profile.rank}.png`}
                    alt={String(user.profile.rank)}
                    preview={false}
                  />
                )}
                {user.profile.responsibility !== "NONE" &&
                  user.profile.responsibility !== "NORMAL" && (
                    <Image
                      height={27}
                      width={45}
                      src={`/icons/responsibility/${user.profile.responsibility}.png`}
                      alt={String(user?.profile.responsibility)}
                      preview={false}
                    />
                  )}
              </div>

              <div className="flex gap-1 items-center">
                <Typography.Text className="text-lg whitespace-nowrap" strong>
                  {user.profile.name}
                </Typography.Text>
                <Typography.Text className="text-gray-500 font-light whitespace-nowrap">
                  {user.username}
                </Typography.Text>
              </div>
            </div>
          </div>
          {user.profile.rank !== "NONE" && (
            <div className="flex justify-start gap-1 flex-wrap mb-2">
              <Typography.Text className="text-gray-500">{`${
                BRANCH_LOOKUP_TABLE[user.profile.branch]
              }지구대에서`}</Typography.Text>{" "}
              <Typography.Text className="text-gray-500">{`${user.profile.activityTerm}학기${
                user.profile.rank === "OB" ? " 이상" : "째"
              } `}</Typography.Text>
              <Typography.Text className="text-gray-500">{` 활동 중! (${user.profile.generation?.number}기)`}</Typography.Text>
            </div>
          )}
          <div className="flex justify-between">
            <Badge count={notiUnreadsNumData?.numUnreads} size="small">
              <BellFilled
                className="text-blue-500 hover:text-blue-400"
                onClick={() => setIsNotiOpen(true)}
              />
            </Badge>

            <Typography.Text className="text-blue-500 hover:cursor-pointer" underline>
              <Link to="/users/me">내 정보 보기</Link>
            </Typography.Text>
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between align-middle h-fit">
            <Typography.Text
              className="text-blue-500 hover:cursor-pointer"
              underline
              onClick={logout}
            >
              로그아웃
            </Typography.Text>
          </div>
          <NotificationPopup
            notifications={notiData?.results || []}
            page={notiPage}
            setPage={setNotiPage}
            isOpen={isNotiOpen}
            setIsOpen={setIsNotiOpen}
            mutate={() => {
              notiMutate();
              notiUnreadsMutate();
            }}
          />
        </>
      )}
    </Card>
  );
}

export default UserCard;
