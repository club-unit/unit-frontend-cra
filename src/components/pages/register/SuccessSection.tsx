import { Card, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function SuccessSection() {
  return (
    <Card className="h-[70vh] pt-20">
      <div className="flex flex-col justify-center text-center align-middle items-center">
        <CheckCircleOutlined style={{ fontSize: 70, color: "green" }} className="mx-auto" />
        <div className="my-16">
          <Typography.Title>회원가입이 완료되었습니다!</Typography.Title>
          <Typography.Title level={3}>UNIT 홈페이지 회원이 되신 것을 환영합니다.</Typography.Title>
        </div>
        <Link to="/" className="underline">
          홈으로 가기
        </Link>
      </div>
    </Card>
  );
}

export default SuccessSection;
