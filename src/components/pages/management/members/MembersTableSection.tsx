import { Avatar, Image, Table, Tag } from "antd";
import { UsersListUser } from "src/types/api/user";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { RESPONSIBILITY_LOOKUP_TABLE } from "src/constants/responsibility";
import { RANK_LOOKUP_TABLE } from "src/constants/rank";
import { SEX_LOOKUP_TABLE } from "src/constants/user";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Branch } from "src/types/api/profile";

interface Props {
  users: UsersListUser[];
}

const BRANCH_COLOR_MAP: Record<Branch, string> = {
  GREEN: "green",
  DONGA: "orange",
  CITY: "blue",
  UNION: "purple",
  JAMSIL: "magenta",
  JUNGSAN: "cyan",
};

function MembersTableSection({ users }: Props) {
  const navigate = useNavigate();

  const columns = [
    {
      title: "",
      key: "profilePhoto",
      render: (user: UsersListUser) => (
        <Avatar src={user.profile.profilePhoto} icon={<UserOutlined />} size={28} />
      ),
      width: 36,
    },
    {
      title: "이름",
      key: "name",
      render: (user: UsersListUser) => (
        <span className="font-medium text-xs">{user.profile.name}</span>
      ),
      width: 60,
    },
    {
      title: "성별",
      key: "sex",
      render: (user: UsersListUser) => (
        <span className="text-xs">{SEX_LOOKUP_TABLE[user.profile.sex] || user.profile.sex}</span>
      ),
      width: 36,
    },
    {
      title: "나이",
      key: "yearAge",
      render: (user: UsersListUser) => <span className="text-xs">{user.profile.yearAge}</span>,
      width: 36,
    },
    {
      title: "지구대",
      key: "branch",
      render: (user: UsersListUser) => (
        <Tag color={BRANCH_COLOR_MAP[user.profile.branch]} className="text-xs m-0">
          {BRANCH_LOOKUP_TABLE[user.profile.branch]}
        </Tag>
      ),
      width: 60,
    },
    {
      title: "직책",
      key: "responsibility",
      render: (user: UsersListUser) =>
        user.profile.responsibility !== "NONE" && user.profile.responsibility !== "NORMAL" ? (
          <Image
            height={16}
            width={28}
            src={`/icons/responsibility/${user.profile.responsibility}.png`}
            alt={RESPONSIBILITY_LOOKUP_TABLE[user.profile.responsibility]}
            preview={false}
          />
        ) : (
          <span className="text-xs text-gray-400">-</span>
        ),
      width: 40,
    },
    {
      title: "등급",
      key: "rank",
      render: (user: UsersListUser) => (
        <Image
          height={16}
          width={28}
          src={`/icons/rank/${user.profile.rank}.png`}
          alt={RANK_LOOKUP_TABLE[user.profile.rank]}
          preview={false}
        />
      ),
      width: 40,
    },
    {
      title: "가입",
      key: "joinedGeneration",
      render: (user: UsersListUser) => (
        <span className="text-xs">
          {user.profile.joinedGeneration?.number
            ? `${user.profile.joinedGeneration.number}기`
            : "-"}
        </span>
      ),
      width: 40,
    },
    {
      title: "활동",
      key: "activityTerm",
      render: (user: UsersListUser) => <span className="text-xs">{user.profile.activityTerm}</span>,
      width: 36,
    },
    {
      title: "연락처",
      key: "phoneNumber",
      render: (user: UsersListUser) => <span className="text-xs">{user.profile.phoneNumber}</span>,
      width: 100,
    },
    {
      title: "생년월일",
      key: "birthDate",
      render: (user: UsersListUser) => <span className="text-xs">{user.profile.birthDate}</span>,
      width: 80,
    },
    {
      title: "상태",
      key: "isLeaved",
      render: (user: UsersListUser) =>
        user.profile.isLeaved ? (
          <Tag color="default" className="text-xs m-0">
            탈퇴
          </Tag>
        ) : (
          <Tag color="green" className="text-xs m-0">
            가입중
          </Tag>
        ),
      width: 52,
    },
  ];

  const userList = users.map((user) => ({ ...user, key: user.id }));

  return (
    <div className="overflow-x-auto">
      <Table
        dataSource={userList}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ x: 750 }}
        className="members-table"
        onRow={(user) => ({
          onClick: (e) => {
            if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
              navigate(`/users/${user.id}`);
            }
          },
          onAuxClick: (e) => {
            if (e.button === 1) {
              window.open(`/users/${user.id}`, "_blank");
            }
          },
          className: "hover:cursor-pointer",
        })}
      />
      <style>{`
        .members-table .ant-table-cell {
          padding: 4px 6px !important;
        }
      `}</style>
    </div>
  );
}

export default MembersTableSection;
