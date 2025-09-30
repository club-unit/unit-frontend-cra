import { useMemo, useState } from "react";
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
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [queryDates, setQueryDates] = useState<[Date, Date] | null>(null);

  const { data, isLoading } = useBowlingRecordList({
    branch: selectedBranch,
    startDate: queryDates?.[0],
    endDate: queryDates?.[1],
  });

  const handleSearch = () => {
    if (dateRange) {
      setQueryDates([dateRange[0].toDate(), dateRange[1].toDate()]);
    }
  };

  const branchOptions = Object.entries(BRANCH_LOOKUP_TABLE).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const columns = useMemo(() => {
    if (!data || data?.length === 0 || !queryDates?.[1]) {
      return [];
    }

    const endDateStr = dayjs(queryDates[1]).format("YYYY-MM-DD");

    let maxGameIndex = 0;
    data?.forEach((record) => {
      const endDateRecord = record.records.find((r) => r.date === endDateStr);
      if (endDateRecord && endDateRecord.games.length > 0) {
        const recordMaxIndex = Math.max(...endDateRecord.games.map((g) => g.index));
        maxGameIndex = Math.max(maxGameIndex, recordMaxIndex);
      }
    });

    const baseColumns: ColumnsType<PersonalBowlingRecord> = [
      {
        title: "순위",
        dataIndex: "rank",
        key: "rank",
      },
      {
        title: "등급",
        key: "grade",
        render: (_, record) => {
          return record.profile.responsibility !== "NORMAL"
            ? RESPONSIBILITY_LOOKUP_TABLE[record.profile.responsibility]
            : RANK_LOOKUP_TABLE[record.profile.rank];
        },
      },
      {
        title: "이름",
        key: "name",
        render: (_, record) => record.profile.name,
      },
      {
        title: "에버",
        dataIndex: "average",
        key: "average",
        render: (value) => value.toFixed(2),
      },
      {
        title: "게임수",
        dataIndex: "numGames",
        key: "numGames",
      },
      {
        title: "하이",
        dataIndex: "high",
        key: "high",
      },
    ];

    const gameColumns: ColumnsType<PersonalBowlingRecord> = Array.from(
      { length: maxGameIndex },
      (_, i) => ({
        title: `게임${i + 1}`,
        key: `game${i + 1}`,
        render: (_, record) => {
          const endDateRecord = record.records.find((r) => r.date === endDateStr);
          if (endDateRecord) {
            const game = endDateRecord.games.find((g) => g.index === i + 1);
            return game ? game.score : "-";
          }
          return "-";
        },
      })
    );

    return [...baseColumns, ...gameColumns];
  }, [data, queryDates]);

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space>
          <Select
            value={selectedBranch}
            onChange={setSelectedBranch}
            options={branchOptions}
            style={{ width: 120 }}
            placeholder="지부 선택"
          />
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
            format="YYYY-MM-DD"
            placeholder={["시작 날짜", "종료 날짜"]}
          />
          <Button type="primary" onClick={handleSearch} disabled={!dateRange}>
            조회
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          pagination={false}
        />
      </Space>
    </div>
  );
}

const ManageBowlingMainWithAuth = withAuth(ManageBowlingMain, true);

export default ManageBowlingMainWithAuth;
