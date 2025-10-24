import { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, DatePicker, InputNumber, Select, Space, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { withAuth } from "src/components/common/withAuth";
import useBowlingRecordList from "src/hooks/api/[slug]/useBowlingRecordList";
import useAuth from "src/contexts/auth/useAuth";
import { Branch } from "src/types/api/profile";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { PersonalBowlingRecord } from "src/types/api/bowling";
import type { ColumnsType } from "antd/es/table";
import { RESPONSIBILITY_LOOKUP_TABLE } from "src/constants/responsibility";
import { RANK_LOOKUP_TABLE } from "src/constants/rank";

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
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>(user?.profile.branch);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, dayjs()]);
  const [queryDates, setQueryDates] = useState<[Date, Date] | null>(null);

  const [individualScoreRows, setIndividualScoreRows] = useState<BowlingRow[]>([
    { key: "row-0", games: [{ participated: true, score: 0 }] },
  ]);

  const mockupStartDate = "2025-01-01"; //@TODO 실제값 받아오도록 수정

  const { data, isLoading } = useBowlingRecordList({
    branch: selectedBranch,
    startDate: queryDates?.[0],
    endDate: queryDates?.[1],
  });

  useEffect(() => {
    //@TODO 실제값 받아오도록 수정
    dateRange[0] = dayjs(mockupStartDate);
  }, [dateRange, mockupStartDate]);

  const handleSearch = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      setQueryDates([dateRange[0].toDate(), dateRange[1].toDate()]);
    }
  };

  const branchOptions = Object.entries(BRANCH_LOOKUP_TABLE).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const lastDate = useMemo(() => {
    if (!data || data.length === 0) return null;

    const allDates = new Set<string>();
    data.forEach((record) => {
      record.records.forEach((dailyRecord) => {
        allDates.add(dailyRecord.date);
      });
    });

    if (allDates.size === 0) return null;

    const sortedDates = Array.from(allDates).sort();
    return sortedDates[sortedDates.length - 1];
  }, [data]);

  const columns = useMemo(() => {
    if (!data || data.length === 0 || !lastDate) {
      return [];
    }

    let maxGameIndex = 0;
    data.forEach((record) => {
      const lastDateRecord = record.records.find((r) => r.date === lastDate);
      if (lastDateRecord && lastDateRecord.games.length > 0) {
        const recordMaxIndex = Math.max(...lastDateRecord.games.map((g) => g.index));
        maxGameIndex = Math.max(maxGameIndex, recordMaxIndex);
      }
    });

    const lastDateFormatted = dayjs(lastDate).format("YYYY년 MM월 DD일");

    const baseColumns: ColumnsType<PersonalBowlingRecord> = [
      {
        title: "순위",
        dataIndex: "rank",
        key: "rank",
        align: "center",
        onCell: () => ({ style: { whiteSpace: "nowrap", padding: "4px 8px" } }),
      },
      {
        title: "등급",
        key: "grade",
        align: "center",
        onCell: () => ({ style: { whiteSpace: "nowrap", padding: "4px 8px" } }),
        render: (_, record) => {
          return record.profile.responsibility !== "NORMAL"
            ? RESPONSIBILITY_LOOKUP_TABLE[record.profile.responsibility]
            : RANK_LOOKUP_TABLE[record.profile.rank];
        },
      },
      {
        title: "이름",
        key: "name",
        align: "center",
        onCell: () => ({ style: { whiteSpace: "nowrap", padding: "4px 8px" } }),
        render: (_, record) => record.profile.name,
      },
      {
        title: "에버",
        dataIndex: "average",
        key: "average",
        align: "center",
        onCell: () => ({ style: { whiteSpace: "nowrap", padding: "4px 8px" } }),
        render: (value) => value.toFixed(2),
      },
      {
        title: "게임수",
        dataIndex: "numGames",
        key: "numGames",
        align: "center",
        onCell: () => ({ style: { whiteSpace: "nowrap", padding: "4px 8px" } }),
      },
      {
        title: "하이",
        dataIndex: "high",
        key: "high",
        align: "center",
        onCell: () => ({ style: { whiteSpace: "nowrap", padding: "4px 8px" } }),
      },
    ];

    const gameColumns: ColumnsType<PersonalBowlingRecord> = Array.from(
      { length: maxGameIndex },
      (_, i) => ({
        title: `게임${i + 1}`,
        key: `game${i + 1}`,
        align: "center",
        onCell: () => ({ style: { whiteSpace: "nowrap", padding: "4px 8px" } }),
        onHeaderCell: () => ({
          style: {
            borderLeft: i === 0 ? "2px solid #f0f0f0" : undefined,
          },
        }),
        render: (_, record) => {
          const lastDateRecord = record.records.find((r) => r.date === lastDate);
          if (lastDateRecord) {
            const game = lastDateRecord.games.find((g) => g.index === i + 1);
            return game ? game.score : "-";
          }
          return "-";
        },
      })
    );

    const columnsWithGroup = [...baseColumns, ...gameColumns];

    if (maxGameIndex > 0) {
      const headerColumns: ColumnsType<PersonalBowlingRecord> = [
        ...baseColumns.map((col) => ({ ...col, title: col.title })),
        {
          title: lastDateFormatted,
          key: "games-group",
          align: "center" as const,
          children: gameColumns,
        },
      ];
      return headerColumns;
    }

    return columnsWithGroup;
  }, [data, lastDate]);

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
              <Button type="primary" onClick={() => true} disabled={!dateRange[0]}>
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
          <div>
            <Space>
              <Select
                value={selectedBranch}
                onChange={setSelectedBranch}
                options={branchOptions}
                style={{ width: 80 }}
                placeholder="지구대 선택"
              />
              <DatePicker.RangePicker
                value={dateRange}
                onChange={(dates) => setDateRange(dates as [Dayjs | null, Dayjs | null])}
                format="YYYY-MM-DD"
                placeholder={["시작 날짜", "종료 날짜"]}
              />
              <Button type="primary" onClick={handleSearch} disabled={!dateRange[0]}>
                조회
              </Button>
            </Space>

            <div style={{ overflowX: "auto" }}>
              <style>{`
            .compact-table .ant-table-thead > tr > th {
              padding: 4px 8px !important;
              white-space: nowrap;
            }
          `}</style>
              <Table
                columns={columns}
                dataSource={data}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                size="small"
                style={{ fontSize: "13px" }}
                bordered
                className="compact-table"
              />
            </div>
          </div>
        )}
      </Space>
    </div>
  );
}

const ManageBowlingMainWithAuth = withAuth(ManageBowlingMain, true);

export default ManageBowlingMainWithAuth;
