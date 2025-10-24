import { useState } from "react";
import { Button, Space } from "antd";
import { withAuth } from "src/components/common/withAuth";
import useAuth from "src/contexts/auth/useAuth";
import BowlingRecordViewSection from "src/components/bowling/BowlingRecordViewSection";
import BowlingScoreAddSection from "src/components/bowling/BowlingScoreAddSection";

function ManageBowlingMain() {
  const { user } = useAuth();
  const [mode, setMode] = useState<"VIEW" | "ADD">("VIEW");

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button type="primary" onClick={() => setMode((mode) => (mode === "ADD" ? "VIEW" : "ADD"))}>
          {mode === "ADD" ? "볼링 기록 확인" : "볼링 기록 추가"}
        </Button>
        {mode === "ADD" ? (
          <BowlingScoreAddSection />
        ) : (
          <BowlingRecordViewSection initialBranch={user?.profile.branch} />
        )}
      </Space>
    </div>
  );
}

const ManageBowlingMainWithAuth = withAuth(ManageBowlingMain, true);

export default ManageBowlingMainWithAuth;
