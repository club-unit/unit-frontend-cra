import { Application, ApplicationStatus, ExtraQuestion } from "src/types/api/application";
import { Button, Modal, Select, Table, Typography } from "antd";
import React, { useState } from "react";
import { APPLICATION_STATUS_LOOKUP_TABLE } from "src/constants/application";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { clientAxios } from "src/utils/common/clientAxios";
import { API_ROUTES } from "src/constants/routes";
import { AxiosError } from "axios";
import useNotification from "src/contexts/notification/useNotfication";
import useAuth from "src/contexts/auth/useAuth";
import dayjs from "dayjs";
import { ArrowRightOutlined } from "@ant-design/icons";
import { SEX_LOOKUP_TABLE } from "src/constants/user";

interface Props {
  applications: Application[];
  mutate: () => void;
}

interface StatusModalContentType {
  e: any;
  id: number;
  statusEnum: ApplicationStatus;
  name: string;
}

function ApplicationsTableSection({ applications, mutate }: Props) {
  const [detailModalContent, setDetailModalContent] = useState<null | ExtraQuestion[]>(null);
  const [statusModalContent, setStatusModalContent] = useState<null | StatusModalContentType>(null);
  const { api } = useNotification();
  const { logout } = useAuth();
  const applicationList = applications.map((application, index) => ({
    ...application,
    index: index + 1,
    name: application.applicant.name,
    sex: SEX_LOOKUP_TABLE[application.applicant.sex],
    phoneNumber: application.applicant.phoneNumber,
    yearAge: application.applicant.yearAge,
    status: APPLICATION_STATUS_LOOKUP_TABLE[application.status],
    statusEnum: application.status,
    firstChoice: BRANCH_LOOKUP_TABLE[application.firstChoice],
    secondChoice: BRANCH_LOOKUP_TABLE[application.secondChoice],
    key: application.id,
  }));

  const handleStatusChange = async (value: ApplicationStatus, id: number) => {
    try {
      await clientAxios.patch(API_ROUTES.applications.byId(id), { status: value });
      mutate();
      api.success({ message: "신청서 상태가 수정되었습니다." });
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.code === "token_not_valid") {
          api.error({
            message: "신청서 상태 수정에 실패하였습니다.",
            description: "로그인이 만료되었습니다.",
            key: "token-expire",
          });
          logout();
        }
      } else {
        api.error({
          message: "신청서 상태 수정에 실패하였습니다.",
          description: "다시 시도해주세요.",
        });
      }
    } finally {
      setStatusModalContent(null);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      render: (index: number) => {
        return <Typography.Text strong>{index}</Typography.Text>;
      },
    },
    {
      title: "작성일",
      dataIndex: "createdDatetime",
      key: "createdDatetime",
      render: (createdDatetime: string) => {
        return (
          <Typography.Text>{dayjs(createdDatetime).format("YYYY/MM/DD HH:mm:ss")}</Typography.Text>
        );
      },
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "성별",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "연나이",
      dataIndex: "yearAge",
      key: "yearAge",
    },
    {
      title: "상태",
      render: ({ id, statusEnum, name }: any) => {
        const statusEnumList =
          statusEnum === "FIRST_CHOICE_WAITING"
            ? [
                "FIRST_CHOICE_WAITING",
                "FIRST_CHOICE_JOIN",
                "FIRST_CHOICE_FAIL",
                "SECOND_CHOICE_WAITING",
              ]
            : statusEnum === "SECOND_CHOICE_WAITING"
              ? ["SECOND_CHOICE_WAITING", "SECOND_CHOICE_JOIN", "SECOND_CHOICE_FAIL"]
              : Object.keys(APPLICATION_STATUS_LOOKUP_TABLE);
        return (
          <Select
            value={statusEnum}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setStatusModalContent({ e, id, statusEnum, name })}
            popupMatchSelectWidth={false}
            disabled={
              statusEnum === "FIRST_CHOICE_JOIN" ||
              statusEnum === "SECOND_CHOICE_JOIN" ||
              statusEnum === "FIRST_CHOICE_FAIL" ||
              statusEnum === "SECOND_CHOICE_FAIL"
            }
          >
            {statusEnumList.map((statusOption) => {
              return (
                <Select.Option value={statusOption} key={statusOption}>
                  {APPLICATION_STATUS_LOOKUP_TABLE[statusOption as ApplicationStatus]}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      key: "status",
      width: "100",
    },
    {
      title: "가입경로",
      dataIndex: "applicantPath",
      key: "applicantPath",
    },
    {
      title: "학교",
      dataIndex: "university",
      key: "university",
    },
    {
      title: "학년",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "학과",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "거주지",
      dataIndex: "residence",
      key: "residence",
    },
    {
      title: "1지망",
      dataIndex: "firstChoice",
      key: "firstChoice",
    },
    {
      title: "2지망",
      dataIndex: "secondChoice",
      key: "secondChoice",
    },
  ];

  return (
    <>
      <Modal
        title="지원 상세 정보"
        open={!!detailModalContent}
        footer={<Button onClick={() => setDetailModalContent(null)}>닫기</Button>}
        onCancel={() => setDetailModalContent(null)}
        onOk={() => setDetailModalContent(null)}
      >
        <div className="flex flex-col gap-4">
          {detailModalContent?.map((qna, index) => (
            <div className="flex flex-col" key={index}>
              <Typography.Text strong>{qna.question}</Typography.Text>
              <Typography.Text>{qna.answer}</Typography.Text>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        title="지원자 상태 변경 확인"
        open={!!statusModalContent}
        footer={
          <div>
            <Button key="back" onClick={() => setStatusModalContent(null)}>
              취소
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={() =>
                statusModalContent &&
                handleStatusChange(statusModalContent?.e, statusModalContent?.id)
              }
            >
              확인
            </Button>
          </div>
        }
        onCancel={() => setStatusModalContent(null)}
        onOk={() =>
          statusModalContent && handleStatusChange(statusModalContent?.e, statusModalContent?.id)
        }
      >
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-nowrap gap-4">
            <Typography.Text strong>{statusModalContent?.name}</Typography.Text>
            <Typography.Text>지원자의 지원서 상태를</Typography.Text>
          </div>
          <div className="flex flex-nowrap gap-4">
            <Typography.Text
              className={`${
                statusModalContent?.statusEnum === "FIRST_CHOICE_JOIN" ||
                statusModalContent?.statusEnum === "SECOND_CHOICE_JOIN"
                  ? "text-green-500"
                  : statusModalContent?.statusEnum === "FIRST_CHOICE_FAIL" ||
                      statusModalContent?.statusEnum === "SECOND_CHOICE_FAIL"
                    ? "text-red-500"
                    : ""
              }`}
              strong
            >
              {APPLICATION_STATUS_LOOKUP_TABLE[statusModalContent?.statusEnum as ApplicationStatus]}
            </Typography.Text>
            <ArrowRightOutlined />
            <Typography.Text
              className={`${
                statusModalContent?.e === "FIRST_CHOICE_JOIN" ||
                statusModalContent?.e === "SECOND_CHOICE_JOIN"
                  ? "text-green-500"
                  : statusModalContent?.e === "FIRST_CHOICE_FAIL" ||
                      statusModalContent?.e === "SECOND_CHOICE_FAIL"
                    ? "text-red-500"
                    : ""
              }`}
              strong
            >
              {APPLICATION_STATUS_LOOKUP_TABLE[statusModalContent?.e as ApplicationStatus]}
            </Typography.Text>
          </div>
          <div className="flex flex-nowrap gap-4">
            <Typography.Text>로 변경하시겠습니까?</Typography.Text>
          </div>
        </div>
      </Modal>
      <Table
        dataSource={applicationList}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ x: 1500 }}
        onRow={(application) => {
          return {
            onClick: () => setDetailModalContent(application.extra),
            className: `hover:cursor-pointer ${
              application.statusEnum === "FIRST_CHOICE_JOIN" ||
              application.statusEnum === "SECOND_CHOICE_JOIN"
                ? "text-green-500"
                : application.statusEnum === "FIRST_CHOICE_FAIL" ||
                    application.statusEnum === "SECOND_CHOICE_FAIL"
                  ? "text-red-500"
                  : ""
            }`,
          };
        }}
        bordered
      />
    </>
  );
}

export default ApplicationsTableSection;
