import { Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";

function NotFoundImage() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-8 px-4">
      <div>
        <RobotOutlined style={{ fontSize: 200 }} />
      </div>
      <Typography.Title className="text-center">존재하지 않는 페이지입니다</Typography.Title>
    </div>
  );
}

export default NotFoundImage;
