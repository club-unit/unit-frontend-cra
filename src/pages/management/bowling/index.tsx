import { useMemo, useState } from "react";
import { Button, Checkbox, InputNumber, Select, Space, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { withAuth } from "src/components/common/withAuth";
import useAuth from "src/contexts/auth/useAuth";
import type { ColumnsType } from "antd/es/table";
import BowlingRecordViewSection from "src/components/bowling/BowlingRecordViewSection";

interface GameScore {
  participated: boolean;
  score: number;
}

interface BowlingRow {
  key: string;
  memberId?: number;
  memberName?: string;
  games: GameScore[];
}

function ManageBowlingMain() {
  const { user } = useAuth();
  const [mode, setMode] = useState<"VIEW" | "ADD">("VIEW");

  const [individualScoreRows, setIndividualScoreRows] = useState<BowlingRow[]>([
    { key: "row-0", games: [{ participated: true, score: 0 }] },
  ]);

  const addBowlingColumns = useMemo(() => {
    const numGames = individualScoreRows[0]?.games.length || 1;

    const cols: ColumnsType<BowlingRow> = [
      {
        title: "",
        key: "delete-row",
        width: 40,
        align: "center" as const,
        render: (_, record) => (
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              const newRows = individualScoreRows.filter((row) => row.key !== record.key);
              if (newRows.length > 0) {
                setIndividualScoreRows(newRows);
              }
            }}
            disabled={individualScoreRows.length === 1}
          />
        ),
      },
      {
        title: "회원",
        key: "member",
        width: 150,
        render: (_, record) => (
          <Select
            style={{ width: "100%" }}
            placeholder="회원 선택"
            value={record.memberId}
            options={[
              { value: 1, label: "회원1" },
              { value: 2, label: "회원2" },
            ]}
          />
        ),
      },
    ];

    for (let i = 0; i < numGames; i++) {
      cols.push({
        title: (
          <Space size="small">
            <span>{`게임${i + 1}`}</span>
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                const newRows = individualScoreRows.map((row) => ({
                  ...row,
                  games: row.games.filter((_, idx) => idx !== i),
                }));
                setIndividualScoreRows(newRows);
              }}
              disabled={numGames === 1}
            />
          </Space>
        ),
        key: `game-${i}`,
        width: 100,
        render: (_, record) => (
          <Space size="small">
            <Checkbox
              checked={record.games[i]?.participated ?? true}
              onChange={(e) => {
                const newRows = [...individualScoreRows];
                const rowIndex = newRows.findIndex((r) => r.key === record.key);
                if (rowIndex !== -1) {
                  newRows[rowIndex].games[i] = {
                    ...newRows[rowIndex].games[i],
                    participated: e.target.checked,
                  };
                  setIndividualScoreRows(newRows);
                }
              }}
            />
            <InputNumber
              style={{ width: 50 }}
              min={0}
              max={300}
              disabled={!record.games[i]?.participated}
              value={record.games[i]?.score ?? 0}
              controls={false}
              onChange={(value) => {
                const newRows = [...individualScoreRows];
                const rowIndex = newRows.findIndex((r) => r.key === record.key);
                if (rowIndex !== -1) {
                  newRows[rowIndex].games[i] = {
                    ...newRows[rowIndex].games[i],
                    score: value ?? 0,
                  };
                  setIndividualScoreRows(newRows);
                }
              }}
            />
          </Space>
        ),
      });
    }

    cols.push({
      title: (
        <Button
          type="text"
          size="small"
          icon={<PlusOutlined />}
          onClick={() => {
            const newRows = individualScoreRows.map((row) => ({
              ...row,
              games: [...row.games, { participated: true, score: 0 }],
            }));
            setIndividualScoreRows(newRows);
          }}
        />
      ),
      key: "add-game",
      width: 50,
      align: "center" as const,
    });

    return cols;
  }, [individualScoreRows]);

  const addRow = () => {
    const numGames = individualScoreRows[0]?.games.length || 1;
    const newRow: BowlingRow = {
      key: `row-${Date.now()}`,
      games: Array.from({ length: numGames }, () => ({ participated: true, score: 0 })),
    };
    setIndividualScoreRows([...individualScoreRows, newRow]);
  };

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button type="primary" onClick={() => setMode((mode) => (mode === "ADD" ? "VIEW" : "ADD"))}>
          {mode === "ADD" ? "볼링 기록 확인" : "볼링 기록 추가"}
        </Button>
        {mode === "ADD" ? (
          <div>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Button type="primary" onClick={() => true}>
                등록
              </Button>
              <div style={{ overflowX: "auto" }}>
                <style>{`
                  .add-bowling-table .ant-table-thead > tr > th {
                    padding: 4px 8px !important;
                    white-space: nowrap;
                  }
                  .add-bowling-table .ant-table-tbody > tr > td {
                    padding: 4px 8px !important;
                  }
                `}</style>
                <Table
                  columns={addBowlingColumns}
                  dataSource={individualScoreRows}
                  pagination={false}
                  size="small"
                  bordered
                  className="add-bowling-table"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <Button type="dashed" icon={<PlusOutlined />} onClick={addRow} block>
                행 추가
              </Button>
            </Space>
          </div>
        ) : (
          <BowlingRecordViewSection initialBranch={user?.profile.branch} />
        )}
      </Space>
    </div>
  );
}

const ManageBowlingMainWithAuth = withAuth(ManageBowlingMain, true);

export default ManageBowlingMainWithAuth;
