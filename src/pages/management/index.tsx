import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { withAuth } from "src/components/common/withAuth";
import { RobotOutlined } from "@ant-design/icons";

function ManagementMain() {
  const navigate = useNavigate();

  return (
    <div>
      <Card className="w-full h-[80vh]">
        <div className="flex flex-col gap-4 items-center w-full justify-center">
          <RobotOutlined style={{ fontSize: 100 }} />
          <Typography.Title>관리 페이지 개발중</Typography.Title>
          <Typography.Text>현재 개발중인 페이지입니다.</Typography.Text>
          <Typography.Text>웹 관리자에게 직접 문의하세요</Typography.Text>
          <Button onClick={() => navigate("/management/bowling/")}>볼링 기록 관리</Button>
          <Button onClick={() => navigate("/management/members/")}>회원 관리</Button>
        </div>
      </Card>
    </div>
  );
}

const ManagementMainWithAuth = withAuth(ManagementMain, true);

export default ManagementMainWithAuth;
