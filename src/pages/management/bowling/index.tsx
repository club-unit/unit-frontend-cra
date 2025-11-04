import { Space } from "antd";
import { withAuth } from "src/components/common/withAuth";
import BowlingScoreAddSection from "src/components/pages/management/BowlingScoreAddSection";

function ManageBowlingMain() {
  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <BowlingScoreAddSection />
      </Space>
    </div>
  );
}

const ManageBowlingMainWithAuth = withAuth(ManageBowlingMain, true);

export default ManageBowlingMainWithAuth;
