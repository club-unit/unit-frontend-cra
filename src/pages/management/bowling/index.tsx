import { useState } from "react";
import { Button, DatePicker, Select, Space } from "antd";
import { Dayjs } from "dayjs";
import { withAuth } from "src/components/common/withAuth";
import useBowlingRecordList from "src/hooks/api/[slug]/useBowlingRecordList";
import useAuth from "src/contexts/auth/useAuth";
import { Branch } from "src/types/api/profile";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";

function ManageBowlingMain() {
  const { user } = useAuth();

  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>(user?.profile.branch);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [queryDates, setQueryDates] = useState<[Date, Date] | null>(null);

  const { data, isLoading, error } = useBowlingRecordList({
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

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space>
          <Select
            value={selectedBranch}
            onChange={setSelectedBranch}
            options={branchOptions}
            style={{ width: 120 }}
            placeholder="지구대 선택"
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

        {isLoading && <div>로딩 중...</div>}
        {error && <div>에러 발생</div>}
        {data && <div>{data.toString()}</div>}
      </Space>
    </div>
  );
}

const ManageBowlingMainWithAuth = withAuth(ManageBowlingMain, true);

export default ManageBowlingMainWithAuth;
