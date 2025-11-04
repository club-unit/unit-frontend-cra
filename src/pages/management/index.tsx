import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { withAuth } from "src/components/common/withAuth";
import { BarChartOutlined, TeamOutlined } from "@ant-design/icons";

function ManagementMain() {
  const navigate = useNavigate();

  const dotPatternStyle: React.CSSProperties = {
    backgroundImage: `radial-gradient(circle, #d9d9d9 1px, transparent 1px)`,
    backgroundSize: "20px 20px",
    backgroundColor: "#fafafa",
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={2}>관리 페이지</Typography.Title>

      <Card style={dotPatternStyle}>
        <div className="flex flex-col gap-3">
          <Typography.Text type="secondary">관리 기능을 선택하세요</Typography.Text>

          <Card
            size="small"
            className="hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => navigate("/management/bowling/")}
          >
            <div className="flex items-start gap-3">
              <BarChartOutlined className="text-blue-500 text-xl mt-1" />
              <div className="flex flex-col gap-1">
                <Typography.Text strong className="text-base">
                  볼링 기록 관리
                </Typography.Text>
                <Typography.Text type="secondary" className="text-sm">
                  볼링 점수를 등록하고 관리합니다
                </Typography.Text>
              </div>
            </div>
          </Card>

          <Card
            size="small"
            className="hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => navigate("/management/members/")}
          >
            <div className="flex items-start gap-3">
              <TeamOutlined className="text-blue-500 text-xl mt-1" />
              <div className="flex flex-col gap-1">
                <Typography.Text strong className="text-base">
                  회원 관리
                </Typography.Text>
                <Typography.Text type="secondary" className="text-sm">
                  회원 정보를 조회하고 관리합니다
                </Typography.Text>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}

const ManagementMainWithAuth = withAuth(ManagementMain, true);

export default ManagementMainWithAuth;
