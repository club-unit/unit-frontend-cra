import { Card, Typography } from "antd";
import { Application } from "src/types/api/application";

interface Props {
  applications: Application[];
  isOverall?: boolean;
}

function ApplicationsStatisticsSection({ applications, isOverall }: Props) {
  const totalNum = applications.length;
  const joinNum = applications.filter(
    (application) =>
      application.status === "FIRST_CHOICE_JOIN" || application.status === "SECOND_CHOICE_JOIN"
  ).length;
  const waitingNum = applications.filter(
    (application) =>
      application.status === "FIRST_CHOICE_WAITING" ||
      application.status === "SECOND_CHOICE_WAITING"
  ).length;
  const failNum = applications.filter(
    (application) =>
      application.status === "FIRST_CHOICE_FAIL" || application.status === "SECOND_CHOICE_FAIL"
  ).length;

  return (
    <Card size="small">
      <div>
        <div className="flex flex-nowrap gap-1">
          <Typography.Text>총 지원자 수: </Typography.Text>
          <Typography.Text strong>{totalNum}</Typography.Text>
        </div>
        <div className="flex flex-nowrap gap-1">
          <Typography.Text>대기자 수: </Typography.Text>
          <Typography.Text strong>{waitingNum}</Typography.Text>
        </div>
        <div className="flex flex-nowrap gap-1">
          <Typography.Text className="text-green-500">합격자 수: </Typography.Text>
          <Typography.Text className="text-green-500" strong>
            {joinNum}
          </Typography.Text>
        </div>
        <div className="flex flex-nowrap gap-1">
          <Typography.Text className="text-red-500">불합격자 수: </Typography.Text>
          <Typography.Text className="text-red-500" strong>
            {failNum}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}

export default ApplicationsStatisticsSection;
