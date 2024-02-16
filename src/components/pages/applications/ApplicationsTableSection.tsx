import { Application, ApplicationStatus, ExtraQuestion } from "src/types/api/application";
import { Button, Modal, Table, Typography } from "antd";
import React, { useState } from "react";
import { APPLICATION_STATUS_LOOKUP_TABLE } from "src/constants/application";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";

interface Props {
  applications: Application[];
}

function ApplicationsTableSection({ applications }: Props) {
  const [modalContent, setModalContent] = useState<null | ExtraQuestion[]>(null);
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

  const columns = [
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
      dataIndex: "statusEnum",
      render: (status: ApplicationStatus) => {
        console.log(status);
        return <div></div>;
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
        footer={[<Button onClick={() => setModalContent(null)}>닫기</Button>]}
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
                ? "bg-green-200"
                : application.statusEnum === "FIRST_CHOICE_FAIL" ||
                  application.statusEnum === "SECOND_CHOICE_FAIL"
                ? "bg-red-200"
                : ""
            }`,
          };
        }}
      />
    </>
  );
}

export default ApplicationsTableSection;
