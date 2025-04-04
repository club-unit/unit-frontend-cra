import { DescriptionsProps } from "antd";
import { MyUser } from "src/types/api/user";
import PwChangeForm from "src/components/pages/users/PwChangeForm";

function getLoginItems(user: MyUser): DescriptionsProps["items"] {
  return [
    {
      key: "1",
      label: "아이디",
      children: <p>{user?.username}</p>,
    },
    {
      key: "2",
      label: "비밀번호",
      children: <PwChangeForm />,
    },
  ];
}

export default getLoginItems;
