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

interface Props {
  applications: Application[];
  mutate: () => void;
}

function ApplicationsTableSection({ applications, mutate }: Props) {
  const [modalContent, setModalContent] = useState<null | ExtraQuestion[]>(null);
  const { api } = useNotification();
  const { logout } = useAuth();
  const applicationList = applications.map((application) => ({
    ...application,
    name: application.applicant.name,
    sex: application.applicant.sex === "1" ? "남" : "여",
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
          });
          logout();
        }
      } else {
        api.error({
          message: "신청서 상태 수정에 실패하였습니다.",
          description: "다시 시도해주세요.",
        });
      }
    }
  };

  const columns = [
    {
      title: "작성일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return <Typography.Text>{dayjs(createdAt).format("YYYY/MM/DD hh:mm:ss")}</Typography.Text>;
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
      render: ({ id, status }: any) => {
        return (
          <Select
            defaultValue={status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleStatusChange(e, id)}
          >
            {Object.keys(APPLICATION_STATUS_LOOKUP_TABLE).map((statusOption) => {
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
        open={!!modalContent}
        footer={<Button onClick={() => setModalContent(null)}>닫기</Button>}
        onCancel={() => setModalContent(null)}
        onOk={() => setModalContent(null)}
      >
        <div className="flex flex-col gap-4">
          {modalContent?.map((qna, index) => (
            <div className="flex flex-col" key={index}>
              <Typography.Text strong>{qna.question}</Typography.Text>
              <Typography.Text>{qna.answer}</Typography.Text>
            </div>
          ))}
        </div>
      </Modal>
      <Table
        className="mt-4"
        dataSource={applicationList}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ x: 1300 }}
        onRow={(application) => {
          return {
            onClick: () => setModalContent(application.extra),
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
