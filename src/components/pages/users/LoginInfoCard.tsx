import { Card, Descriptions } from "antd";
import getLoginItems from "src/utils/users/getLoginItems";
import useAuth from "src/contexts/auth/useAuth";

function LoginInfoCard() {
  const { user } = useAuth();

  return (
    <Card title="로그인 정보">
      <Descriptions items={user ? getLoginItems(user) : undefined} />
    </Card>
  );
}

export default LoginInfoCard;
