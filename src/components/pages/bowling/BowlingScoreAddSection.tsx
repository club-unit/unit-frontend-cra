import { useMemo, useState } from "react";
import { Button, Checkbox, DatePicker, InputNumber, Select, Space, Table, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import useUsers from "src/hooks/api/users/useUsers";
import useAuth from "src/contexts/auth/useAuth";
import { RANK_LOOKUP_TABLE } from "src/constants/rank";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Branch } from "src/types/api/profile";

const { Text } = Typography;

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

function BowlingScoreAddSection() {
  const { user } = useAuth();

  const [individualScoreRows, setIndividualScoreRows] = useState<BowlingRow[]>([
    { key: "row-0", games: [{ participated: true, score: 0 }] },
  ]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>(user?.profile.branch);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const { data: usersData, isLoading: isLoadingUsers } = useUsers({
    search: searchValue,
    branch: selectedBranch,
    page_size: 50,
  });

  const branchOptions = Object.entries(BRANCH_LOOKUP_TABLE).map(([key, value]) => ({
    value: key,
    label: value,
  }));

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
        width: 200,
        render: (_, record) => (
          <Select
            style={{ width: "100%" }}
            placeholder="회원 선택"
            value={record.memberId}
            showSearch
            loading={isLoadingUsers}
            filterOption={false}
            onSearch={(value) => setSearchValue(value)}
            onChange={(value, option) => {
              const newRows = [...individualScoreRows];
              const rowIndex = newRows.findIndex((r) => r.key === record.key);
              if (rowIndex !== -1) {
                newRows[rowIndex].memberId = value;
                newRows[rowIndex].memberName = (option as { label: string })?.label || "";
                setIndividualScoreRows(newRows);
              }
            }}
            options={
              usersData?.results.map((user) => ({
                value: user.id,
                label: `${user.profile.name}/${RANK_LOOKUP_TABLE[user.profile.rank]}/${
                  user.profile.joinedGeneration?.number || "N/A"
                }`,
              })) || []
            }
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

    // 가변 너비 열 추가
    cols.push({
      title: "",
      key: "spacer",
      render: () => null,
    });

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
  }, [individualScoreRows, usersData, isLoadingUsers]);

  const addRow = () => {
    const numGames = individualScoreRows[0]?.games.length || 1;
    const newRow: BowlingRow = {
      key: `row-${Date.now()}`,
      games: Array.from({ length: numGames }, () => ({ participated: true, score: 0 })),
    };
    setIndividualScoreRows([...individualScoreRows, newRow]);
  };

  const handleSubmit = () => {
    const formattedData = individualScoreRows
      .filter((row) => row.memberId !== undefined) // memberId가 없는 행 제외
      .map((row) => ({
        playerId: row.memberId!,
        date: selectedDate?.format("YYYY-MM-DD") || "",
        games: row.games
          .map((game, index) => ({
            index: index + 1,
            score: game.participated ? game.score : null,
          }))
          .filter((game) => game.score !== null), // participated가 false인 게임 제외
      }));

    console.log("Submit bowling scores:", formattedData);
  };

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space>
          <Select
            value={selectedBranch}
            onChange={setSelectedBranch}
            options={branchOptions}
            style={{ width: 100 }}
            placeholder="지구대"
            allowClear
          />
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            format="YYYY-MM-DD"
            placeholder="날짜 선택"
          />
          <Text type="secondary">(한국 표준시 기준)</Text>
        </Space>
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={handleSubmit}>
            등록
          </Button>
        </div>
      </Space>
    </div>
  );
}

export default BowlingScoreAddSection;
