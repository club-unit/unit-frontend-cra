import { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Select, Space, Table } from "antd";
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

function ManageBowlingMain() {
  const { user } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>(user?.profile.branch);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, dayjs()]);
  const [queryDates, setQueryDates] = useState<[Date, Date] | null>(null);

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

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
      </Space>
    </div>
  );
}

const ManageBowlingMainWithAuth = withAuth(ManageBowlingMain, true);

export default ManageBowlingMainWithAuth;
