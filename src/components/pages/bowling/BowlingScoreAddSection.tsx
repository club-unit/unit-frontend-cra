import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { DeleteOutlined, PlusOutlined, WarningOutlined } from "@ant-design/icons";
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
  const [confirmationText, setConfirmationText] = useState("");

  const { data: usersData, isLoading: isLoadingUsers } = useUsers({
    search: searchValue,
    branch: selectedBranch,
    page_size: 50,
  });

  const selectRefs = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    const lastRowKey = individualScoreRows[individualScoreRows.length - 1]?.key;
    if (lastRowKey && selectRefs.current.has(lastRowKey)) {
      const selectRef = selectRefs.current.get(lastRowKey);
      if (selectRef) {
        setTimeout(() => selectRef.focus(), 0);
      }
    }
  }, [individualScoreRows.length]);

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
            tabIndex={-1}
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
              ref={(el) => {
                if (el) {
                  selectRefs.current.set(record.key, el);
                } else {
                  selectRefs.current.delete(record.key);
                }
              }}
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
              tabIndex={-1}
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
              disabled={!record.memberId}
              tabIndex={-1}
            />
            <InputNumber
              style={{ width: 50 }}
              min={0}
              max={300}
              disabled={!record.memberId || !record.games[i]?.participated}
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
        setConfirmationText("");
      } else if (successCount > 0 && failCount > 0) {
        api.warning({
          message: "업로드에 실패한 행이 있습니다.",
          description: `${successCount}개 성공, ${failCount}개 실패`,
        });
        setIsOnSubmit(false);
        setConfirmationText("");
      } else {
        api.error({
          message: "볼링 점수 등록에 실패하였습니다.",
          description: "다시 시도해주세요.",
        });
        setIsOnSubmit(false);
        setConfirmationText("");
      }
    } catch (e) {
      api.error({
        message: "볼링 점수 등록에 실패하였습니다.",
        description: "다시 시도해주세요.",
      });
      setIsOnSubmit(false);
      setConfirmationText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validRowCount = individualScoreRows.filter((row) => row.memberId !== undefined).length;
  const hasInvalidRow = individualScoreRows.some((row) =>
    row.games.every((game) => !game.participated)
  );

  const { zeroScoreCount, perfectScoreCount } = useMemo(() => {
    let zeroCount = 0;
    let perfectCount = 0;

    individualScoreRows.forEach((row) => {
      if (row.memberId) {
        row.games.forEach((game) => {
          if (game.participated) {
            if (game.score === 0) zeroCount++;
            if (game.score === 300) perfectCount++;
          }
        });
      }
    });

    return { zeroScoreCount: zeroCount, perfectScoreCount: perfectCount };
  }, [individualScoreRows]);

  const isNotSaturday = selectedDate?.day() !== 6;
  const isToday = selectedDate ? dayjs().isSame(selectedDate, "day") : false;

  const hasWarning = zeroScoreCount > 0 || perfectScoreCount > 0 || isNotSaturday || isToday;

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
        onCancel={() => {
          setIsOnSubmit(false);
          setConfirmationText("");
        }}
        okText="등록"
        cancelText="취소"
        confirmLoading={isSubmitting}
        cancelButtonProps={{ disabled: isSubmitting }}
        okButtonProps={{ disabled: hasWarning && confirmationText !== "확실합니다" }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <p>선택한 날짜: {selectedDate?.format("YYYY년 MM월 DD일")}</p>
          <p>입력한 행 개수: {validRowCount}개</p>

          {/* 점수 경고 */}
          {(zeroScoreCount > 0 || perfectScoreCount > 0) && (
            <div style={{ marginTop: 16 }}>
              <Space direction="vertical" size="small">
                <Text
                  type="danger"
                  strong
                  style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <WarningOutlined />
                  <span>점수 확인 필요</span>
                </Text>
                {zeroScoreCount > 0 && (
                  <Text type="danger" strong style={{ fontSize: "16px" }}>
                    • 0점: {zeroScoreCount}개
                  </Text>
                )}
                {perfectScoreCount > 0 && (
                  <Text type="danger" strong style={{ fontSize: "16px" }}>
                    • 300점: {perfectScoreCount}개
                  </Text>
                )}
                <Text type="danger" strong style={{ fontSize: "16px" }}>
                  점수가 정말 맞습니까?
                </Text>
              </Space>
            </div>
          )}

          {/* 날짜 경고 */}
          {(isNotSaturday || isToday) && (
            <div style={{ marginTop: 16 }}>
              <Space direction="vertical" size="small">
                <Text
                  type="danger"
                  strong
                  style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <WarningOutlined />
                  <span>날짜 확인 필요</span>
                </Text>
                {isNotSaturday && (
                  <Text type="danger" strong style={{ fontSize: "16px" }}>
                    • 선택한 날짜가 토요일이 아닙니다!
                  </Text>
                )}
                {isToday && (
                  <Text type="danger" strong style={{ fontSize: "16px" }}>
                    • 선택한 날짜가 오늘입니다!
                  </Text>
                )}
                <Text type="danger" strong style={{ fontSize: "16px" }}>
                  날짜가 확실합니까?
                </Text>
              </Space>
            </div>
          )}

          {/* 확인 입력 필드 */}
          {hasWarning && (
            <div style={{ marginTop: 16 }}>
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Text strong style={{ fontSize: "14px" }}>
                  확실하다면 아래에 "확실합니다"를 입력하세요:
                </Text>
                <Input
                  placeholder="확실합니다"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Space>
            </div>
          )}
        </Space>
      </Modal>
    </div>
  );
}

export default BowlingScoreAddSection;
