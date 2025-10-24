import { useEffect, useMemo, useState } from "react";
import { DatePicker, Segmented, Space, Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import useBowlingRecordList from "src/hooks/api/[slug]/useBowlingRecordList";
import useGenerations from "src/hooks/api/generations/useGenerations";
import BadgeSet from "src/components/common/BadgeSet";
import { Branch } from "src/types/api/profile";
import { PersonalBowlingRecord } from "src/types/api/bowling";
import type { ColumnsType } from "antd/es/table";

interface BowlingRecordViewSectionProps {
  initialBranch?: Branch;
}

function BowlingRecordViewSection({ initialBranch }: BowlingRecordViewSectionProps) {
  const [selectedBranch, setSelectedBranch] = useState<Branch | "ALL">(initialBranch || "ALL");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, dayjs()]);

  const { data: generationsData } = useGenerations();

  const { data, isLoading } = useBowlingRecordList({
    branch: selectedBranch === "ALL" ? undefined : selectedBranch,
    startDate: dateRange[0]?.toDate(),
    endDate: dateRange[1]?.toDate(),
  });

  useEffect(() => {
    if (generationsData && generationsData.length > 0) {
      const firstGeneration = generationsData[0];
      if (firstGeneration.startDate) {
        setDateRange([dayjs(firstGeneration.startDate), dayjs()]);
      }
    }
  }, [generationsData]);

  const branchOptions = [
    { value: "ALL", label: "전체" },
    ...Object.entries(BRANCH_LOOKUP_TABLE).map(([key, value]) => ({
      value: key,
      label: value,
    })),
  ];

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
        width: 60,
        onCell: () => ({
          style: {
            whiteSpace: "nowrap",
            padding: "4px 8px",
          },
        }),
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BadgeSet user={record as any} height={20} />
          </div>
        ),
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
        title: `${i + 1}`,
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
    <div>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Segmented
          value={selectedBranch}
          onChange={(value) => setSelectedBranch(value as Branch | "ALL")}
          options={branchOptions}
        />
        <DatePicker.RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates as [Dayjs | null, Dayjs | null])}
          format="YYYY-MM-DD"
          placeholder={["시작 날짜", "종료 날짜"]}
        />
      </Space>

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
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}

export default BowlingRecordViewSection;
