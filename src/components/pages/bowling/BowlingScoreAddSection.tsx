import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import useUsers from "src/hooks/api/users/useUsers";
import useAuth from "src/contexts/auth/useAuth";
import { RANK_LOOKUP_TABLE } from "src/constants/rank";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { Branch } from "src/types/api/profile";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import useNotification from "src/contexts/notification/useNotfication";

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
  const { api } = useNotification();

  const [individualScoreRows, setIndividualScoreRows] = useState<BowlingRow[]>([
    { key: "row-0", games: [{ participated: true, score: 0 }] },
  ]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>(user?.profile.branch);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [isOnSubmit, setIsOnSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        render: (_, record) => {
          const selectedMemberIds = individualScoreRows
            .filter((row) => row.key !== record.key && row.memberId !== undefined)
            .map((row) => row.memberId);

          return (
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
                usersData?.results
                  .filter((user) => !selectedMemberIds.includes(user.id))
                  .map((user) => ({
                    value: user.id,
                    label: `${user.profile.name}/${RANK_LOOKUP_TABLE[user.profile.rank]}/${
                      user.profile.joinedGeneration?.number || "N/A"
                    }`,
                  })) || []
              }
            />
          );
        },
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
                    participated: e.target.checked,
                    score: e.target.checked ? newRows[rowIndex].games[i]?.score ?? 0 : 0,
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

  const handleSubmit = async () => {
    setIsSubmitting(true);

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

    const uploadPromises = formattedData.map((data) =>
      clientAxios.post(API_ROUTES.bowling.record(), data)
    );

    try {
      const results = await Promise.allSettled(uploadPromises);

      const successCount = results.filter((result) => result.status === "fulfilled").length;
      const failCount = results.filter((result) => result.status === "rejected").length;
      const totalCount = results.length;

      if (successCount === totalCount) {
        api.success({ message: "볼링 점수가 성공적으로 등록되었습니다." });
        setIndividualScoreRows([{ key: "row-0", games: [{ participated: true, score: 0 }] }]);
        setIsOnSubmit(false);
      } else if (successCount > 0 && failCount > 0) {
        api.warning({
          message: "업로드에 실패한 행이 있습니다.",
          description: `${successCount}개 성공, ${failCount}개 실패`,
        });
        setIsOnSubmit(false);
      } else {
        api.error({
          message: "볼링 점수 등록에 실패하였습니다.",
          description: "다시 시도해주세요.",
        });
        setIsOnSubmit(false);
      }
    } catch (e) {
      api.error({
        message: "볼링 점수 등록에 실패하였습니다.",
        description: "다시 시도해주세요.",
      });
      setIsOnSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validRowCount = individualScoreRows.filter((row) => row.memberId !== undefined).length;
  const hasInvalidRow = individualScoreRows.some((row) =>
    row.games.every((game) => !game.participated)
  );

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
          loading={isSubmitting}
          scroll={{ x: "max-content" }}
        />
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addRow}
          block
          disabled={isSubmitting}
        >
          행 추가
        </Button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            onClick={() => setIsOnSubmit(true)}
            disabled={isSubmitting || hasInvalidRow}
          >
            등록
          </Button>
        </div>
      </Space>
      <Modal
        open={isOnSubmit}
        title="볼링 점수 등록 확인"
        onOk={handleSubmit}
        onCancel={() => setIsOnSubmit(false)}
        okText="등록"
        cancelText="취소"
        confirmLoading={isSubmitting}
        cancelButtonProps={{ disabled: isSubmitting }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <p>선택한 날짜: {selectedDate?.format("YYYY년 MM월 DD일")}</p>
        <p>입력한 행 개수: {validRowCount}개</p>
      </Modal>
    </div>
  );
}

export default BowlingScoreAddSection;
