import { withAuth } from "src/components/common/withAuth";
import { Card, Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";

function PasswordResetPage() {
  return (
    <Card className="w-full h-[80vh]">
      <div className="flex flex-col gap-4 items-center w-full justify-center">
        <RobotOutlined style={{ fontSize: 100 }} />
        <Typography.Title>개발중</Typography.Title>
        <Typography.Text>현재 개발중인 페이지입니다.</Typography.Text>
        <Typography.Text>웹 관리자에게 직접 문의하세요</Typography.Text>
      </div>
    </Card>
  );
}

const PasswordResetWithAuth = withAuth(PasswordResetPage, false);

export default PasswordResetWithAuth;
